import { useState } from "react";

const useField = (type) => {
	const [value, setvalue] = useState("");
	const onChange = (event) => {
		setvalue(event.target.value);
	};
	const resetValue = (event) => {
		event.target.value = "";
		setvalue("");
	};
	return { type, value, onChange, resetValue };
};

export default useField;
