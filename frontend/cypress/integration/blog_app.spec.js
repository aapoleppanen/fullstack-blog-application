describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Test User",
			username: "TestUser",
			password: "password",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3003");
	});

	it("Login form is shown", function () {
		cy.get("[name=Username]").type("TestUser");
		cy.get("[name=Password]").type("password");
		cy.contains("login");
	});

	describe("login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("[name=Username]").type("TestUser");
			cy.get("[name=Password]").type("password");
			cy.get("button").click();
			cy.contains("Test User is logged in");
		});
		it("fails with incorrect credentials", function () {
			cy.get("[name=Username]").type("TestUser");
			cy.get("[name=Password]").type("wrong");
			cy.get("button").click();
			cy.get(".error")
				.contains("Wrong Credentials")
				.and("have.css", "border-color", "rgb(255, 0, 0)");
		});
	});

	// describe("when logged in", function () {
	// 	beforeEach(function () {
	// 		cy.login({ username: "TestUser", password: "password" });
	// 	});
	// 	it("A blog can be created", function () {
	// 		cy.contains("add Blog").click();
	// 		cy.get("#titleInput").type("Test Blog");
	// 		cy.get("#authorInput").type("Test Author");
	// 		cy.get("#urlInput").type("Test Url");
	// 		cy.get("#addBlogBtn").click();
	// 		cy.contains("Test Blog");
	// 	});
	// 	it("A blog can be liked", function () {
	// 		cy.createBlog({
	// 			title: "First Blog",
	// 			author: "First Author",
	// 			url: "First Url",
	// 		});
	// 		// cy.contains("First Blog").contains("view").click();
	// 		cy.contains("First Blog").contains("Like").click();
	// 		cy.contains("Likes 1");
	// 	});
	// 	it("A blog can be deleted", function () {
	// 		cy.createBlog({
	// 			title: "First Blog",
	// 			author: "First Author",
	// 			url: "First Url",
	// 		});
	// 		// cy.contains("First Blog").contains("view").click();
	// 		cy.contains("First Blog").contains("Delete").click();
	// 		cy.on("window:confirm", () => true);
	// 		cy.contains("First Blog").should("not.exist");
	// 	});
	// });
	describe.only("Multiple blogs can be created", function () {
		beforeEach(function () {
			cy.login({ username: "TestUser", password: "password" });
			cy.createBlog({
				title: "First Blog",
				author: "First Author",
				url: "First Url",
			});
			cy.createBlog({
				title: "Second Blog",
				author: "Second Author",
				url: "Second Url",
			});
			cy.createBlog({
				title: "Third Blog",
				author: "Third Author",
				url: "Third Url",
			});
		});
		// it("A specific blog can be liked", function () {
		// 	// cy.contains("Second Blog").contains("view").click();
		// 	cy.contains("Second Blog").contains("Like").click();
		// 	cy.contains("Second Blog").contains("Likes 1");
		// });
		// it("Blogs are sorted by likes", function () {
		// 	//like second post two times
		// 	// cy.contains("Second Blog").contains("view").click();
		// 	cy.contains("Second Blog").contains("Like").click();
		// 	cy.contains("Second Blog").contains("Like").click();
		// 	cy.contains("Second Blog").contains("Like").click();
		// 	cy.contains("Second Blog").contains("Like").click();

		// 	//like third post once
		// 	// cy.contains("Third Blog").contains("view").click();
		// 	cy.contains("Third Blog").contains("Like").click();
		// 	cy.contains("Third Blog").contains("Like").click();

		// 	cy.contains("Third Blog").contains("Likes 2");
		// 	//find all posts and likes
		// 	cy.get(".blogLikes").then(($els) => {
		// 		const blogs = [...$els].map((e) => e.innerText);
		// 		expect(blogs).to.deep.equal([...blogs].sort((a, b) => b - a));
		// 	});
		// });
	});
});
