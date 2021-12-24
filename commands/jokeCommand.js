const fetch = require("node-fetch");
const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription(
			"I'll crack a joke for you! I've heard I'm not always appropriate."
		),
	async execute(interaction) {
		let api = await fetch("https://api.pgamerx.com/v5/joke?type=any", {
			method: "GET",
			headers: {
				authorization: "N4grsOtNNAeo",
			},
		});
		let joke = await api.json();

		if (joke.type === "twopart") {
			interaction.reply(joke.setup);
			setTimeout(() => {
				interaction.editReply(`${joke.setup} --- ${joke.delivery}`);
			}, 2000);
		} else if (joke.type === "joke") {
			interaction.reply(joke.joke);
		} else {
			interaction.reply("There seems to be an issue with the API");
		}
	},
};
