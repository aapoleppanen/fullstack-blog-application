import React, { useState } from "react";

const PostForm = ({ postPost }) => {
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [url, setUrl] = useState([]);

	const handlePost = (event) => {
		event.preventDefault();
		const postObject = {
			title,
			author,
			url,
		};
		setTitle("");
		setAuthor("");
		setUrl("");
		postPost(postObject);
	};

	return (
		<form onSubmit={handlePost}>
			<div>
				Title
				<input
					type="text"
					value={title}
					name="title"
					id="titleInput"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				Author
				<input
					type="text"
					value={author}
					name="author"
					id="authorInput"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				Url
				<input
					type="text"
					value={url}
					name="url"
					id="urlInput"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit" id="addBlogBtn">
				add Blog
			</button>
		</form>
	);
};

export default PostForm;
