import axios from "axios";
import fs from "fs";
import path from "path";

export async function getElevenLabsAudio(text: string, voiceId: string) {
  const response = await axios({
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.8,
        style: 0.7,
        use_speaker_boost: true,
      },
    },
    responseType: "arraybuffer",
  });

  const filename = `response_${Date.now()}.mp3`;
  const filepath = path.resolve("public/audio", filename);
  fs.writeFileSync(filepath, Buffer.from(response.data), "binary");

  return `https://batistack-dev-server.onrender.com/audio/${filename}`;
}
