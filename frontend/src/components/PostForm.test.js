import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostForm from "./PostForm";

test("Submit call gets the right details", () => {
	const submitFn = jest.fn();
	const form = render(<PostForm postPost={submitFn}></PostForm>);

	const titleInput = form.container.querySelector("[name=title]");
	const authorInput = form.container.querySelector("[name=author]");
	const urlInput = form.container.querySelector("[name=url]");

	fireEvent.change(titleInput, {
		target: { value: "Test" },
	});
	fireEvent.change(authorInput, {
		target: { value: "TestAuthor" },
	});
	fireEvent.change(urlInput, {
		target: { value: "www.testurl.com" },
	});

	const submitBtn = form.getByText("add Blog");

	fireEvent.click(submitBtn);

	expect(submitFn.mock.calls[0][0]).toStrictEqual({
		title: "Test",
		author: "TestAuthor",
		url: "www.testurl.com",
	});
});

/*
title: "Test",
author: "TestAuthor",
url: "www.testurl.com",
likes: "0",
*/
