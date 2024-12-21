import { data } from "./constants";
import fs from "fs";
import textToSpeech from "@google-cloud/text-to-speech";

export default async function speak() {
  const client = new textToSpeech.TextToSpeechClient();

  // Combine all text from captions
  let text = "";
  data.captions.forEach((element) => {
    text += element.text + " ";
  });

  // Configure the request
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    // Generate speech
    const [response] = await client.synthesizeSpeech(request);

    // Save the audio to the current directory
    const fileName = "output.mp3";
    fs.writeFileSync(fileName, response.audioContent, "binary");
    console.log(`Audio content written to file: ${fileName}`);
  } catch (error) {
    console.error("Error generating speech:", error);
  }
}