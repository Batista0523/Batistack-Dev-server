
import db from "../DB/db.config";


export interface Lead {
  id?: number;
  name: string;
  email: string;
  message: string;
  source: string;
  created_at?: Date;
}


 const getAllLeads = async (): Promise<Lead[]> => {
  try {
    const allLeads = await db.any<Lead>("SELECT * FROM leads ORDER BY created_at DESC");
    return allLeads;
  } catch (error) {
    throw new Error("Error fetching leads: " + error);
  }
};


 const addLead = async (lead: Lead): Promise<void> => {
  try {
    await db.none(
      `INSERT INTO leads (name, email, message, source) 
       VALUES ($1, $2, $3, $4)`,
      [lead.name, lead.email, lead.message, lead.source]
    );
  } catch (error) {
    throw new Error("Error adding lead: " + error);
  }
};

export{
getAllLeads,
addLead
}