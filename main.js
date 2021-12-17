//#region Requires & Logins
require("dotenv").config();
// Discord Section
const { Client, Intents, Interaction } = require("discord.js");
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
