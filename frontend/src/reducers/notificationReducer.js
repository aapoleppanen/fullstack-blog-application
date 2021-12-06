const reducer = (state = "", action) => {
	switch (action.type) {
		case "NOTIF":
			return action.data;
		case "CLEAR_NOTIF":
			return "";
		default:
			return state;
	}
};

const createNotification = (data) => {
	return {
		type: "NOTIF",
		data,
	};
};

const clearNotification = () => {
	return {
		type: "CLEAR_NOTIF",
	};
};

let timeoutId;

export const notification = (data, time) => {
	return async (dispatch) => {
		clearTimeout(timeoutId);
		dispatch(createNotification(data));
		timeoutId = setTimeout(() => {
			dispatch(clearNotification());
		}, time * 1000);
	};
};

export default reducer;
