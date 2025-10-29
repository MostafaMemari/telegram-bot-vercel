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
  // در حالت توسعه از polling استفاده کن
  bot.start();
  console.log("🤖 Bot running locally with long polling...");
}

// همیشه یک export داشته باش
export default isDev
  ? // در حالت dev، یک هندلر خنثی برگردون تا Vercel مشکلی نداشته باشه
    () => new Response("Running in development mode")
  : // در حالت production، webhook واقعی
    webhookCallback(bot, "https");
