import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { getVideos } from "../Components/data";
import etro from "etro";

let movie;
function initMovie(canvas, videos) {
  movie = new etro.Movie({
    canvas,
  });
  // movie.crossOrigin = "anonymous";

  videos.forEach((item, index) => {
    const video = document.createElement("video");
    video.style.display = "none";
    video.className = 'video-player';

    video.src = item.source;
    const layer = new etro.layer.Video({
      startTime: item.timeline.start,
      duration: item.trim.duration,
      source: video,
      // source: () => <video src={item.source} />,
      // sourceX: 200, // default: 0
      // sourceY: 200, // default: 0
      // sourceWidth: 200, // default: null (full width)
      // sourceHeight: 200, // default: null (full height)
      sourceStartTime: item.trim.start, // default: 0
      // x: 100, // default: 0
      // y: 100, // default: 0
      // width: 50, // default: null (full width)
      // height: 50, // default: null (full height)
      opacity: 1, // default: 1
      muted: false, // default: false
      volume: 1, // default: 1
      playbackRate: 1, // default: 1
    });
    console.log(movie);
    movie.layers.push(layer);
  });

  movie._whenReady().then(res => {
      console.log("READY ", res)
  })
}

function playMovie() {
  movie.play().then((x) => {
    console.log("PLAy", x)
  });
  // movie
  //   .record({
  //     frameRate: 30,
  //   })
  //   .then((blob) => {
  //     console.log("Movie finished recording!");
  //     console.log("Blob:", blob);
  //   });
  // setInterval(() => {
  //     console.log(movie)
  // }, 500)
}

const EtroDemo = () => {
  const list = getVideos();
  const playerRef = useRef();
  const [videoConfig, setVideoConfig] = useState();
  const [videoConfigTemp, setVideoConfigTemp] = useState();

  useEffect(() => {
    setVideoConfig(getVideos());
    setVideoConfigTemp(getVideos());
  }, []);

  useEffect(() => {
    if (
      playerRef &&
      playerRef.current &&
      videoConfig &&
      videoConfig.length > 0
    ) {
      console.log(playerRef.current);
      const cnv = playerRef.current;
      setTimeout(() => {
        initMovie(cnv, videoConfig);
      }, 500);
    }
  }, [playerRef, videoConfig]);

  const handleChange = (e, v, index) => {
    const start = v[0];
    const end = v[1];
    videoConfigTemp[index].trim.start = start;
    videoConfigTemp[index].trim.end = end;
    videoConfigTemp[index].trim.duration = end - start;
    videoConfigTemp.forEach((item, index) => {
      item.timeline.start =
        index == 0
          ? 0
          : videoConfigTemp[index - 1].timeline.start +
            videoConfigTemp[index - 1].trim.duration;
      item.timeline.end =
        index == 0
          ? item.trim.duration
          : videoConfigTemp[index - 1].timeline.start +
            videoConfigTemp[index - 1].trim.duration +
            item.trim.duration;
    });
    setVideoConfigTemp([...videoConfigTemp]);
  };

  const getDurationInFrames = () => {
    let duration = 0;
    if (videoConfig) {
      videoConfig.forEach((item) => {
        if (item.trim) {
          duration = duration + (item.trim.end - item.trim.start);
        } else {
          duration = duration + item.duration;
        }
      });
    }
    return duration * 30 || 1;
  };

  const updateChanges = () => {
    setVideoConfig([...videoConfigTemp]);
    console.log(videoConfigTemp);
  };

  const renderVideo = () => {
    playMovie();
  };

  return (
    <>
      <Grid container>
        <Grid item md={4}>
          {videoConfigTemp &&
            videoConfigTemp.map((item, index) => {
              return (
                <div>
                  <div className={"mb-5 border-bottom-1 d-flex"}>
                    <div className={"me-2"}>
                      <img
                        src={item.thumbnail}
                        alt={"image"}
                        style={{ height: "50px", width: "50px" }}
                      />
                    </div>
                    <div className={"ml-1"}>
                      <div>
                        Duration: {item.duration}, trim: {item.trim.duration}
                      </div>
                      <Box sx={{ width: 280 }}>
                        <Slider
                          className={"mx-2"}
                          getAriaLabel={() => "Video Duration"}
                          value={[item.trim.start, item.trim.end]}
                          onChange={(e, v) => handleChange(e, v, index)}
                          valueLabelDisplay="on"
                          step={1}
                          min={1}
                          max={item.duration}
                          disableSwap
                        />
                      </Box>
                    </div>
                  </div>
                </div>
              );
            })}
          <button onClick={updateChanges}>update changes</button>
          <button onClick={renderVideo}>download</button>
        </Grid>
        <Grid item md={8}>
          <div className={"w-100 h-100"}>
            <canvas ref={playerRef} className={"video-canvas"}/>
            {/*{videoConfig && videoConfig.map((item, index) => {*/}
            {/*    return <video src={item.source} id={'video' + index} className={'d-none'} />*/}
            {/*})}*/}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EtroDemo;
