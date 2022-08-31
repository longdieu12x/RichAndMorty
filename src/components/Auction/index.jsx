import React, { useEffect, useState } from "react";
import baseImg from "../../assets/image/5.jpg";
import { Row, Col, Image, Space, Divider } from "antd";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { makeQueryBuilder } from "../../utils/moralis";
import InputBid from "../common/InputBid";
import ButtonBid from "../common/ButtonBid";
import Helper from "../../utils/Helper";
import { ethers } from "ethers";
import { nftAddress, nftAbi } from "../../configs/contracts/nft";
import { auctionAddress, auctionAbi } from "../../configs/contracts/auction";
import { tokenAddress, tokenAbi } from "../../configs/contracts/token";
import RenderIf from "../../configs/RenderIf";
import { getProvider } from "../../utils/signer";
import { message } from "antd";
import CountdownClock from "../Countdown";
import axios from "axios";
import moment from "moment";

const Auction = () => {

	return (
		<>
			<RenderIf
				isTrue={true}
			>
				<Row justify="space-between" className="p-5">
					<Col span={11}>
						{true && (
							<Image
								src={baseImg}
								fallback={baseImg}
								className="object-contain"
								preview={false}
							/>
						)}
					</Col>
					<Col span={11} className="px-[8px] text-left">
						<Space size={12} direction="vertical" className="w-full">
							<p className="text-base font-medium text-white">
								<span className="text-[#999]">Ends on</span>{" "}
								{moment().format("LL")}
							</p>
							<h2 className="text-3xl text-white font-bold">{"Multi Deactive Token"}</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{Helper.numberToCurrencyStyle(
											ethers.utils.formatEther(12000)
										)}{" "}
										MDT
									</p>
									<p className="text-base font-medium text-[#999]">
										Current Bid
									</p>
								</div>
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{Helper.numberToCurrencyStyle(0.000005)} ETH
									</p>
									<p className="text-base font-medium text-[#999] whitespace-nowrap underline underline-offset-8">
										Entrance Fee
									</p>
								</div>
							</div>
							<div>
								{/* <p className="text-[24px] text-white font-bold">12:00:00</p> */}
								<RenderIf isTrue={true}>
									<p className="text-[24px] text-white font-bold">
										20:00:00
									</p>
								</RenderIf>
								<RenderIf isTrue={false}>
									<p className="text-[24px] text-white font-bold">00:00:00</p>
								</RenderIf>
								<p className="text-base font-medium text-[#999] whitespace-nowrap">
									Day remaining
								</p>
							</div>
							<div className="flex justify-between wrap">
								<InputBid
								/>
								<ButtonBid
									text={"Place Bid"}
								/>
							</div>
							<Divider />
							<Space direction="vertical" size={12} className="w-full">
								<h3 className="text-white text-[24px] font-bold">
									History Bid:
								</h3>
								{[1,2,3].map((item, idx) => (
									<div className="flex justify-between w-full" key={idx}>
										<span className="text-base font-medium text-[#999]">
											0x12345...223
										</span>
										<span className="text-[#72ec9c] text-base font-medium">
											50000 MDT
										</span>
									</div>
								))}
							</Space>
						</Space>
					</Col>
				</Row>
			</RenderIf>
			<RenderIf
				isTrue={false}
			>
				<h2 className="text-3xl text-white font-bold">
					There are no auction opened at this time!
				</h2>
			</RenderIf>
		</>
	);
};

export default Auction;
