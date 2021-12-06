import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const postBlog = async (newPost) => {
	const config = {
		headers: { Authorization: token },
	};
	const savedPost = await axios.post(baseUrl, newPost, config);
	console.log(savedPost);
	console.log("posted");
	return savedPost.data;
};

const postComment = async (post, comment) => {
	const config = {
		headers: { Authorization: token },
	};
	const postUrl = baseUrl + "/" + post.id + "/comments";
	const savedPost = await axios.post(postUrl, comment, config);
	console.log("posted");
	return savedPost.data;
};

const updateBlog = async (updatedPost) => {
	const config = {
		headers: { Authorization: token },
	};
	const postUrl = baseUrl + "/" + updatedPost.id;
	const savedPost = await axios.put(postUrl, updatedPost, config);
	return savedPost.data;
};

const deleteBlog = async (post) => {
	const postUrl = baseUrl + "/" + post.id;
	const deletedPost = await axios.delete(postUrl, {
		headers: {
			Authorization: token,
		},
	});
	return deletedPost;
};

export default {
	getAll,
	setToken,
	postBlog,
	updateBlog,
	deleteBlog,
	postComment,
};
