import React from "react";
import { Audio, useCurrentFrame, useVideoConfig } from "remotion";

const TIKTOK_WIDTH = 1080;

export const TypewriterCaptions = ({ data }) => {
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

  const getVisibleText = (caption, wordIndex, word) => {
    const wordStartSec = caption.start_seconds +
      (wordIndex / caption.text.split(" ").length) * 
      (caption.end_seconds - caption.start_seconds);
    
    const wordDuration = (caption.end_seconds - caption.start_seconds) / 
      caption.text.split(" ").length;
    
    const charsToShow = Math.ceil(
      ((currentTimeSec - wordStartSec) / wordDuration) * word.length
    );

    return word.slice(0, Math.max(0, charsToShow));
  };

  const allWords = currentChunk.flatMap(caption => caption.text.split(" "));
  const estimatedWidth = allWords.length * (scaledFontSize * 0.6 + data.left_margin + 5);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%", // Changed from bottom to top for vertical centering
        left: "50%", // Changed to 50% for horizontal centering
        transform: "translate(-50%, -50%)", // Added transform for true centering
        width: `${width - 2 * data.left_margin}px`,
        zIndex: 10,
        display: "flex",
        justifyContent: "center", // Added for horizontal centering
        alignItems: "center" // Added for vertical centering
      }}
    >
      <Audio src={data.audio_path} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Changed to center
          justifyContent: "center", // Added for vertical alignment
          maxWidth: "100%", // Added to prevent overflow
          overflow: "hidden" // Added to prevent scrolling
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${lineHeight - scaledFontSize}px ${data.left_margin + 5}px`,
            justifyContent: "center", // Changed to center
            alignItems: "center", // Changed to center
            textAlign: "center" // Added for text alignment
          }}
        >
          {currentChunk.map((caption, captionIndex) => {
            const words = caption.text.split(" ");
            return words.map((word, wordIndex) => {
              const wordStartSec =
                caption.start_seconds +
                (wordIndex / words.length) * (caption.end_seconds - caption.start_seconds);
              const isActive = currentTimeSec >= wordStartSec;
              const visibleText = isActive ? getVisibleText(caption, wordIndex, word) : "";
              
              return (
                <span
                  key={`${captionIndex}-${wordIndex}`}
                  style={{
                    color: data.text_color,
                    fontFamily: data.font_family || "Arial",
                    fontSize: `${scaledFontSize}px`,
                    padding: `0px 4px`,
                    borderRadius: "2rem",
                    fontWeight: "bold",
                    lineHeight: 'normal',
                    display: "inline-block",
                    position: "relative",
                    flexShrink: 0,
                    whiteSpace: "pre"
                  }}
                >
                  <span
                    style={{
                      opacity: 0.9,
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {word}
                  </span>
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {visibleText}
                  </span>
                </span>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default TypewriterCaptions;