import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Player } from "@editframe/react";
import { getVideos } from "./data";

const EditFrame = () => {
  const [videoList, setVideoList] = useState();
  const [config, setConfig] = useState();

  useEffect(() => {
    setVideoList(getVideos());
    console.log(getVideos())
    setConfig({
      backgroundColor: "#FFFFFF",
      dimensions: { height: 1080, width: 1920 },
      duration: 10,
      layers: getVideos(),
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item md={4}>
          {videoList &&
            videoList.map((item) => {
              return (
                <div className={"m-4 p-4 border-bottom-1 d-flex"}>
                  <img
                    src={item.thumbnail}
                    alt={"image"}
                    style={{ height: "50px", width: "50px" }}
                  />
                  <div>
                      Duration: {item.duration}
                  </div>
                </div>
              );
            })}
        </Grid>
        <Grid item md={8}>
            <div className={'h-50'}>
              {config && (
                <Player

                  applicationId="6jx24gqZW7"
                  config={config}
                  loop={false}
                  dimensions={{
                    height: "100%",
                    width: "100%",
                  }}
                  // host={"https://embed.editframe.dev"}
                  // seek={seek}
                  // loading={loading}
                />
              )}
            </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EditFrame;
