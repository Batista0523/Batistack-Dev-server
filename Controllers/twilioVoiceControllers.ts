import express from "express";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import axios from "axios";

const twilioRouter = express.Router();

twilioRouter.post("/", async (req, res) => {
  const twiml = new VoiceResponse();
 const gather = twiml.gather({
  input: ["speech"], 
  action: "/twilio-voice/twilio-voice-response",
  speechTimeout: "auto",
});

  gather.say("Hi! Welcome to Batistack. How can I help you today?");
  res.type("text/xml");
  res.send(twiml.toString());
});


twilioRouter.post("/twilio-voice-response", async (req, res) => {
  const userMessage = req.body.SpeechResult || "No speech received";

  const dialogflowReply = await axios.post(
    "https://batistack-dev-server.onrender.com/chatbot/batistack-ai",
    {
      sessionInfo: {
        parameters: {
          userMessage,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.DIALOGFLOW_SECRET_TOKEN}`,
      },
    }
  );

  const reply =
    dialogflowReply.data?.fulfillment_response?.messages?.[0]?.text?.text?.[0] ||
    "Sorry, I couldn’t understand that.";

  const twiml = new VoiceResponse();
  twiml.say(reply);
  res.type("text/xml");
  res.send(twiml.toString());
});

export default twilioRouter;
