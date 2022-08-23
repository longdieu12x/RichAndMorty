import React from "react";
import { Input } from "antd";
import "./index.scss";

const InputBid = ({ placeholder, inputHandler, width, height }) => {
	return (
		<div
			id="input-bidder"
			className={`${width ? `w-[${width}]` : "w-[75%]"} ${
				height ? `h-[${height}]` : "h-[40px]"
			}`}
		>
			<Input placeholder={placeholder} onChange={inputHandler} />
		</div>
	);
};

export default InputBid;
