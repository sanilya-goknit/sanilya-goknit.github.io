import { Sequence, Video, Img } from "remotion";

export const MyComposition = ({ videos }) => {
  return (
    <>
        {/*{console.log(videos)}*/}
      {videos?.map((item) => {
        return (
          <Sequence
            from={item.timeline.start * 30}
            durationInFrames={item.trim.duration * 30}
          >
            {item.type === "VIDEO" ? (
              <Video
                id="Video"
                acceptableTimeShiftInSeconds={11}
                src={item.source}
                startFrom={item.trim.start * 30}
                endAt={item.trim.end * 30}
                durationInFrames={item.trim.duration * 30}
                fps={30}
                width={640}
                height={480}
              />
            ) : (
              <Img src={item.image} />
            )}
          </Sequence>
        );
      })}
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
