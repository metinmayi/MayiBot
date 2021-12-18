const fetch = require("node-fetch");
const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Fetches a joke for you. I hope you like it!"),
	async execute(interaction) {
		let api = await fetch(
			"https://random-stuff-api.p.rapidapi.com/joke?type=any",
			{
				method: "GET",
				headers: {
					authorization: "ER0hgkKs0lAG",
					"x-rapidapi-host": "random-stuff-api.p.rapidapi.com",
					"x-rapidapi-key":
						"66ad21f061mshfffe6f0e96b0587p12423ejsn25afa101cc98",
				},
			}
		);
		let joke = await api.json();

		if (joke.type === "twopart") {
			interaction.reply(joke.setup);
			setTimeout(() => {
				interaction.editReply(`${joke.setup} --- ${joke.delivery}`);
			}, 2000);
		} else {
			interaction.reply(joke.joke);
		}
	},
};
