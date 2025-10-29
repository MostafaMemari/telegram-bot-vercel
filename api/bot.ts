import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("سلام! ربات شما آماده است 🚀"));
bot.on("message:text", (ctx) => ctx.reply(`پیام شما: ${ctx.message.text}`));

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  console.log("🤖 Running in development mode with polling...");
  bot.start();
}

export default async function handler(req: any, res: any) {
  if (isDev) {
    res.statusCode = 200;
    res.end("Bot is running in development mode");
    return;
  }

  const handle = webhookCallback(bot, "https");
  return handle(req, res);
}
