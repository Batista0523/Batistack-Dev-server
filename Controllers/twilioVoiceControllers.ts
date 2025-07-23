import express from "express";
import twilio from "twilio";
import { getVoiceResponse } from "../service";
import { getElevenLabsAudio } from "../evenLabs";

const twilioRouter = express.Router();

twilioRouter.post("/", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  try {
    const userInput = req.body.SpeechResult;
    const aiPrompt = userInput
      ? userInput
      : "Please greet the caller with a friendly welcome from Batistack Development and ask how you can help.";

    console.log("📞 User said:", userInput || "(no input)");
    console.log("🧠 Sending to OpenAI:", aiPrompt);

    const aiReply = await getVoiceResponse(aiPrompt);
    console.log("🤖 OpenAI replied:", aiReply);

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
    console.error("❌ Voice Agent Error:", err);
    twiml.say("Sorry, I’m having trouble responding. Please try again later.");
    res.type("text/xml").send(twiml.toString());
  }
});

export default twilioRouter;
