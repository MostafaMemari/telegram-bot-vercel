import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("سلام! ربات شما آماده است 🚀"));
bot.on("message:text", (ctx) => ctx.reply(`پیام شما: ${ctx.message.text}`));

const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  bot.start();
  console.log("🤖 Bot running locally with long polling...");
}

export default isDev ? () => new Response("Running in development mode") : webhookCallback(bot, "https");
