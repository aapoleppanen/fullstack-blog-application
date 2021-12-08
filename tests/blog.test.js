const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Post = require("../models/post");
const User = require("../models/user");

let userObject;
let token;

beforeAll(async () => {
	await User.deleteMany({});

	const testUser = {
		username: "TestUser",
		name: "tester",
		password: "password",
	};

	await api.post("/api/users").send(testUser);

	userObject = await api
		.post("/api/login")
		.send({ username: "TestUser", password: "password" });
	token = userObject.body.token;
});

beforeEach(async () => {
	await Post.deleteMany({});

	const postObjects = helper.initialPosts.map((post) => {
		post.user = userObject.body.id;
		const e = new Post(post);
		return e;
	});
	const promiseArray = postObjects.map((post) => post.save());
	await Promise.all(promiseArray);
});

test("Correct amount of posts are returned as json", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-type", /application\/json/);
	expect(response.body).toHaveLength(helper.initialPosts.length);
});

test("Identifier property is named id", async () => {
	const allPosts = await helper.postsInDb();
	expect(allPosts[0].id).toBeDefined();
});

test("Post request succesfully creates a new post", async () => {
	const newPost = {
		title: "Aapon oma",
		author: "Aapo",
		url: "www.kapo.com",
		likes: 7,
	};
	await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(newPost)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const postsAtEnd = await helper.postsInDb();

	expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1);
});

test("Post request responds with 401 if token is not provided", async () => {
	const newPost = {
		title: "Aapon oma",
		author: "Aapo",
		url: "www.kapo.com",
		likes: 7,
	};
	await api.post("/api/blogs").send(newPost).expect(401);
});

test("if like propert is missing it will default to 0", async () => {
	const newPost = {
		title: "Aapon oma",
		author: "Aapo",
		url: "www.kapo.com",
	};
	const savedPost = await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(newPost)
		.expect(201)
		.expect("Content-Type", /application\/json/);
	expect(savedPost.body.likes).toEqual(0);
});

test("if title and url properties are missing 400 bad request is responded", async () => {
	const newPost = {
		author: "Aapo",
	};
	const badReq = await api
		.post("/api/blogs")
		.set("Authorization", `bearer ${token}`)
		.send(newPost)
		.expect(400);
});

test("A post can be deleted succesfully according to id", async () => {
	const postsAtStart = await helper.postsInDb();
	const postToDelete = postsAtStart[0];

	await api
		.delete(`/api/blogs/${postToDelete.id}`)
		.set("Authorization", `bearer ${token}`)
		.expect(204);

	const postsAtEnd = await helper.postsInDb();

	expect(postsAtEnd).toHaveLength(helper.initialPosts.length - 1);

	const contents = postsAtEnd.map((e) => e.title);

	expect(contents).not.toContain(postToDelete.title);
});

describe("User tests", () => {
	test("Duplicate users cannot be created", async () => {
		const newUser = {
			username: "TestUser",
			name: "aa",
			password: "test",
		};
		await api.post("/api/users").send(newUser).expect(400);
	});
	test("Passwords shorter than 3 characters are not allowed", async () => {
		const newUser = {
			username: "Aapo",
			name: "aa",
			password: "te",
		};
		await api.post("/api/users").send(newUser).expect(400);
	});
	test("Usernames shorter than 3 characters are not allowed", async () => {
		const newUser = {
			username: "Aa",
			name: "aa",
			password: "test",
		};
		await api.post("/api/users").send(newUser).expect(400);
	});
});

// test("Returns 400 if id is not found on delete", async () => {
// 	const notRealId = await helper.nonExistingId();

// 	await api.delete(`/api/blogs/${notRealId}`).expect(400);
// });

afterAll(() => {
	mongoose.connection.close();
});
