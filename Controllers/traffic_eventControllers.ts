import express, { Request, Response } from "express";
import {
  getAllTrafficEvents,
  getTrafficEventsByDate,
  addTrafficEvent
} from "../Queries/traffic_events"

const Traffic = express.Router();


Traffic.get("/", async (req: Request, res: Response) => {
  try {
    const allTraffic = await getAllTrafficEvents();
    res.status(200).json({ success: true, payload: allTraffic });
  } catch (err) {
    console.error("Error getting traffic events:", err);
    res.status(500).json({ success: false, error: "Internal error getting traffic events" });
  }
});


Traffic.get("/date", async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as { startDate: string; endDate: string };
    const trafficByDate = await getTrafficEventsByDate(startDate, endDate);
    res.status(200).json({ success: true, payload: trafficByDate });
  } catch (err) {
    console.error("Error getting traffic events by date:", err);
    res.status(500).json({ success: false, error: "Internal error getting traffic by date" });
  }
});


Traffic.post("/", async (req: Request, res: Response) => {
  try {
    await addTrafficEvent(req.body);
    res.status(201).json({ success: true, message: "Traffic event added successfully" });
  } catch (err) {
    console.error("Error creating traffic event:", err);
    res.status(500).json({ success: false, error: "Internal error creating traffic event" });
  }
});

export default Traffic;
