import { webhookCallback } from "grammy";
import { bot } from "./bot";

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  console.log("🤖 Running in development mode with polling...");
  bot.start(); // فقط polling
} else {
  console.log("🚀 Running in production mode with webhook...");
}

export default isDev ? undefined : webhookCallback(bot, "https");
