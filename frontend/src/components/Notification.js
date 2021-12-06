import React from "react";

const Notification = ({ message, cName }) => {
	if (message === null) {
		return null;
	}

	return <div className={cName}>{message}</div>;
};

export default Notification;
