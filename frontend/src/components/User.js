import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import usersService from "../services/users";

const User = () => {
	const id = useParams().id;
	const [user, setUser] = useState("");

	useEffect(() => {
		usersService.getAll().then((users) => {
			setUser(users.find((e) => e.id === id));
		});
	}, []);

	if (!user) {
		return null;
	}

	return (
		<div className="userdetail">
			<h2>{user.username}</h2>
			<div>
				<h3>added blogs</h3>
				<ul>
					{user.posts.map((post) => (
						<li key={post.title}>{post.title}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default User;
