import { AbsoluteFill, Sequence, Video, Img, Audio, Loop } from "remotion";
import { Player } from "@remotion/player";
import React from "react";

export const MyComposition = ({
  videos,
  font,
  align,
  justify,
  fontColor,
  fontStyle,
  fontSize,
    totalDuration
}) => {
  const renderSubTitle = (summary, start, end, index) => {
    let summTemp = summary;
    summTemp.forEach((item, index) => {
      if(!item.ts) {
        item = {
          ...item,
          ts: summTemp[index - 1].ts,
          end_ts: summTemp[index - 1].end_ts,
        }
        summTemp[index] = item;
      }
    })
    let count = 0;
    let time = 0;
    let sumArr = [];
    let summaries = [];
    summary.forEach((item) => {
      if (item.ts >= start && item.end_ts <= end) {
        sumArr.push(item);
        // if(item.type === 'text') {
          time += (item.end_ts - item.ts)
        // }
        if (time >= 4) {
          let obj = {
            text: sumArr.map((sumr) => sumr.value).join(""),
            startAt: Math.ceil((sumArr[0].ts - start) * 30),
            duration: Math.ceil((item.end_ts - sumArr[0].ts) * 30),
            // endAt: item.end_ts + (item.end_ts - sumArr[0].ts)
          };
          // console.log(obj)
          summaries.push(obj);
          count = 0;
          time = 0;
          sumArr = [];
        }
        count ++;
      }
    });
    if(sumArr.length > 0) {
      let obj = {
        text: sumArr.map((sumr) => sumr.value).join(""),
        startAt: Math.ceil((sumArr[0].ts - start) * 30),
        duration: Math.ceil((sumArr[sumArr.length - 1].end_ts - sumArr[0].ts) * 30),
        // endAt: item.end_ts + (item.end_ts - sumArr[0].ts)
      };
      // console.log(obj)
      summaries.push(obj)
    }
    summaries.forEach((item, index) => {
      if(index !== 0) {
        summaries[index].startAt = summaries[index - 1].endAt
        summaries[index].endAt = summaries[index].duration + summaries[index].startAt
        summaries[index].duration = summaries[index].endAt - summaries[index].startAt
      }else {
        // summaries[index].startAt = Math.ceil(summaries[index].startAt * 30)
        summaries[index].endAt = summaries[index].duration + summaries[index].startAt
        // summaries[index].duration = summaries[index].duration
      }
    })
    // console.log(summaries)
    return summaries;
  };

  return (
    <>
      {videos?.map((item, index) => {
        // {console.log('start : ', item.timeline.start, item.timeline.start * 30)}
        // {console.log('end : ', item.trim.duration, Math.ceil(item.trim.duration * 30))}
        return (
          <>
            <Sequence
              key={"se1" + index}
              from={Math.ceil(item.timeline.start * 30)}
              durationInFrames={Math.ceil(item.trim.duration * 30)}
            >
              {item.type === "VIDEO" ? (
                <>
                  <Video
                    id="Video"
                    acceptableTimeShiftInSeconds={11}
                    src={item.source}
                    startFrom={item.trim.start * 30}
                    endAt={item.trim.end * 30}
                    durationInFrames={Math.ceil(item.trim.duration * 30)}
                    fps={30}
                    width={1280}
                    height={720}
                  />
                  {item.summary && renderSubTitle(
                    item.summary,
                    item.trim.start,
                    item.trim.end,
                      index

                  ).map((summary) => {
                    return (
                      <Sequence
                        from={summary.startAt}
                        durationInFrames={summary.duration}
                      >
                        <div
                          className={"sub-title"}
                          style={{
                            fontFamily: font,
                            alignItems: align,
                            justifyContent: justify,
                            color: fontColor,
                            fontSize: `${fontSize}px`,
                            ...fontStyle,
                          }}
                        >
                          <div>{summary.text}</div>
                        </div>
                      </Sequence>
                    );
                  })}
                </>
              ) : item.type === "SLIDE" ? (
                <>
                  <AbsoluteFill
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    <div
                      className={"h-100 w-100 d-flex justify-content-center align-items-center"}
                      style={{ backgroundColor: item.backgroundColor }}
                    >
                      <div className={"slide-logo"}>
                        <img
                          className={"ms-2 mt-2"}
                          src={item.logo}
                          style={{ height: "60px" }}
                        />
                      </div>
                      <div
                        className={
                          ""
                        }
                        style={{ backgroundColor: item.backgroundColor }}
                      >
                        <div className={"text-center"}>
                          <div
                            className={"mb-4"}
                            style={{ ...item.titleFontOption }}
                          >
                            {item.title}
                          </div>
                          <div style={{ ...item.subTitleFontOption }}>
                            {item.subTitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AbsoluteFill>
                </>
              ) : item.type === "IMAGE" ? (
                  <AbsoluteFill>
                    <div
                        className={"h-100 w-100 d-flex justify-content-center align-items-center"}>
                      <img src={item.image} />
                    </div>
                  </AbsoluteFill>
              ) : <></>}
            </Sequence>
          </>
        );
      })}
      <Loop durationInFrames={totalDuration}>
      <Audio
        src="https://s3.amazonaws.com/com.knit.dev/public/knit/showreel_media/audio/Chill_Abstract_Intention.mp3"
        volume={0.05}
      />
      </Loop>
      <span className={"logo-watermark"}>
        powered by
        <img
          className="h-6 w-auto"
          src="https://goknitwebsite.wpenginepowered.com/wp-content/uploads/2023/02/Knit-Logo-Full-Green.png"
          alt="Knit"
        />
      </span>
    </>
  );
};
