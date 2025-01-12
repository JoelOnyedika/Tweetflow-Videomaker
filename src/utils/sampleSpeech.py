from gtts import gTTS
import io


class CaptionGenerator:
    def __init__(self, data):
        self.data = data
        self.audio_file = None

    def generate_audio_file(self):
        """Generate an audio file from the text in the captions and save it to disk."""
        text = ""
        for caption in self.data["captions"]:
            text += caption["text"] + " "

        # Language in which you want to convert
        language = "en"

        # Passing the text and language to the engine, slow=False makes the speech faster
        speech = gTTS(text=text, lang=language, slow=False)

        # Saving the converted audio to a file on disk
        audio_file_path = "output.wav"
        speech.save(audio_file_path)
        self.audio_file = audio_file_path
        print(f"Audio file saved at: {audio_file_path}")
        return self.audio_file


# Example usage
data = {
    "text": "Modify and Change My Style",
    "fontFamily": "Courier",
    "fontSize": 39,
    "captions": [
  { "text": "The", "startMs": 0, "endMs": 500 },
  { "text": "extraordinary", "startMs": 500, "endMs": 1000 },
  { "text": "complexity", "startMs": 1000, "endMs": 1500 },
  { "text": "of", "startMs": 1500, "endMs": 2000 },
  { "text": "the", "startMs": 2000, "endMs": 2500 },
  { "text": "situation", "startMs": 2500, "endMs": 3000 },
  { "text": "was", "startMs": 3000, "endMs": 3500 },
  { "text": "apparent", "startMs": 3500, "endMs": 4000 },
  { "text": "to", "startMs": 4000, "endMs": 4500 },
  { "text": "everyone", "startMs": 4500, "endMs": 5000 },
  { "text": "in", "startMs": 5000, "endMs": 5500 },
  { "text": "the", "startMs": 5500, "endMs": 6000 },
  { "text": "room", "startMs": 6000, "endMs": 6500 },
  { "text": "though", "startMs": 6500, "endMs": 7000 },
  { "text": "not", "startMs": 7000, "endMs": 7500 },
  { "text": "immediately", "startMs": 7500, "endMs": 8000 },
  { "text": "understood", "startMs": 8000, "endMs": 8500 },
  { "text": "by", "startMs": 8500, "endMs": 9000 },
  { "text": "all", "startMs": 9000, "endMs": 9500 },
  { "text": "The", "startMs": 9500, "endMs": 10000 },
  { "text": "discussions", "startMs": 10000, "endMs": 10500 },
  { "text": "were", "startMs": 10500, "endMs": 11000 },
  { "text": "long", "startMs": 11000, "endMs": 11500 },
  { "text": "and", "startMs": 11500, "endMs": 12000 },
  { "text": "detailed", "startMs": 12000, "endMs": 12500 },
  { "text": "with", "startMs": 12500, "endMs": 13000 },
  { "text": "several", "startMs": 13000, "endMs": 13500 },
  { "text": "notable", "startMs": 13500, "endMs": 14000 },
  { "text": "points", "startMs": 14000, "endMs": 14500 },
  { "text": "being", "startMs": 14500, "endMs": 15000 },
  { "text": "raised", "startMs": 15000, "endMs": 15500 },
  { "text": "about", "startMs": 15500, "endMs": 16000 },
  { "text": "the", "startMs": 16000, "endMs": 16500 },
  { "text": "technical", "startMs": 16500, "endMs": 17000 },
  { "text": "intricacies", "startMs": 17000, "endMs": 17500 },
  { "text": "of", "startMs": 17500, "endMs": 18000 },
  { "text": "the", "startMs": 18000, "endMs": 18500 },
  { "text": "issue", "startMs": 18500, "endMs": 19000 },
  { "text": "and", "startMs": 19000, "endMs": 19500 },
  { "text": "how", "startMs": 19500, "endMs": 20000 },
  { "text": "these", "startMs": 20000, "endMs": 20500 },
  { "text": "would", "startMs": 20500, "endMs": 21000 },
  { "text": "affect", "startMs": 21000, "endMs": 21500 },
  { "text": "the", "startMs": 21500, "endMs": 22000 },
  { "text": "overall", "startMs": 22000, "endMs": 22500 },
  { "text": "outcome", "startMs": 22500, "endMs": 23000 }
]
,
    "strokeColor": "black",
    "lineHeight": 2,
    "textColor": "yellow",
    "textOutline": "red",
    "marginTop": 960,
    "marginLeft": 10,
    "marginRight": 10,
    "textAnim": "fade",
}

# Instantiate the CaptionGenerator class
caption_generator = CaptionGenerator(data)

# Generate the audio file (saved to disk)
caption_generator.generate_audio_file()
