async function levelup(mongoClient, interaction) {
	//Finds the user in the DB.
	const userListing = await mongoClient
		.db("wiseguy")
		.collection("users")
		.findOne({ tag: interaction.member.user.tag });
	//If the gained experience results in a level up. Increase level by 1 and set experience to 0.
	if (userListing.experience + 300 >= userListing.levelupExperience) {
		await mongoClient
			.db("wiseguy")
			.collection("users")
			.updateOne(
				{ tag: interaction.member.user.tag },
				{
					$set: {
						experience: 0,
					},
				}
			);
		await mongoClient
			.db("wiseguy")
			.collection("users")
			.updateOne(
				{ tag: interaction.member.user.tag },
				{
					$inc: {
						level: 1,
					},
				}
			);
		await mongoClient
			.db("wiseguy")
			.collection("users")
			.updateOne(
				{ tag: interaction.member.user.tag },
				{
					$mul: {
						levelupExperience: 1.25,
					},
				}
			);
		await interaction.followUp("You leveled up!");
	} else {
		await mongoClient
			.db("wiseguy")
			.collection("users")
			.updateOne(
				{ tag: interaction.member.user.tag },
				{ $inc: { experience: 300 } }
			);
	}
}

module.exports = levelup;
