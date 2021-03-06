async function DBcreateUser(mongoClient, member) {
	//Checks if there is already a listing(user) with the same member.user.tag
	const alreadyExistingUser = await mongoClient
		.db("wiseguy")
		.collection("users")
		.findOne({ tag: member.user.tag });
	//If there is an existing user, do nothing, else create a new user.
	if (alreadyExistingUser) return;
	else {
		const newUser = {
			name: `Wiseguy ${member.user.username}`,
			level: 1,
			experience: 0,
			levelupExperience: 1000,
			rank: "Novice",
			tag: member.user.tag,
		};
		mongoClient.db("wiseguy").collection("users").insertOne(newUser);
	}
}

module.exports = DBcreateUser;
