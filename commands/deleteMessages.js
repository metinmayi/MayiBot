const fetch = require("node-fetch");
const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("deletemessages")
		.setDescription(
			"Deletes 50 previous messages. Dad says I've got to keep things tidy!"
		),
	async execute(interaction) {
		const messages = await interaction.channel.messages.fetch();
		interaction.channel.bulkDelete(messages);
		interaction.reply("All messages were deleted");
	},
};
