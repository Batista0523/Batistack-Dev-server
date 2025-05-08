
import express, { Request, Response } from "express";
import { getAllLeads, addLead } from "../Queries/leads";
import { sendLeadNotification } from "../serviceEmail"; 

const Leads = express.Router();


Leads.get("/", async (req: Request, res: Response) => {
  try {
    const allLeads = await getAllLeads();
    res.status(200).json({ success: true, payload: allLeads });
  } catch (err) {
    console.error("Error getting leads:", err);
    res.status(500).json({ success: false, error: "Internal error getting leads" });
  }
});


Leads.post("/", async (req: Request, res: Response) => {
  try {
    const newLead = await addLead(req.body);
    await sendLeadNotification(req.body); 

    res.status(201).json({ success: true, message: "Lead added successfully", payload: newLead });
  } catch (err) {
    console.error("Error creating lead:", err);
    res.status(500).json({ success: false, error: "Internal error creating lead" });
  }
});

export default Leads;
