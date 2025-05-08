import express, { Request, Response } from "express";
import { getAllDailyStats, upsertDailyStats } from "../Queries/daily_stats"

const DailyStats = express.Router();


DailyStats.get("/", async (req: Request, res: Response) => {
  try {
    const allStats = await getAllDailyStats();
    res.status(200).json({ success: true, payload: allStats });
  } catch (err) {
    console.error("Error getting daily stats:", err);
    res.status(500).json({ success: false, error: "Internal error getting daily stats" });
  }
});


DailyStats.post("/", async (req: Request, res: Response) => {
  try {
    await upsertDailyStats(req.body);
    res.status(201).json({ success: true, message: "Daily stats updated successfully" });
  } catch (err) {
    console.error("Error updating daily stats:", err);
    res.status(500).json({ success: false, error: "Internal error updating daily stats" });
  }
});

export default DailyStats;
