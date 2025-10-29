import { Bot, webhookCallback } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

// دستور /start
bot.command("start", (ctx) => ctx.reply("سلام! ربات شما آماده است 🚀"));

// هر پیام دیگه رو جواب بده
bot.on("message:text", (ctx) => ctx.reply(`پیام شما: ${ctx.message.text}`));

// export برای Vercel
export default webhookCallback(bot, "std/http");
