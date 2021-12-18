const fetch = require("node-fetch");
const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("newname")
		.setDescription("I'll give you a new name. Something I find suitable"),
	async execute(interaction) {
		let response = await fetch("https://api.namefake.com/");
		let data = await response.json();
		interaction.member.setNickname(data.name);
		interaction.reply("I've set your nickname to something more... proper.");
	},
};
