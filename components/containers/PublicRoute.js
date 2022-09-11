import React from "react";
import Navbar from "../common/organisms/Navbar";
const PublicRoute = ({ children }) => {
	return (
		<div id="public-route">
			<Navbar />
			{children}
		</div>
	);
};

export default PublicRoute;
