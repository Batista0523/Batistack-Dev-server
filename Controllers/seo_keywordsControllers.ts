import express, { Request, Response } from "express";
import { getAllSEOKeywords, addSEOKeyword } from "../Queries/seo_keywords";

const SEOKeywords = express.Router();

SEOKeywords.get("/", async (req: Request, res: Response) => {
  try {
    const allKeywords = await getAllSEOKeywords();
    res.status(200).json({ success: true, payload: allKeywords });
  } catch (err) {
    console.error("Error getting SEO keywords:", err);
    res.status(500).json({ success: false, error: "Internal error getting SEO keywords" });
  }
});


SEOKeywords.post("/", async (req: Request, res: Response) => {
  try {
    await addSEOKeyword(req.body);
    res.status(201).json({ success: true, message: "SEO keyword added successfully" });
  } catch (err) {
    console.error("Error creating SEO keyword:", err);
    res.status(500).json({ success: false, error: "Internal error creating SEO keyword" });
  }
});

export default SEOKeywords;
