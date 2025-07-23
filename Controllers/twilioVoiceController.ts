import express from "express";
import twilio from "twilio";
import { getVoiceResponse } from "../service";
import { getElevenLabsAudio } from "../evenLabs";

const twilioRouter = express.Router();

twilioRouter.post("/", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const userInput = req.body.SpeechResult || "Hello there";

    const aiReply = await getVoiceResponse(userInput);
    const audioUrl = await getElevenLabsAudio(
      aiReply,
      process.env.ELEVENLABS_VOICE_ID!
    );

    twiml.play(audioUrl);

    twiml.gather({
      input: ["speech"],
      action: "/twilio-voice",
      method: "POST",
      speechTimeout: "auto",
    });

    res.type("text/xml").send(twiml.toString());
  } catch (err) {
    console.error("Voice Agent Error:", err);
    twiml.say("Sorry, I’m having trouble responding. Please try again later.");
    res.type("text/xml").send(twiml.toString());
  }
});

export default twilioRouter;
