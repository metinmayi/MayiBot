//#region Requires & Logins
const fs = require("fs");
require("dotenv").config();
const welcomeMessage = require("./modules/welcomeMessage");
const DBcreateUser = require("./modules/DBCreateUser");
const levelup = require("./modules/DBLevelup");
// Discord Section
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILD_MEMBERS",
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_INTEGRATIONS",
		"GUILD_PRESENCES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING",
	],
});
client.login(process.env.DISCORD_TOKEN);
client.once("ready", () => {
	console.log("Wiseguy is online!");
});
//MongoDB section
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_TOKEN);
mongoClient.connect((error, success) => {
	console.log("Database is connected!");
});

//#endregion

//#region Setup import of commands from ./commands
client.commands = new Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));
commandFiles.forEach((file) => {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
});
//#endregion

//Handles all of the slash commands for the discord bot, including the experience/levelup.
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		levelup(mongoClient, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: `There was an error executing the command`,
		});
	}
});

//Regsiters new users
client.on("guildMemberAdd", async (member) => {
	await DBcreateUser(mongoClient, member); // Stuck at pending
	welcomeMessage(mongoClient, member); // Shouldnt run?
});
