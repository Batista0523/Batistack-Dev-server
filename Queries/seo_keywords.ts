// src/queries/seoKeywordsQueries.ts
import db from "../DB/db.config";


export interface SEOKeyword {
  id?: number;
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avg_position: number;
  date: string;
}


const getAllSEOKeywords = async (): Promise<SEOKeyword[]> => {
  try {
    const allKeywords = await db.any<SEOKeyword>("SELECT * FROM seo_keywords ORDER BY date DESC");
    return allKeywords;
  } catch (error) {
    throw new Error("Error fetching SEO keywords: " + error);
  }
};


const addSEOKeyword = async (keyword: SEOKeyword): Promise<void> => {
  try {
    await db.none(
      `INSERT INTO seo_keywords (keyword, impressions, clicks, ctr, avg_position, date) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [keyword.keyword, keyword.impressions, keyword.clicks, keyword.ctr, keyword.avg_position, keyword.date]
    );
  } catch (error) {
    throw new Error("Error adding SEO keyword: " + error);
  }
};


export {
    getAllSEOKeywords,
    addSEOKeyword
}