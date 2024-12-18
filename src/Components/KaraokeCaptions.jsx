import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

// Use the same constants as in your canvas
const TIKTOK_WIDTH = 1080;
const TIKTOK_HEIGHT = 1920;

export const KaraokeCaptions = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const fadeOutOpacity = Math.min(1, frame / 60);

  // Calculate scale factor similar to canvas implementation
  const scaleFactor = width / TIKTOK_WIDTH;

  const renderKaraokeText = () => {
    return data.captions.map((caption, captionIndex) => {
      // Check if this specific caption is active
      const isCaptionActive =
        currentTimeMs >= caption.startMs && currentTimeMs <= caption.endMs;
      
      // If this caption is not active, return null
      if (!isCaptionActive) return null;
      
      // Split caption into words
      const words = caption.text.split(" ");
      
      // Calculate how many words to color based on current time
      const totalCaptionDuration = caption.endMs - caption.startMs;
      const wordsColorProgress = Math.floor(
        ((currentTimeMs - caption.startMs) / totalCaptionDuration) *
          words.length
      );

      // Scale margins and font size using the same approach as canvas
      const scaledMarginLeft = data.marginLeft * scaleFactor;
      const scaledMarginTop = data.marginTop * scaleFactor;
      const scaledFontSize = data.fontSize * scaleFactor;
      const lineHeight = scaledFontSize * (data.lineHeight || 1.2);

      return (
        <div
          key={captionIndex}
          style={{
            position: "absolute",
            bottom: `${height - scaledMarginTop}px`,
            left: `${scaledMarginLeft}px`,
            width: `${width - (scaledMarginLeft * 2)}px`,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: fadeOutOpacity,
              maxWidth: "100%",
            }}
          >
            {words.map((word, wordIndex) => {
              // Determine if this word should be colored
              const isColored = wordIndex < wordsColorProgress;
              
              return (
                <span
                  key={wordIndex}
                  style={{
                    color: isColored ? data.textColor : data.textOutline,
                    fontFamily: data.fontFamily,
                    fontWeight: "bold",
                    fontSize: `${scaledFontSize*2}px`,
                    marginRight: `${data.marginRight * scaleFactor}px`,
                    textShadow: `1px 1px 0 ${data.strokeColor}, 
                                 -1px -1px 0 ${data.strokeColor}`,
                    opacity: fadeOutOpacity,
                    lineHeight: `${lineHeight}px`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return <>{renderKaraokeText()}</>;
};