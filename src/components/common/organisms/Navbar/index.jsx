import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<div className="flex w-full justify-around p-[12px]">
			<Link to="/">Characters</Link>
			<Link to="/locations">Locations</Link>
			<Link to="/episodes">Episodes</Link>
		</div>
	);
};

export default Navbar;
