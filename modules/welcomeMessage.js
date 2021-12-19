const { MessageEmbed } = require("discord.js");
const embed = {
	title: "User profile",
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
		name: "Metin Mayi",
		url: "https://github.com/metinmayi",
		icon_url: "https://avatars.githubusercontent.com/u/90765914?v=4",
	},
	fields: [
		{
			name: "Level: 1",
			value: "Gain levels through interacting with with the bot.",
		},
		{
			name: "ID",
			value: "31232132141512512",
		},
		{
			name: "Rank",
			value: "Novice",
		},
	],
};

async function welcomeMessage(mongoClient, member) {
	const userListing = await mongoClient
		.db("wiseguy")
		.collection("users")
		.findOne({ tag: member.user.tag });

	console.log(userListing);
	//Create an embed for the user. Collapse it if you're not changing anything
	const embed = {
		title: "User profile",
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
			name: member.user.username,
			icon_url: member.user.defaultAvatarURL,
		},
		fields: [
			{
				name: `Level: ${userListing.level}`,
				value: "Gain levels through interacting with with the bot.",
			},
			{
				name: "ID",
				value: `${userListing._id}`,
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
}

module.exports = welcomeMessage;
