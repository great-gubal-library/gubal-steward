const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("../config.json");

const bot = new Discord.Client();
const commandPath = `${__dirname}/commands`;

bot.commands = new Discord.Collection();

// Reading commands dynamically from separate files
const commandFolders = fs.readdirSync(commandPath);

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`${commandPath}/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}

bot.once("ready", () => {
	console.log("Ready!");
});

// Command parsing
bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!bot.commands.has(commandName)) return;

	const command = bot.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

bot.login(token);
