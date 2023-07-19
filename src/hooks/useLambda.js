import { useEffect, useState } from "react";
import { getProgress } from "../lambda/getProgress";
import { postMedia } from "../lambda/postMedia";
import { postStill } from "../lambda/postStill";

export const useLambda = (id, inputProps, refreshInterval = 8000) => {
  const [progress, setProgress] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [url, setUrl] = useState();
  const [price, setPrice] = useState();
  const [renderId, setRenderId] = useState();

  const init = (type) => {
    setProgress(undefined);
    setStatus("rendering");
    setType(type);
    setUrl(undefined);
    setPrice(undefined);
    setRenderId(undefined);
  };
  const getUrl = (id) => `/api/lambda/view?id=${id}`;

  const renderStill = async () => {
    if (status === "rendering") return alert("Already rendering");
    init("still");
    const result = await postStill(id, inputProps);
    if (!result) return setStatus("error");
    setRenderId(result.renderId);
    setPrice(result.estimatedPrice.accruedSoFar);
    setStatus("done");
    setProgress(1);
    setUrl(getUrl(result.renderId));
  };

  const renderMedia = async () => {
    if (status === "rendering") return alert("Already rendering");
    init("media");
    const result = await postMedia(id, inputProps);
    if (!result) return setStatus("error");
    setRenderId(result.renderId);
    setProgress(0);
    setStatus("rendering");
    setUrl(getUrl(result.renderId));
  };
  useEffect(() => {
    if (status === "rendering" && renderId && type === "media") {
      const interval = setInterval(async () => {
        try {
          const result = await getProgress(renderId);
          if (!result) return setStatus("error");
          if (result.fatalErrorEncountered) setStatus("error");
          setPrice(result.costs.accruedSoFar);
          if (result.done) setStatus("done");
          setProgress(status === "rendering" ? result.overallProgress : 1);
        } catch (e) {
          console.error(e);
            clearInterval(interval);
          setStatus("error");
        }
      }, refreshInterval);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, renderId]);

  return {
    renderMedia,
    renderStill,
    progress,
    status,
    type,
    url,
    price,
    renderId,
  };
};
