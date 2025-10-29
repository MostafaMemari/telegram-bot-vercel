import { webhookCallback } from "grammy";
import { bot } from "./bot";

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  console.log("🤖 Running in development mode with polling...");
  bot.start(); // لوکال
} else {
  console.log("🚀 Running in production mode with webhook...");
}

export default isDev
  ? (req: any, res: any) => {
      res.statusCode = 200;
      res.end("Bot is running in development mode");
    }
  : webhookCallback(bot, "https");
