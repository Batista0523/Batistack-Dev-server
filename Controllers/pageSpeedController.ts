import express from "express";
import { analyzeWebsiteAndGetRecommendations } from "../service";
const speedBot = express.Router();

speedBot.post("/", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain || !domain.startsWith("http")) {
      return res.status(400).json({
        error: "Please include a valid URL starting with http/https",
      });
    }

    const { scores, recommendations } = await analyzeWebsiteAndGetRecommendations(domain);

    res.status(200).json({ scores, recommendations });
  } catch (error) {
    console.error("PageSpeed error:", error);
    res.status(500).json({ error: "Something went wrong during analysis." });
  }
});

export default speedBot;
