import express, { Request, Response } from "express";
import { getAllCampaigns, addCampaign } from "../Queries/marketing_campaings";

const Campaigns = express.Router();


Campaigns.get("/", async (req: Request, res: Response) => {
  try {
    const allCampaigns = await getAllCampaigns();
    res.status(200).json({ success: true, payload: allCampaigns });
  } catch (err) {
    console.error("Error getting campaigns:", err);
    res.status(500).json({ success: false, error: "Internal error getting campaigns" });
  }
});


Campaigns.post("/", async (req: Request, res: Response) => {
  try {
    await addCampaign(req.body);
    res.status(201).json({ success: true, message: "Campaign added successfully" });
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ success: false, error: "Internal error creating campaign" });
  }
});

export default Campaigns;
