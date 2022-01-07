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
		try {
			let api = await fetch(
				"https://random-stuff-api.p.rapidapi.com/joke?type=pun%20&blacklist=nsfw",
				{
					method: "GET",
					headers: {
						authorization: "N4grsOtNNAeo",
						"x-rapidapi-host": "random-stuff-api.p.rapidapi.com",
						"x-rapidapi-key":
							"3505e69db4msh59f7918406daef7p14c96fjsnaa69b28886d7",
					},
				}
			);
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
		} catch (err) {
			console.log("error");
		}
	},
};
