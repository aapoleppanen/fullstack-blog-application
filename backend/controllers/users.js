const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
	const users = await User.find({}).populate("posts", {
		title: 1,
		author: 1,
		url: 1,
		likes: 1,
	});
	response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
	const body = request.body;
	if (body.password.length < 3) {
		response
			.status(400)
			.send({ error: "Password must be longer than 3 characters" });
	}

	const saltRounds = 10;

	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await user.save();
	response.json(savedUser);
});

module.exports = usersRouter;
