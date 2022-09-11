import { Button, Modal as Md } from "antd";
import React, { useState } from "react";

const Modal = (props) => {
	const { okHandler, cancelHandler, children, isVisible, setIsVisible } = props;

	const okFunc = () => {
		setIsVisible(false);
		if (okHandler) {
			okHandler();
		}
	};

	const cancleFunc = () => {
		setIsVisible(false);
		if (cancelHandler) {
			cancelHandler();
		}
	};
	return (
		<Md
			title="Vertically centered modal dialog"
			centered
			visible={isVisible}
			onOk={okFunc}
			onCancel={cancleFunc}
		>
			{children}
		</Md>
	);
};

export default Modal;
