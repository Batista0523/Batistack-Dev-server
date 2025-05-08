// src/queries/dailyStatsQueries.ts
import db from "../DB/db.config";


export interface DailyStat {
  id?: number;
  date: string;
  total_visits: number;
  total_clicks: number;
  unique_visitors: number;
}

 const getAllDailyStats = async (): Promise<DailyStat[]> => {
  try {
    const allStats = await db.any<DailyStat>("SELECT * FROM daily_stats ORDER BY date DESC");
    return allStats;
  } catch (error) {
    throw new Error("Error fetching daily stats: " + error);
  }
};


 const upsertDailyStats = async (stat: DailyStat): Promise<void> => {
  try {
    await db.none(
      `INSERT INTO daily_stats (date, total_visits, total_clicks, unique_visitors)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (date) DO UPDATE 
       SET total_visits = $2, total_clicks = $3, unique_visitors = $4`,
      [stat.date, stat.total_visits, stat.total_clicks, stat.unique_visitors]
    );
  } catch (error) {
    throw new Error("Error updating daily stats: " + error);
  }
};

export {
    getAllDailyStats,
    upsertDailyStats
}