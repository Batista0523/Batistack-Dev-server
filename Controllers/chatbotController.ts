import express from "express";
import { getChatResponse } from "../service";
import { getVoiceResponse } from "../service";
import { sendChatNotificationEmail } from "../emailService";

const chatBot = express.Router();

chatBot.post("/", async (req, res) => {
  try {
    const { message, chatHistory, isFinished, userDetails } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const reply = await getChatResponse(message);

    if (isFinished && Array.isArray(chatHistory)) {
      const fullChat = chatHistory
        .map((msg: any) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n\n");

      await sendChatNotificationEmail(fullChat, userDetails);
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

chatBot.post("/batistack-ai", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token !== process.env.DIALOGFLOW_SECRET_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userMessage =
      req.body?.sessionInfo?.parameters?.userMessage || "Tell me about Batistack";

    const reply = await getVoiceResponse(userMessage);

    res.status(200).json({
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [reply],
            },
          },
        ],
      },
    });
  } catch (err) {
    console.error("Dialogflow Tool Error:", err);
    res.status(500).json({ error: "Failed to respond to Dialogflow." });
  }
});


export default chatBot;
