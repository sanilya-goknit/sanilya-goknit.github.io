import { AbsoluteFill, Sequence, Video, Img, Audio  } from "remotion";
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
}) => {
  return (
    <>
      {/*{console.log(videos)}*/}
      {videos?.map((item, index) => {
        // {console.log('start : ', item.timeline.start, item.timeline.start * 30)}
        // {console.log('end : ', item.trim.duration, Math.ceil(item.trim.duration * 30))}
        return (
          <Sequence
            key={"se1" + index}
            from={Math.ceil(item.timeline.start * 30)}
            durationInFrames={Math.ceil(item.trim.duration * 30)}
          >
            {item.type === "VIDEO" ? (
              <Video
                id="Video"
                acceptableTimeShiftInSeconds={11}
                src={item.source}
                startFrom={item.trim.start * 30}
                endAt={item.trim.end * 30}
                durationInFrames={Math.ceil(item.trim.duration * 30)}
                fps={30}
                width={1280}
                // height={720}
              />
            ) : item.type === "SLIDE" ? (
                <>
                    <AbsoluteFill style={{backgroundColor: item.backgroundColor}}>
                        {console.log(item.backgroundColor)}
                        <div className={'h-100 w-100'} style={{backgroundColor: item.backgroundColor}}>
                            <div className={'slide-logo'}>
                                <img className={"ms-2 mt-2"} src={item.logo} style={{height: '60px'}} />
                            </div>
                            <div className={"d-flex h-100 w-100 justify-content-center pt-5"} style={{backgroundColor: item.backgroundColor}}>
                                <div className={'text-center mt-5'}>
                                    <div className={"mb-4"} style={{...item.titleFontOption}}>{item.title}</div>
                                    <div style={{...item.subTitleFontOption}}>{item.subTitle}</div>
                                </div>
                            </div>
                        </div>
                    </AbsoluteFill>
                </>
            ) : (
              <></>
            )}
          </Sequence>
        );
      })}
      <Audio
        src="https://s3.amazonaws.com/com.knit.dev/public/knit/showreel_media/audio/Chill_Abstract_Intention.mp3"
        volume={0.05}
      />
      <Sequence
        showInTimeline={true}
        from={1}
        durationInFrames={2000}
        layout={"absolute-fill"}
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
          <div>Hello, this is test subtitle</div>
        </div>
      </Sequence>
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
