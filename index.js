import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new DiscordJS.Client({
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.once("Ready", () => {
    console.log("Bot's ready :D")
})

client.on("messageCreate", (message) => {
    // example onmessage event
})

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.login(process.env.TOKEN)