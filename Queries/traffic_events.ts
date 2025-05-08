
import db from "../DB/db.config";


export interface TrafficEvent {
  id?: number;
  event_type: string;
  path: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  user_agent?: string;
  ip_address?: string;
  created_at?: Date;
}


const getAllTrafficEvents = async (): Promise<TrafficEvent[]> => {
  try {
    const allTraffic = await db.any<TrafficEvent>("SELECT * FROM traffic_events ORDER BY created_at DESC");
    return allTraffic;
  } catch (error) {
    throw new Error("Error fetching traffic events: " + error);
  }
};


const getTrafficEventsByDate = async (startDate: string, endDate: string): Promise<TrafficEvent[]> => {
  try {
    const trafficByDate = await db.any<TrafficEvent>(
      "SELECT * FROM traffic_events WHERE created_at BETWEEN $1 AND $2 ORDER BY created_at DESC",
      [startDate, endDate]
    );
    return trafficByDate;
  } catch (error) {
    throw new Error("Error fetching traffic events by date: " + error);
  }
};


const addTrafficEvent = async (event: TrafficEvent): Promise<void> => {
  try {
    await db.none(
      `INSERT INTO traffic_events (event_type, path, referrer, utm_source, utm_medium, utm_campaign, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        event.event_type,
        event.path,
        event.referrer,
        event.utm_source,
        event.utm_medium,
        event.utm_campaign,
        event.user_agent,
        event.ip_address
      ]
    );
  } catch (error) {
    throw new Error("Error adding traffic event: " + error);
  }
};

export {
    getAllTrafficEvents,
    addTrafficEvent,
    getTrafficEventsByDate,
    
}