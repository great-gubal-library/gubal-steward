import { Client, Message } from 'discord.js';
import { find as lodashFind } from 'lodash';
import { CONFIG } from '../config';
import { COMMANDS } from './commands';

const { prefix, token } = CONFIG;
const bot = new Client();

bot.once('ready', () => {
	console.log('Ready!');
});

// Command parsing
bot.on('message', (message: Message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = lodashFind(COMMANDS, ['name', commandName]);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send("Something went wrong processing the command.");
	}
});

bot.login(token);
