// import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT_BLOGS":
			return action.data;
		case "ADD_BLOG":
			return state.concat(action.data);
		case "DELETE_BLOG":
			return state.filter((e) => e.id !== action.data.id);
		case "UPDATE_BLOG": {
			const updatedState = [...state];
			const index = state.findIndex((e) => e.id === action.data.id);
			updatedState[index] = action.data;
			return updatedState;
		}
		case "COMMENT_BLOG": {
			const updatedState = [...state];
			const index = state.findIndex((e) => e.id === action.data.post.id);
			updatedState[index].comments = updatedState[index].comments.concat(
				action.data.comment
			);
			return updatedState;
		}
		default:
			return state;
	}
};

export const initBlogs = () => {
	return async (dispatch) => {
		const sortBlogs = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);
		const blogs = await blogService.getAll();
		dispatch({
			type: "INIT_BLOGS",
			data: sortBlogs(blogs),
		});
	};
};

export const addBlog = (object) => {
	return async (dispatch) => {
		const data = await blogService.postBlog(object);
		dispatch({
			type: "ADD_BLOG",
			data,
		});
	};
};

export const deleteBlog = (object) => {
	return async (dispatch) => {
		await blogService.deleteBlog(object);
		dispatch({
			type: "DELETE_BLOG",
			data: object,
		});
	};
};

export const updateBlog = (object) => {
	return async (dispatch) => {
		const data = await blogService.updateBlog(object);
		dispatch({
			type: "UPDATE_BLOG",
			data,
		});
	};
};

export const comment = (post, comment, tempId) => {
	return async (dispatch) => {
		const data = await blogService.postComment(post, comment);
		dispatch({
			type: "COMMENT_BLOG",
			data: {
				post: data,
				comment: { ...comment, id: tempId() },
			},
		});
	};
};

export default blogReducer;
