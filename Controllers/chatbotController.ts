
import express from "express";
import { getChatResponse } from "../service";
import { sendChatNotificationEmail } from "../emailService"; // <- make sure it's imported

const chatBot = express.Router();

chatBot.post("/", async (req, res) => {
  try {
    const { message, chatHistory, isFinished } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const reply = await getChatResponse(message);

    if (isFinished && Array.isArray(chatHistory)) {
      const fullChat = chatHistory
        .map((msg: any) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
        .join("\n\n");

      await sendChatNotificationEmail(fullChat);
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

export default chatBot;
