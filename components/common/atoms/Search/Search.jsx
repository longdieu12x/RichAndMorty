import { Input } from "antd";
import React from "react";

const Search = (props) => {
	const { changeHandler } = props;
	return <Input.Search {...props} onChange={changeHandler} />;
};

export default Search;
