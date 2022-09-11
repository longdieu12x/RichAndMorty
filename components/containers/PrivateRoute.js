import React from "react";
import Navbar from "../common/organisms/Navbar";
const PrivateRoute = ({ children }) => {
	return (
		<div id="private-route">
			<Navbar />
			{children}
		</div>
	);
};

export default PrivateRoute;
