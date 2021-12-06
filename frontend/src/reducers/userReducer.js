// import { useDispatch, useSelector } from "react-redux";
// import loginService from "../services/login";

const userReducer = (state = null, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.user;
		default:
			return state;
	}
};

export const setUser = (user) => {
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			user,
		});
	};
};

// useEffect(() => {
//     const userJson = window.localStorage.getItem("blogAppLoggedUser");
//     if (userJson) {
//         const user = JSON.parse(userJson);
//         setUser(user);
//         blogService.setToken(user.token);
//     }
// }, []);

export default userReducer;
