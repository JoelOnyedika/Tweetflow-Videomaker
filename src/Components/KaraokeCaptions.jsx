import React from "react";
import { Audio, useCurrentFrame, useVideoConfig } from "remotion";

const TIKTOK_WIDTH = 1080;

export const KaraokeCaptions = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTimeSec = frame / fps;
  const scaleFactor = width / TIKTOK_WIDTH;
  const scaledFontSize = data.font_size;
  const lineHeight = scaledFontSize * (data.line_height || 1.6); // Increased line height multiplier
  
  // Break captions into chunks of 7
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
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Audio src={data.audio_path} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "100%",
          gap: `${scaledFontSize * 0.3}px`, // Add gap between lines
        }}
      >
        {currentChunk.map((caption, captionIndex) => {
          const words = caption.text.split(" ");
          return words.map((word, wordIndex) => {
            const wordStartSec =
              caption.start_seconds +
              (wordIndex / words.length) * (caption.end_seconds - caption.start_seconds);
            const wordEndSec =
              caption.start_seconds +
              ((wordIndex + 1) / words.length) * (caption.end_seconds - caption.start_seconds);
            const isHighlighted =
              currentTimeSec >= wordStartSec && currentTimeSec < wordEndSec;
            
            return (
              <span
                key={`${captionIndex}-${wordIndex}`}
                style={{
                  color: isHighlighted ? data.highlight_color : data.text_color,
                  fontFamily: data.font_family || "Arial",
                  fontSize: `${scaledFontSize}px`,
                  marginRight: `${scaledFontSize * 0.2}px`, // Add space between words
                  lineHeight: `${lineHeight}px`,
                  textShadow:
                    data.fontSize > 40
                      ? `1px 1px 0 ${data.text_outline_color}, -1px -1px 0 ${data.text_outline_color}`
                      : "none",
                  fontWeight: "bold",
                  display: "inline-block", // Help with proper word wrapping
                  verticalAlign: "top", // Align words properly
                }}
              >
                {word}
              </span>
            );
          });
        })}
      </div>
    </div>
  );
};