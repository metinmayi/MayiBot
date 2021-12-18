const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");

const { MessageEmbed } = require("discord.js");

//Commandlist embed
const embed = {
	title: "Wiseguy's commands",
	description: "Below you can find a list of all my commands, enjoy!",
	url: "",
	color: 11137603,
	footer: {
		icon_url: "",
		text: "I have not created any of the APIs used for this bot.",
	},
	thumbnail: {
		url: "https://gcdn.pbrd.co/images/u1P2JNb317nx.jpg?o=1",
	},
	author: {
		name: "Metin Mayi",
		url: "https://github.com/metinmayi",
		icon_url: "https://avatars.githubusercontent.com/u/90765914?v=4",
	},
	fields: [
		{
			name: "/joke",
			value: "Fetches a random joke from an API.",
		},
	],
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("commandlist")
		.setDescription("Gives you a list of my available commands!"),
	async execute(interaction) {
		await interaction.reply({ embeds: [embed] });
	},
};
