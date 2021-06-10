import { Message } from "discord.js";

export const Ping = {
	name: "ping",
	description: "Ping!",
	execute: (message: Message, args: string[]) => {
		message.channel.send("Pong.");
	},
};
