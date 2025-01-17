import React from "react";
import { Audio, useCurrentFrame, useVideoConfig, Sequence } from "remotion";

const TIKTOK_WIDTH = 1080;

export const WordForWordPopInCaptions = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTimeSec = frame / fps;
  const scaleFactor = width / TIKTOK_WIDTH;
  const scaledFontSize = data.font_size;

  return (
    <div
      style={{
        zIndex: 10,
      }}
    >
      <Audio src={data.audio_path} />
        {data.captions.map((chunk, idx) => {
          // Display the captions based on the time range
          if (
            currentTimeSec >= chunk.start_seconds &&
            currentTimeSec <= chunk.end_seconds
          ) {
            return (
              <Sequence
                key={idx}
                from={chunk.start_seconds * fps} // Start in frames
                durationInFrames={(chunk.end_seconds - chunk.start_seconds) * fps} // Duration in frames
              >
                <div
                  style={{
                    color: data.text_color,
                    fontFamily: data.font_family || "Arial",
                    fontSize: `${scaledFontSize}px`,
                    textShadow:
                      scaledFontSize > 40
                        ? `1px 1px 0 ${data.text_outline_color}, -1px -1px 0 ${data.text_outline_color}`
                        : "none",
                    fontWeight: "bold",
                    textAlign: "center", // Ensure text is centered within its container
                    width: "100%", // Take full width of parent for proper centering
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {chunk.text}
                </div>
              </Sequence>
            );
          }
          return null;
        })}
    </div>
  );
};