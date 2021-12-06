import React, { useEffect, useState } from "react";
import usersService from "../services/users";
import { Link } from "react-router-dom";

const UserList = () => {
	const [users, setusers] = useState([]);

	useEffect(() => {
		usersService.getAll().then((users) => {
			setusers(users);
		});
	}, []);

	return (
		<div className="userlist-wrapper">
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Blogs created</th>
					</tr>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>{user.username}</Link>
							</td>
							<td>{user.posts.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
