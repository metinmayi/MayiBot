const {
	slashCommandBuilder,
	SlashCommandBuilder,
} = require("@discordjs/builders");
const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGODB_TOKEN);
mongoClient.connect((error, success) => {});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("myprofile")
		.setDescription("Shows your profile"),
	async execute(interaction) {
		//Finds the user from the DB
		const userListing = await mongoClient
			.db("wiseguy")
			.collection("users")
			.findOne({ tag: interaction.member.user.tag });
		//Insers the correct userinfo into the embed. Collapse this if youre not changing anything
		const embed = {
			title: userListing.name,
			description: "Information about your profile.",
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
				name: "User profile",
				icon_url: interaction.member.user.displayAvatarURL(),
			},
			fields: [
				{
					name: `Level: ${userListing.level}`,
					value: "Gain levels through interacting with the bot.",
				},
				{
					name: "Experience",
					value: `${userListing.experience} / ${userListing.levelupExperience}`,
				},
				{
					name: "Rank",
					value: `${userListing.rank}`,
				},
			],
		};
		await interaction.reply({ embeds: [embed] });
	},
};
