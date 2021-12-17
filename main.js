//#region Requires & Logins
require("dotenv").config();
const { assert } = require("console");
// Discord Section
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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
