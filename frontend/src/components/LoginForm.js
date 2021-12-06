import React from "react";
import { notification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import useField from "../hooks";
import { Redirect } from "react-router";

const loginForm = () => {
	const dispatch = useDispatch();

	const username = useField("text");
	const password = useField("password");

	const usernameProps = { ...username };
	const passwordProps = { ...password };
	delete usernameProps.resetValue;
	delete passwordProps.resetValue;

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value,
			});
			window.localStorage.setItem("blogAppLoggedUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
			<Redirect to="/"></Redirect>;
		} catch (error) {
			password.resetValue(event);
			dispatch(notification("Wrong Credentials", 5));
		}
	};
	return (
		<div>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input {...usernameProps} />
				</div>
				<div>
					password
					<input {...passwordProps} />
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default loginForm;
