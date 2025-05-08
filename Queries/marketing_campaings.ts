
import db from "../DB/db.config";

export interface Campaign {
  id?: number;
  name: string;
  platform: string;
  utm_campaign: string;
  budget: number;
  start_date: string;
  end_date: string;
}


const getAllCampaigns = async (): Promise<Campaign[]> => {
  try {
    const allCampaigns = await db.any<Campaign>("SELECT * FROM marketing_campaigns ORDER BY start_date DESC");
    return allCampaigns;
  } catch (error) {
    throw new Error("Error fetching campaigns: " + error);
  }
};


const addCampaign = async (campaign: Campaign): Promise<void> => {
  try {
    await db.none(
      `INSERT INTO marketing_campaigns (name, platform, utm_campaign, budget, start_date, end_date) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [campaign.name, campaign.platform, campaign.utm_campaign, campaign.budget, campaign.start_date, campaign.end_date]
    );
  } catch (error) {
    throw new Error("Error adding campaign: " + error);
  }
};

export {
    getAllCampaigns,
    addCampaign
}