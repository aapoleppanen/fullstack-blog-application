import React from "react";

const Blog = ({ blog }) => {
	return (
		<div className="blogDiv">
			{blog.title} by {blog.author}
			<br />
		</div>
	);
};

export default Blog;
