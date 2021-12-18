const fetch = require("node-fetch");
const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("wisdom")
		.setDescription(
			"I'll inspire you! Dad says I don't always give the best advice though..."
		),
	async execute(interaction) {
		let response = await fetch(
			"https://ajith-messages.p.rapidapi.com/getMsgs?category=Random",
			{
				method: "GET",
				headers: {
					"x-rapidapi-host": "ajith-messages.p.rapidapi.com",
					"x-rapidapi-key":
						"66ad21f061mshfffe6f0e96b0587p12423ejsn25afa101cc98",
				},
			}
		);
		let data = await response.json();
		interaction.reply(data.Message);
	},
};
