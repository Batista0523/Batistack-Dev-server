import express, { Request, Response } from "express";
import { twiml } from "twilio";
import { getSpokenChatResponse} from "../service";
const TwilioVoice = express.Router();

TwilioVoice.post("/", async (req: Request, res: Response) => {
  const voiceResponse = new twiml.VoiceResponse();

  voiceResponse.say(
    {
      voice: "alice",
      language: "en-US",
    },
    "Hi, thanks for calling Batistack. How can I help you today?"
  );

voiceResponse.gather({
  input: ["speech"], 
  action: "/twilio/handle-speech",
  method: "POST",
  speechTimeout: "auto",
});

  res.type("text/xml");
  res.send(voiceResponse.toString());
});
TwilioVoice.post("/handle-speech", async (req: Request, res: Response) => {
  const voiceResponse = new twiml.VoiceResponse();

  const userSpeech = req.body.SpeechResult;
  console.log("📞 User said:", userSpeech);

  if (!userSpeech) {
    voiceResponse.say("Sorry, I didn't catch that. Could you repeat?");
    voiceResponse.redirect("/voice"); // vuelve a empezar
    res.type("text/xml");
    return res.send(voiceResponse.toString());
  }

  try {
    const aiReply = await getSpokenChatResponse(userSpeech);

    voiceResponse.say(
      {
        voice: "Polly.Joanna", 
        language: "en-US",
      },
      aiReply
    );

    voiceResponse.gather({
      input: ["speech"],
      action: "/twilio/handle-speech",
      method: "POST",
      speechTimeout: "auto",
    });
  } catch (error) {
    voiceResponse.say(
      "I'm sorry, there was a technical issue. Please try again later."
    );
  }

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

export default TwilioVoice;
