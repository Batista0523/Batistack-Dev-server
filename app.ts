import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Traffic from "./Controllers/traffic_eventControllers";
import DailyStats from "./Controllers/daily_statsControllers";
import SEOKeywords from "./Controllers/seo_keywordsControllers";
import Campaigns from "./Controllers/marketing-campaingControllers";
import Leads from "./Controllers/leadsControllers";
import AdminUser from "./Controllers/admin_userControllers";
import chatBot from "./Controllers/chatbotController";
import speedBot from "./Controllers/pageSpeedController";
import twilioRouter from "./Controllers/twilioVoiceControllers";
dotenv.config();
const app = express();
app.use("/audio", express.static("public/audio")); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/traffic", Traffic);
app.use("/daily-stats", DailyStats);
app.use("/seo-keywords", SEOKeywords);
app.use("/campaigns", Campaigns);
app.use("/leads", Leads);
app.use("/users", AdminUser);
app.use("/chatbot", chatBot);
app.use("/pagespeed",speedBot);
app.use("/twilio-voice", twilioRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Batistack Development API 🚀");
});

export default app;
