// const supertest = require("supertest");
// const mongoose = require("mongoose");
const listHelper = require("../utils/list_helper");
// const app = require("../app");
// const api = supertest(app);

// const Post = require("../models/post");

// beforeEach(async () => {
// 	await Post.deleteMany({});

// 	const postObjects = helper.initialNotes.map((note) => new Note(note));
// 	const promiseArray = noteObjects.map((note) => note.save());
// 	await Promise.all(promiseArray);
// });

describe("Total likes of", () => {
	test("an empty array returns 0", () => {
		const blogs = [];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(0);
	});
	test("a single post is the same as the likes on the post", () => {
		const blogs = [
			{
				_id: { $oid: "60e56816e03afb36797e6bea" },
				title: "Aapo's blog",
				author: "aabo",
				url: "www.kaapo.com",
				likes: 5,
				__v: 0,
			},
		];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(5);
	});
	test("many posts returns the aggregate amount", () => {
		const blogs = [
			{
				_id: "5a422a851b54a676234d17f7",
				title: "React patterns",
				author: "Michael Chan",
				url: "https://reactpatterns.com/",
				likes: 7,
				__v: 0,
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				__v: 0,
			},
			{
				_id: "5a422b891b54a676234d17fa",
				title: "First class tests",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
				likes: 10,
				__v: 0,
			},
			{
				_id: "5a422ba71b54a676234d17fb",
				title: "TDD harms architecture",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
				likes: 0,
				__v: 0,
			},
			{
				_id: "5a422bc61b54a676234d17fc",
				title: "Type wars",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
				likes: 2,
				__v: 0,
			},
		];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(36);
	});
});

describe("The most liked entry of", () => {
	test("an empty array returns null", () => {
		const blogs = [];
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toBe(null);
	});
	test("one array returns the array", () => {
		const blogs = [
			{
				_id: { $oid: "60e56816e03afb36797e6bea" },
				title: "Aapo's blog",
				author: "aabo",
				url: "www.kaapo.com",
				likes: 5,
				__v: 0,
			},
		];
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(blogs[0]);
	});
	test("many posts returns one with most likes", () => {
		const blogs = [
			{
				_id: "5a422a851b54a676234d17f7",
				title: "React patterns",
				author: "Michael Chan",
				url: "https://reactpatterns.com/",
				likes: 7,
				__v: 0,
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				__v: 0,
			},
			{
				_id: "5a422b891b54a676234d17fa",
				title: "First class tests",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
				likes: 10,
				__v: 0,
			},
			{
				_id: "5a422ba71b54a676234d17fb",
				title: "TDD harms architecture",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
				likes: 0,
				__v: 0,
			},
			{
				_id: "5a422bc61b54a676234d17fc",
				title: "Type wars",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
				likes: 2,
				__v: 0,
			},
		];
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(blogs[2]);
	});
});

describe("The blogs by an author in a collection of", () => {
	test.only("an empty array returns null", () => {
		const blogs = [];
		const result = listHelper.mostBlogs(blogs);
		expect(result).toBe(null);
	});
	test.only("one array returns the one author and 1 count", () => {
		const blogs = [
			{
				_id: { $oid: "60e56816e03afb36797e6bea" },
				title: "Aapo's blog",
				author: "aabo",
				url: "www.kaapo.com",
				likes: 5,
				__v: 0,
			},
		];
		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual({
			author: "aabo",
			blogs: 1,
		});
	});
	test.only("many blogs returns the one with the most blogs and the coun", () => {
		const blogs = [
			{
				_id: "5a422a851b54a676234d17f7",
				title: "React patterns",
				author: "Michael Chan",
				url: "https://reactpatterns.com/",
				likes: 7,
				__v: 0,
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				__v: 0,
			},
			{
				_id: "5a422b891b54a676234d17fa",
				title: "First class tests",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
				likes: 10,
				__v: 0,
			},
			{
				_id: "5a422ba71b54a676234d17fb",
				title: "TDD harms architecture",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
				likes: 0,
				__v: 0,
			},
			{
				_id: "5a422bc61b54a676234d17fc",
				title: "Type wars",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
				likes: 2,
				__v: 0,
			},
		];
		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		});
	});
});
