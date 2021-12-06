import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { setUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import UserList from "./views/UserList";
import LoginForm from "./components/LoginForm";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { initBlogs } from "./reducers/blogReducer";
import { GlobalStyle, NavBar } from "./styles/index.style";

const App = () => {
	const dispatch = useDispatch();
	const notifMessage = useSelector((state) => state.notif);
	const user = useSelector((state) => state.user);
	const [loading, setloading] = useState(true);

	useEffect(() => {
		const userJson = window.localStorage.getItem("blogAppLoggedUser");
		if (userJson) {
			const user = JSON.parse(userJson);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
		setloading(false);
	}, []);

	useEffect(() => {
		dispatch(initBlogs());
	}, []);

	const handleLogout = () => {
		console.log("logged out");
		window.localStorage.clear();
		blogService.setToken(null);
		dispatch(setUser(null));
	};

	if (loading) {
		return <div>loading</div>;
	}

	return (
		<div>
			<GlobalStyle />
			<Notification message={notifMessage} cName={"notif"} />
			<NavBar>
				<Link to="/" className="nav-link">
					BLOGS
				</Link>
				<Link to="/users" className="nav-link">
					USERS
				</Link>
				{user ? (
					<p className="nav-user">
						{user.username} is logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</p>
				) : (
					""
				)}
			</NavBar>
			<div className="view-wrapper">
				<Switch>
					<Route path="/users/:id">
						{user ? <User></User> : <Redirect to="/login" />}
					</Route>
					<Route path="/blogs/:id">
						{user ? <BlogView></BlogView> : <Redirect to="/login" />}
					</Route>
					<Route path="/users">
						{user ? <UserList></UserList> : <Redirect to="/login" />}
					</Route>
					<Route path="/login">
						{user ? <Redirect to="/" /> : <LoginForm></LoginForm>}
					</Route>
					<Route path="/">
						{user ? <BlogList></BlogList> : <Redirect to="/login" />}
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default App;
