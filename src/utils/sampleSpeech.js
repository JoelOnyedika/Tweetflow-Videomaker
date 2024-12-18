import {data} from './constants'

export default function speak() {
    let text = ""
    const loop = data.captions.forEach(element => {
        text += element.text + " "
    });
    const utterance = new SpeechSynthesisUtterance(text)

    const voices = speechSynthesis.getVoices()
    utterance.voice = voices[0]

    speechSynthesis.speak(utterance)
}