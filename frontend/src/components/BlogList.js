import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import Blog from "./Blog";
import Togglable from "./Togglable";
import PostForm from "./PostForm";
import { notification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";

const BlogList = () => {
	const dispatch = useDispatch();
	const sortBlogs = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);
	const blogs = useSelector((state) => sortBlogs(state.blogs));

	const handlePost = async (postObject) => {
		console.log(postObject);
		try {
			dispatch(addBlog(postObject));
			dispatch(
				notification(`a new blog ${postObject.title} was just added`, 5)
			);
			postFormRef.current.toggleVisibility();
		} catch (error) {
			dispatch(notification(`${error}`, 5));
		}
	};

	const postFormRef = useRef();

	return (
		<div className="bloglist-wrapper">
			<Togglable buttonLabel="add Blog" ref={postFormRef}>
				<PostForm postPost={handlePost}></PostForm>
			</Togglable>
			<div className="bloglist">
				{blogs.map((blog) => (
					<div key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>
							<Blog key={blog.id} blog={blog}></Blog>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogList;
