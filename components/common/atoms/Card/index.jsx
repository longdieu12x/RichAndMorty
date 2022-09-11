import React from "react";
import { Card as CardAntd } from "antd";
const Card = (props) => {
	const { children, ...configs } = props;
	return <CardAntd {...configs}>{children}</CardAntd>;
};

export default Card;
