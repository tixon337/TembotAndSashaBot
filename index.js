// Подключаем библиотеку для работы с Telegram API в переменную
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { CronJob } from 'cron';

dotenv.config();

// Устанавливаем токен, который выдавал нам бот
const token = '2044126598:AAGVdD2LT_Rd1B5joOYA2EfmFqgSW5uOnpQ';
const happyDate = new Date('2021-07-16 21:00');
const bot = new TelegramBot(token, { polling: true });
const job = CronJob('0 10 * * *', function () {
	bot.sendMessage(584125131, 'Еще один день с Темботом');
});

job.start();

function diffDates(day_one, day_two) {
	return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
}

function diffHours(day_one, day_two) {
	return Math.round((day_one - day_two) / (60 * 60 * 1000));
}

function diffMinutes(day_one, day_two) {
	return Math.round((day_one - day_two) / (60 * 1000));
}

function diffSeconds(day_one, day_two) {
	return Math.round((day_one - day_two) / 1000);
}

bot.onText(/сколько/gi, (msg, match) => {
	const fromId = msg.from.id; // Получаем ID отправителя
	const nowDate = new Date();
	console.log(msg.from);
	bot.sendMessage(fromId, `Привет ${msg.from.username}`);
	bot.sendMessage(
		fromId,
		`Вы встречаетесь\n
         ${diffDates(nowDate, happyDate)} дней\n 
        ${diffHours(nowDate, happyDate)} часов\n 
        ${diffMinutes(nowDate, happyDate)} минут\n
        ${diffSeconds(nowDate, happyDate)} секунд`
	);
});
