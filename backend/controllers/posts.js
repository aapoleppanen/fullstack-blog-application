const postRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const middleware = require("../utils/middleware");

postRouter.get("/", async (request, response, next) => {
	const posts = await Post.find({})
		.populate("user", { username: 1, name: 1 })
		.populate("comments", { content: 1 });
	response.json(posts);
});

postRouter.post(
	"/",
	middleware.userExtractor,
	async (request, response, next) => {
		if (request.body.likes === undefined) {
			request.body.likes = 0;
		}

		const user = request.user;

		const post = new Post(request.body);

		post.user = user._id;

		const savedPost = await post.save();
		user.posts = user.posts.concat(savedPost._id);
		user.save();

		response.status(201).json(savedPost);
	}
);

postRouter.delete(
	"/:id",
	middleware.userExtractor,
	async (request, response, next) => {
		const post = await Post.findById(request.params.id);
		if (post.user.toString() !== request.user.id) {
			return response
				.status(401)
				.json({ error: "Only the author of the post can delete it" });
		}
		await Post.findByIdAndRemove(request.params.id);
		response.status(204).end();
	}
);

postRouter.put(
	"/:id",
	middleware.userExtractor,
	async (request, response, next) => {
		const body = request.body;
		const oldPost = await Post.findById(request.params.id);
		const updatedPost = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: body.user,
			comments: oldPost.comments,
		};

		const result = await Post.findByIdAndUpdate(
			request.params.id,
			updatedPost,
			{
				new: true,
			}
		);
		const output = { ...result._doc, comments: body.comments };
		delete output._id;
		output.id = request.params.id;
		response.json(output);
	}
);

postRouter.post(
	"/:id/comments",
	middleware.userExtractor,
	async (request, response, next) => {
		const user = request.user;
		const comment = new Comment(request.body);

		comment.user = user._id;
		comment.post = request.params.id;

		const savedComment = await comment.save();
		const post = await Post.findById(request.params.id);
		post.comments = post.comments.concat(savedComment._id);
		const savedPost = await post.save();

		response.status(201).json(savedPost);
	}
);

module.exports = postRouter;
