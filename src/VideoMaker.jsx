import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { AbsoluteFill } from "remotion";
import { Media } from "./Components/Media";
import { KaraokeCaptions } from "./Components/KaraokeCaptions";
// import { RollingTextCaptions } from "./Components/RollingTextCaptions";
import { WordForWordPopInCaptions } from "./Components/WordForWordPopInCaptions";
import { HighlightWord } from "./Components/HighlightWordCaptions";
import { TypewriterCaptions } from "./Components/TypewriterCaptions";



export const VideoMaker = ({ data }) => {
  // const lastCaption = data.captions[data.captions.length - 1];
  // durationInFrames(Math.ceil((lastCaption.endMs / 1000) * data.fps));

  const renderAnimations = (_data) => {
    switch (_data.text_animation) {
      case "Kareoke":
        return <KaraokeCaptions data={_data} />
      case "WordForWord":
        return <WordForWordPopInCaptions data={_data} />
      case "HighlightWord":
        return <HighlightWord data={_data} />
      case "Typewriter":
        return <TypewriterCaptions data={_data} />
      default: 
        return <KaraokeCaptions data={_data} />
    }
  }

  return (
    <AbsoluteFill>
      <Media data={data} />
      <AbsoluteFill
      >
        {renderAnimations(data)}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
