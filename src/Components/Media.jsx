import { Img, Video, staticFile } from "remotion";

export const Media = ({ data }) => {
  const imageExtensions = [
    ".png", ".jpg", ".jpeg", ".bmp", ".webp", ".tiff"
  ];

  return (
    <>
      {imageExtensions.some(ext => data.media.endsWith(ext)) ? (
        <Img
          src={data.media}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      ): <Video
          src={staticFile('sample.mp4')}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            objectFit: "cover",
          }}
        />}
      
    </>
  );
};