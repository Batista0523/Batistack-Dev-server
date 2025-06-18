
import express from "express";
import { getChatResponse } from "../service"

const chatBot = express.Router();

chatBot.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const reply = await getChatResponse(message);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Failed to get AI response." });
  }
});

export default chatBot;
