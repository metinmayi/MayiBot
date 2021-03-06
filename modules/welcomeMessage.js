const { MessageEmbed } = require("discord.js");

async function welcomeMessage(mongoClient, member) {
	const userListing = await mongoClient
		.db("wiseguy")
		.collection("users")
		.findOne({ tag: member.user.tag });

	//Create an embed for the user. Collapse it if you're not changing anything
	const embed = {
		title: member.user.username,
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
			icon_url: member.user.displayAvatarURL(),
		},
		fields: [
			{
				name: `Level: ${userListing.level}`,
				value: "Gain experience through interacting with the bot.",
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
	member.send(
		`Welcome to the server ${member.user.username}! \n I am Wiseguy, a bot built with the NodeJS library: discord.js.\n My creator also uses MongoDB to make me store data, such as your newly created profile:`
	);
	member.send({ embeds: [embed] });
	member.send(
		'You can find a list of all my available commands by navigating to the discord server and typing "/commandlist"'
	);
}

module.exports = welcomeMessage;
