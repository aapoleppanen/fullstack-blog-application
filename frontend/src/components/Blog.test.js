import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

test("Only basic details of blog are rendered at first", () => {
	const blog = {
		title: "Test",
		author: "TestAuthor",
		url: "www.testurl.com",
		likes: "0",
	};

	const component = render(<Blog blog={blog}></Blog>);

	const wrapper = component.container.querySelector(".blogDiv");
	expect(wrapper).toHaveTextContent("Test");
	expect(wrapper).toHaveTextContent("TestAuthor");

	const details = component.container.querySelector(".blogDetails");
	expect(details).toHaveStyle("display: none;");
});

test("Details are shown once button is clikced", () => {
	const blog = {
		title: "Test",
		author: "TestAuthor",
		url: "www.testurl.com",
		likes: "0",
	};

	const handleLike = jest.fn();

	const component = render(<Blog blog={blog} handleLike={handleLike}></Blog>);

	const button = component.getByText("view");
	const details = component.container.querySelector(".blogDetails");

	fireEvent.click(button);

	expect(details).not.toHaveStyle("display: none;");
});

test("HandleLike calls are reqistered", () => {
	const blog = {
		title: "Test",
		author: "TestAuthor",
		url: "www.testurl.com",
		likes: "0",
	};

	const handleLike = jest.fn();

	const component = render(<Blog blog={blog} handleLike={handleLike}></Blog>);

	const button = component.getByText("view");

	fireEvent.click(button);

	const likeBtn = component.container.querySelector(".likeBtn");

	fireEvent.click(likeBtn);
	fireEvent.click(likeBtn);

	expect(handleLike.mock.calls).toHaveLength(2);
});
