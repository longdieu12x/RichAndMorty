import React from "react";
import Link from "next/link";
const Navbar = () => {
	return (
		<div className="flex w-full justify-around p-[12px]">
			<Link href="/" scroll={true} shallow={true}>
				Characters
			</Link>
			<Link href="/locations" scroll={true} shallow={true}>
				Locations
			</Link>
			<Link href="/episodes" scroll={true} shallow={true}>
				Episodes
			</Link>
		</div>
	);
};

export default Navbar;
