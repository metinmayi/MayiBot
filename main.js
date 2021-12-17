// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
console.log("Up and running!");
