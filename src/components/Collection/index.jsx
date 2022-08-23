import React from "react";
import baseImg from "../../assets/image/5.jpg";
import { Divider, Image } from "antd";

const Collection = () => {
	return (
		<div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px]">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
				<div
					className="text-left border-white border-solid border-[1px] p-[24px]"
					key={item}
				>
					<Image src={baseImg} preview={false} />
					<h3 className="text-[24px] text-white font-bold mt-[16px]">
						Minh Dang Token {item}
					</h3>
					<p className="text-base text-[#72ec9c] font-medium">1.000.000 MDT</p>
				</div>
			))}
		</div>
	);
};

export default Collection;
