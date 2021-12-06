const totalLikes = (blogs) => {
	let total = 0;
	blogs.forEach((element) => {
		total += element.likes;
	});
	return total;
};

const favoriteBlog = (blogs) => {
	return blogs.length === 0
		? null
		: blogs.reduce((acc, curr) =>
				curr.likes > acc.likes ? (acc = curr) : acc
		  );
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	} else {
		const authors = blogs.map((e) => e.author);
		const mostStr = authors.sort(
			(a, b) =>
				authors.filter((v) => v === a).length -
				authors.filter((v) => v === b).length
		)[authors.length - 1];
		const count = authors.filter((e) => e === mostStr).length;
		return {
			author: mostStr,
			blogs: count,
		};
	}
};

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
