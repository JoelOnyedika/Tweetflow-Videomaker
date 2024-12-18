// import "./tailwind.css";
// import { Composition, getInputProps } from "remotion";
// import { VideoMaker } from "./VideoMaker";
// import { useState } from "react";

// export const RemotionRoot = () => {
//   const inputProps = getInputProps();
//   return (
//     <>
//       <Composition
//         id="Videomaker"
//         component={VideoMaker}
//         durationInFrames={inputProps.duration_in_frames ?? 500}
//         fps={inputProps.fps ?? 30}
//         width={1080}
//         height={1920}
//         defaultProps={{
//           data: inputProps
//         }}
//       />
//     </>
//   );
// };


import {data} from './utils/constants.js'
import "./tailwind.css";
import { Composition, getInputProps } from "remotion";
import { VideoMaker } from "./VideoMaker";
import { useState } from "react";

export const RemotionRoot = () => {
  // const inputProps = getInputProps();
  return (
    <>
      <Composition
        id="Videomaker"
        component={VideoMaker}
        durationInFrames={data.duration_in_frames ?? 500}
        fps={data.fps ?? 30}
        width={1080}
        height={1920}
        defaultProps={{
          data: data
        }}
      />
    </>
  );
};