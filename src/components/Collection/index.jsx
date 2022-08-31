import React, { useState, useEffect } from "react";
import baseImg from "../../assets/image/5.jpg";
import { Divider, Image } from "antd";
import { ethers } from "ethers";
import { nftAddress, nftAbi } from "../../configs/contracts/nft";
import { useMoralis, useMoralisQuery } from "react-moralis";
import Helper from "../../utils/Helper";
import axios from "axios";
const Collection = () => {
	return (
		<div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px]">
			{[1,2,3,4,5,6,7,8,9].map((item, idx) => (
				<div
					className="text-left border-white border-solid border-[1px] p-[24px]"
					key={idx}
				>
					<Image src={item?.image} preview={false} />
					<h3 className="text-[24px] text-white font-bold mt-[16px]">
						{`Multi Deactive Token ${item}`}
					</h3>
					{/* <p className="text-base text-[#72ec9c] font-medium">{ethers.utils.formatEther(item?)} MDT</p> */}
				</div>
			))}
		</div>
	);
};

export default Collection;
