import { Player } from "@remotion/player";
import { Composition, useVideoConfig, Video } from "remotion";
import { MyComposition } from "./MyComposition";
import { getVideos } from "../Components/data";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {CircularProgress} from "@mui/material";

const fonts = [
  { title: "Roboto", key: 1, value: "Roboto" },
  { title: "Open Sans", key: 2, value: "Open Sans" },
  { title: "Montserrat", key: 3, value: "Montserrat" },
  { title: "Rubik", key: 4, value: "Rubik" },
  { title: "Lato", key: 5, value: "Lato" },
  { title: "Poppins", key: 6, value: "Poppins" },
  { title: "Source Sans Pro", key: 7, value: "Source Sans Pro" },
  { title: "Oswald", key: 8, value: "Oswald" },
  { title: "Roboto Mono", key: 9, value: "Roboto Mono" },
  { title: "Noto Sans", key: 10, value: "Noto Sans" },
  { title: "Raleway", key: 11, value: "Raleway" },
  { title: "Ubuntu", key: 12, value: "Ubuntu" },
  { title: "Roboto Slab", key: 13, value: "Roboto Slab" },
];

const RemotionDemo = () => {
  const list = getVideos();
  const playerRef = useRef();
  const [videoConfig, setVideoConfig] = useState();
  const [videoConfigTemp, setVideoConfigTemp] = useState();
  const [range, setRange] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [font, setFont] = useState(fonts[0].value);
  const [align, setAlign] = useState("end");
  const [justify, setJustify] = useState("center");
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [fontStyle, setFontStyle] = useState({});
  const [fontSize, setFontSize] = useState(22);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVideoConfig(getVideos());
    setVideoConfigTemp(getVideos());
  }, []);

  const renderVideo = async () => {
    setIsLoading(true)
    axios
      .post("http://localhost:3002/api/render", {
        videoConfig: videoConfig,
        font: font,
        align: align,
        justify: justify,
        fontColor: fontColor,
        fontStyle: fontStyle,
        fontSize: fontSize,
      })
      .then((response) => {
        setIsLoading(false)
        console.log(response);
        window.open(response.data.data.video)
      });

    // const compositionId = "HelloWorld";
    //
    // // Render the video
    // await renderMedia({
    //   composition,
    //   // serveUrl: bundleLocation,
    //   codec: "h264",
    //   outputLocation: `out/${compositionId}.mp4`,
    //   inputProps,
    // });
    // Composition.render(<MyComposition videos={videoConfig} />, "./abc.mp4").then(res => {console.log(res)}).catch(err => console.log(err))
  };

  const handleChange = (e, v, index) => {
    console.log("CHANGE ", e, v, index);
    const start = Number(v.start);
    const end = Number(v.end);
    videoConfigTemp[index].trim.start = Number(start.toFixed(2));
    videoConfigTemp[index].trim.end = Number(end.toFixed(2));
    videoConfigTemp[index].trim.duration = Number((end - start).toFixed(2));
    videoConfigTemp.forEach((item, index) => {
      item.timeline.start =
        index == 0
          ? 0
          : Number(
              (
                videoConfigTemp[index - 1].timeline.start +
                videoConfigTemp[index - 1].trim.duration
              ).toFixed(2),
            );
      item.timeline.end =
        index == 0
          ? Number(item.trim.duration.toFixed(2))
          : Number(
              (
                videoConfigTemp[index - 1].timeline.start +
                videoConfigTemp[index - 1].trim.duration +
                item.trim.duration
              ).toFixed(2),
            );
    });
    console.log("CONFIG :: ", videoConfigTemp);
    setVideoConfigTemp([...videoConfigTemp]);
  };

  const updateDuration = (event, index) => {
    const duration = Number(event.target.value || 5);
    console.log("CHANGE ", duration, index);
    // const start = Number(v.start);
    // const end = Number(v.end);
    // videoConfigTemp[index].trim.start = Number(start.toFixed(2));
    // videoConfigTemp[index].trim.end = Number(end.toFixed(2));
    videoConfigTemp[index].trim.duration = Number(duration.toFixed(2));
    videoConfigTemp.forEach((item, index) => {
      item.timeline.start =
        index == 0
          ? 0
          : Number(
              (
                videoConfigTemp[index - 1].timeline.start +
                videoConfigTemp[index - 1].trim.duration
              )?.toFixed(2),
            );
      item.timeline.end =
        index == 0
          ? Number(item.trim.duration.toFixed(2))
          : Number(
              (
                videoConfigTemp[index - 1].timeline.start +
                videoConfigTemp[index - 1].trim.duration +
                item.trim.duration
              )?.toFixed(2),
            );
    });
    console.log("CONFIG :: ", videoConfigTemp);
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
    return Math.ceil(duration * 30) || 1;
  };

  const updateChanges = () => {
    setVideoConfig([...JSON.parse(JSON.stringify([...videoConfigTemp]))]);
    console.log(videoConfigTemp);
  };

  const handleStartTimeUpdate = (event, index) => {
    range[index] = {
      ...range[index],
      start: event.target.value,
    };
    setRange([...range]);
  };

  const handleEndTimeUpdate = (event, index) => {
    range[index] = {
      ...range[index],
      end: event.target.value,
    };
    setRange([...range]);
  };

  const handleChangeFont = (e) => {
    setFont(e.target.value);
  };

  const handleChangeAlign = (e) => {
    setAlign(e.target.value);
  };

  const handleChangeJustify = (e) => {
    setJustify(e.target.value);
  };

  const handleColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleFontTypeChange = (e) => {
    const val = e.target.value;

    if (val === 1) {
      setFontStyle({});
    } else if (val === 2) {
      setFontStyle({ fontWeight: "bold" });
    } else if (val === 3) {
      setFontStyle({ fontStyle: "italic" });
    } else if (val === 4) {
      setFontStyle({ fontWeight: "bold", fontStyle: "italic" });
    }
  };

  return (
    <Grid container>
      {/*{console.log(range)}*/}
      <Grid item md={3}>
        {videoConfigTemp &&
          videoConfigTemp.map((item, index) => {
            return (
              <div>
                <div className={"mb-5 border-bottom-1 d-flex"}>
                  <div className={"me-2"}>
                    {item.type === "SLIDE" ? (
                      <>HTML JSX</>
                    ) : item.type === "IMAGE" ? (
                        <>
                          <img src={item.image} style={{ height: "50px", width: "50px" }} alt={'asd'} />
                        </>
                    ) : (
                      <img
                        src={item.thumbnail}
                        alt={"imae"}
                        style={{ height: "50px", width: "50px" }}
                      />
                    )}
                  </div>
                  <div className={"ml-1"}>
                    <div>
                      Duration: {item.duration}, trim: {item.trim.duration}, subtitles: {item.summary ? 'Yes' : 'No'}
                    </div>
                    <Box sx={{ width: 280 }} className={"d-flex w-50"}>
                      {/*<Slider*/}
                      {/*  className={"mx-2"}*/}
                      {/*  getAriaLabel={() => "Video Duration"}*/}
                      {/*  value={[item.trim.start, item.trim.end]}*/}
                      {/*  // onChange={(e, v) => handleChange(e, v, index)}*/}
                      {/*  valueLabelDisplay="on"*/}
                      {/*  step={0.1}*/}
                      {/*  onChangeCommitted={(e, v) => handleChange(e, v, index)}*/}
                      {/*  min={0}*/}
                      {/*  max={item.duration}*/}
                      {/*  disableSwap={true}*/}
                      {/*/>*/}
                      {item.type === "SLIDE" || item.type === "IMAGE" ? (
                        <>
                          <input
                            type={"number"}
                            style={{ width: "100px" }}
                            onChange={(event) => updateDuration(event, index)}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            style={{ width: "100px" }}
                            onChange={(event) =>
                              handleStartTimeUpdate(event, index)
                            }
                          />
                          <input
                            style={{ width: "100px" }}
                            onChange={(event) =>
                              handleEndTimeUpdate(event, index)
                            }
                          />
                          <button
                            onClick={(e) =>
                              handleChange(e, range[index], index)
                            }
                          >
                            Update
                          </button>
                        </>
                      )}
                    </Box>
                  </div>
                </div>
              </div>
            );
          })}
        <button onClick={updateChanges}>update changes</button>
        <button onClick={renderVideo}>download</button>
      </Grid>
      <Grid item md={3}>
        <div>
          Font:{" "}
          <Select
            labelId="demo-simple-select-label"
            className={"ms-2 w-50"}
            id="demo-simple-select"
            value={font}
            // label="Font"
            size={"small"}
            onChange={handleChangeFont}
          >
            {fonts.map((item) => (
              <MenuItem value={item.value}>{item.title}</MenuItem>
            ))}
          </Select>
        </div>
        <div className={"mt-3"}>
          Align:{" "}
          <Select
            labelId="demo-simple-select-label"
            className={"ms-2 w-50"}
            id="demo-simple-select"
            value={align}
            // label="Font"
            size={"small"}
            onChange={handleChangeAlign}
          >
            <MenuItem value={"start"}>Top</MenuItem>
            <MenuItem value={"center"}>Middle</MenuItem>
            <MenuItem value={"end"}>Bottom</MenuItem>
          </Select>
        </div>
        <div className={"mt-3"}>
          Justify:{" "}
          <Select
            labelId="demo-simple-select-label"
            className={"ms-2 w-50"}
            id="demo-simple-select"
            value={justify}
            // label="Font"
            size={"small"}
            onChange={handleChangeJustify}
          >
            <MenuItem value={"left"}>Left</MenuItem>
            <MenuItem value={"center"}>Center</MenuItem>
            <MenuItem value={"right"}>Rignt</MenuItem>
          </Select>
        </div>
        <div className={"mt-3"}>
          Color:{" "}
          <Select
            labelId="demo-simple-select-label"
            className={"ms-2 w-50"}
            id="demo-simple-select"
            value={fontColor}
            // label="Font"
            size={"small"}
            onChange={handleColorChange}
          >
            <MenuItem value={"#FFFFFF"}>white</MenuItem>
            <MenuItem value={"#FF0000"}>red</MenuItem>
            <MenuItem value={"#008000"}>green</MenuItem>
            <MenuItem value={"#0000FF"}>blue</MenuItem>
          </Select>
        </div>
        <div className={"mt-3"}>
          Font Style:{" "}
          <Select
            labelId="demo-simple-select-label"
            className={"ms-2 w-50"}
            id="demo-simple-select"
            defaultValue={1}
            // value={fontColor}
            // label="Font"
            size={"small"}
            onChange={handleFontTypeChange}
          >
            <MenuItem value={1}>Regular</MenuItem>
            <MenuItem value={2}>Bold</MenuItem>
            <MenuItem value={3}>Italic</MenuItem>
            <MenuItem value={4}>Bold-Italic</MenuItem>
          </Select>
        </div>
        <div className={"mt-3"}>
          Font Size:{" "}
          <input
              value={fontSize}
            type={"number"}
            max={48}
            onChange={(e) => {
              setFontSize(e.target.value);
            }}
          />
          px
        </div>
      </Grid>
      <Grid item md={6}>
        <div className={"h-75 player-main d-flex justify-content-center"}>
          {videoConfig && (
            <Player
              ref={playerRef}
              durationInFrames={getDurationInFrames()}
              compositionWidth={1280}
              compositionHeight={720}
              className={"player"}
              fps={30}
              component={() => (
                <MyComposition
                  videos={videoConfig}
                  font={font}
                  align={align}
                  justify={justify}
                  fontColor={fontColor}
                  fontStyle={fontStyle}
                  fontSize={fontSize}
                />
              )}
              controls
              // width={1280}
              // height={400}
              // Many other optional props are available.
            />
          )}
        </div>
        <div className={'mt-5'}>
          {isLoading && <>
            <CircularProgress /> <span className={"ms-3"}> rendering video</span>
          </>}
        </div>
      </Grid>
    </Grid>
  );
};

export default RemotionDemo;
