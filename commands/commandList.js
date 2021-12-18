const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("commandlist")
		.setDescription("Gives you a list of my available commands!"),
	async execute(interaction) {
		await interaction.reply(exampleEmbed);
	},
};
