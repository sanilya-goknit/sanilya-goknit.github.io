import { Player } from "@remotion/player";
import { Composition, useVideoConfig, Video } from "remotion";
import { MyComposition } from "./MyComposition";
import { getVideos } from "../Components/data";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RemotionDemo = () => {
  const list = getVideos();
  const [videoConfig, setVideoConfig] = useState();
  const [videoConfigTemp, setVideoConfigTemp] = useState();

  useEffect(() => {
    setVideoConfig(getVideos());
    setVideoConfigTemp(getVideos());
  }, []);

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
    console.log(videoConfigTemp)
  };

  return (
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
                    <div>Duration: {item.duration}</div>
                    <Box sx={{ width: 280 }}>
                      <Slider
                        className={"mx-2"}
                        getAriaLabel={() => "Video Duration"}
                        value={[item.trim.start, item.trim.end]}
                        onChange={(e, v) => handleChange(e, v, index)}
                        valueLabelDisplay="auto"
                        step={1}
                        max={item.duration}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            );
          })}
        <button onClick={updateChanges}>update changes</button>
      </Grid>
      <Grid item md={8}>
        <div className={"h-75 player-main d-flex justify-content-center"}>
          {list && (
            <Player
              durationInFrames={getDurationInFrames()}
              compositionWidth={640}
              compositionHeight={480}
              fps={30}
              component={() => <MyComposition videos={videoConfig} />}
              controls
              width={1280}
              height={720}
              // Many other optional props are available.
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

// registerRoot(RemotionDemo);

export default RemotionDemo;
