import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
	updateBlog,
	deleteBlog,
	comment as commentAction,
} from "../reducers/blogReducer";
import { notification } from "../reducers/notificationReducer";
import useField from "../hooks";

const BlogView = () => {
	const dispatch = useDispatch();
	const id = useParams().id;
	const blogs = useSelector((state) => state.blogs);
	const blog = blogs.find((e) => e.id === id);

	const user = useSelector((state) => state.user);
	const comment = useField("text");
	const commentProps = { ...comment };
	delete commentProps.resetValue;

	const handleLike = async (post) => {
		const updatedPost = {
			...post,
			likes: post.likes + 1,
			user: user.id,
		};
		try {
			dispatch(updateBlog(updatedPost));
			dispatch(notification(`${post.title} was just liked!`, 5));
		} catch (error) {
			dispatch(notification(`${error}`, 5));
		}
	};

	const handleDelete = async (post) => {
		if (
			post.user.id ===
				JSON.parse(window.localStorage.getItem("blogAppLoggedUser")).id ||
			post.user ===
				JSON.parse(window.localStorage.getItem("blogAppLoggedUser")).id
		) {
			const confirm = window.confirm(`${post.title} will be deleted!`);
			if (confirm) {
				try {
					dispatch(deleteBlog(post));
				} catch (error) {
					dispatch(notification(`${error}`, 5));
				}
			}
		} else {
			dispatch(notification("cannot delete other users posts!", 5));
			return;
		}
	};

	const tempId = () => Math.floor(Math.random() * 1000);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const commentObject = {
			content: comment.value,
		};
		try {
			dispatch(commentAction(blog, commentObject, tempId));
			dispatch(notification(`${""} comment added`, 5));
		} catch (error) {
			dispatch(notification(`${error}`, 5));
		}
		comment.resetValue(event);
	};

	if (!blog) {
		return (
			<div>
				blog not found. <Link to="/">Click to go to all</Link>
			</div>
		);
	}

	return (
		<div className="blogview-wrapper">
			<div className="blogview">
				<h2>{blog.title}</h2>
				<p>by {blog.author}</p>
				<p>has {blog.likes} votes</p>
				<button onClick={() => handleLike(blog)}>vote</button>
				<p>{blog.url}</p>
				<p>added by {blog.user.username}</p>
				<button onClick={() => handleDelete(blog)}>delete</button>
			</div>
			<div className="blogcomments">
				<h2>Comments</h2>
				<form onSubmit={handleSubmit}>
					<textarea {...commentProps} />
					<button type="submit">Submit</button>
				</form>
				<div>
					<ul>
						{blog.comments.map((e) => (
							<li key={e.id}>{e.content}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BlogView;
