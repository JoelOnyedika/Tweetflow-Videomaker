import React from "react";
import { Audio, useCurrentFrame, useVideoConfig } from "remotion";

const TIKTOK_WIDTH = 1080;

export const WordForWordPopInCaptions = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const currentTimeSec = frame / fps;
  const scaleFactor = width / TIKTOK_WIDTH;
  const scaledFontSize = data.font_size;
  const lineHeight = scaledFontSize * (data.line_height || 1.2);

  const chunkSize = 7;
  const chunks = [];
  for (let i = 0; i < data.captions.length; i += chunkSize) {
    chunks.push(data.captions.slice(i, i + chunkSize));
  }

  const currentChunkIndex = chunks.findIndex(chunk =>
    chunk[chunk.length - 1]?.end_seconds >= currentTimeSec
  );
  const currentChunk = chunks[currentChunkIndex] || [];

  if (!data.captions || data.captions.length === 0) {
    return <div>No captions available</div>;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: `${height - data.top_margin}px`,
        left: `${data.left_margin}px`,
        width: `${width - 2 * data.left_margin}px`,
        zIndex: 10
      }}
    >
      <Audio src={data.audio_path} />
      <div
        style={{
          backgroundColor: 'white',
          display: "flex",
          justifyContent: "center",
        }}
      >
              <span
                style={{
                  color: data.text_color,
                  fontFamily: data.font_family || "Arial",
                  fontSize: `${scaledFontSize}px`,
                  textShadow:
                    data.fontSize > 40
                      ? `1px 1px 0 ${data.text_outline_color}, -1px -1px 0 ${data.text_outline_color}`
                      : "none",
                  fontWeight: "bold",
                }}
              >
                Show up
              </span>
       </div>
    </div>
  );
};
