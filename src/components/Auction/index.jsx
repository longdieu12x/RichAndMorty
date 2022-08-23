import React, { useEffect, useState } from "react";
import baseImg from "../../assets/image/5.jpg";
import { Row, Col, Image, Space, Divider } from "antd";
import { useMoralisQuery } from "react-moralis";
import { makeQueryBuilder } from "../../utils/moralis";
import InputBid from "../common/InputBid";
import ButtonBid from "../common/ButtonBid";
import Helper from "../../utils/Helper";
import { ethers } from "ethers";
import { nftAddress, nftAbi } from "../../configs/contracts/nft";
import { auctionAddress, auctionAbi } from "../../configs/contracts/auction";
import RenderIf from "../../configs/RenderIf";
import { message } from "antd";
import CountdownClock from "../Countdown";
import axios from "axios";
import { getSigner } from "../../utils/signer";
import moment from "moment";

const Auction = () => {
	const [nftData, setNftData] = useState({});
	const [imgLoading, setImgLoading] = useState(false);
	const [entranceFee, setEntranceFee] = useState(0);
	const [noHistory, setNoHistory] = useState(false);

	const {
		data: openData,
		error: openError,
		isLoading: openLoading,
	} = useMoralisQuery(
		"AuctionOpened",
		(query) => query.descending("createdAt").limit(1),
		[],
		{
			live: true,
			onLiveUpdate: (entity, all) => {
				setNoHistory(false);
				return [entity, ...all];
			},
		}
	);
	const {
		data: closeData,
		error: closeError,
		isLoading: closeLoading,
	} = useMoralisQuery(
		"AuctionClosed",
		(query) => query.descending("createdAt").limit(1),
		[],
		{ live: true, onLiveUpdate: (entity, all) => [entity, ...all] }
	);
	const {
		data: bidData,
		error: bidError,
		isLoading: bidLoading,
	} = useMoralisQuery(
		"AuctionPlaceBid",
		(query) =>
			query
				.descending("createdAt")
				.equalTo("nftID", openData[0]?.attributes?.nftID)
				.limit(3),
		[openData],
		{
			live: true,
			onLiveUpdate: (entity, all) => [entity, ...all].splice(0, 3),
		}
	);

	async function getNFTData(id) {
		const nftId = id;
		const signer = await getSigner();
		const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
		const auctionContract = new ethers.Contract(
			auctionAddress,
			auctionAbi,
			signer
		);
		const nftUri = await nftContract.tokenURI(nftId);
		const nftHttp = Helper.getImgHttp(nftUri);
		const fee = await auctionContract.entranceFee();
		setEntranceFee(ethers.utils.formatEther(fee));
		console.log("Http", nftHttp);
		const data = await axios.get(nftHttp);
		if (data.status == 200 || data.status == 201) {
			setNftData(data?.data);
			message.success("Get nft image successfully!");
		}
	}
	useEffect(() => {
		(async () => {
			setImgLoading(true);
			try {
				if (openData.length > 0) {
					const nftId = openData[0]?.attributes.nftID;
					await getNFTData(nftId);
				}
			} catch (e) {
				// that means it is burned
				message.error("Get nft image failed!");
				const nearNftData = await makeQueryBuilder("AuctionClosed")
					.descending("createdAt")
					.greaterThan("finalPrice", "0")
					.limit(1)
					.find();
				if (nearNftData.length == 0) {
					setNoHistory(true);
				} else {
					await getNFTData(nearNftData[0]?.attributes?.nftID);
				}
			} finally {
				setImgLoading(false);
			}
		})();
	}, [openData]);

	useEffect(() => {
		if (closeData.length > 0 && openData.length > 0) {
			const cNftId = closeData[0].attributes.nftID;
			const finalPrice = closeData[0].attributes.finalPrice;
			const oNftId = openData[0].attributes.nftID;
			if (cNftId == oNftId && finalPrice == 0) {
				// that means it is burned
				setNftData({ ...nftData, image: baseImg });
				message.info(
					"This nft is burned because of the none of existence bidder!"
				);
			}
		}
	}, [closeData]);

	return (
		<>
			<RenderIf
				isTrue={openLoading == false && openData.length > 0 && !noHistory}
			>
				<Row justify="space-between" className="p-5">
					<Col span={11}>
						{!imgLoading && (
							<Image
								src={nftData?.image}
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
								{openLoading && openData.length != 0
									? Helper.optionsDateJs(
											openData[0]?.attributes?.endTime || 0,
											{ month: "long", day: "numeric", year: "numeric" },
											"UTC"
									  )
									: Helper.optionsDateJs(
											moment().toDate().getTime(),
											{ month: "long", day: "numeric", year: "numeric" },
											"UTC"
									  )}
							</p>
							<h2 className="text-3xl text-white font-bold">{nftData.name}</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{bidData.length == 0 ? 0 : bidData[0].attributes.bidPrice}{" "}
										MDT
									</p>
									<p className="text-base font-medium text-[#999]">
										Current Bid
									</p>
								</div>
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{entranceFee} ETH
									</p>
									<p className="text-base font-medium text-[#999] whitespace-nowrap underline underline-offset-8">
										Entrance Fee
									</p>
								</div>
							</div>
							<div>
								{/* <p className="text-[24px] text-white font-bold">12:00:00</p> */}
								<RenderIf isTrue={!openLoading && openData.length != 0}>
									<CountdownClock
										expiredTime={parseInt(
											`${openData[0]?.attributes?.endTime || 0}000`
										)}
										messageWarning="Expired time, you can't bid at this time!"
										className="text-[24px] text-white font-bold"
									/>
								</RenderIf>
								<RenderIf isTrue={!openLoading && openData.length == 0}>
									<p className="text-[24px] text-white font-bold">00:00:00</p>
								</RenderIf>
								<p className="text-base font-medium text-[#999] whitespace-nowrap">
									Day remaining
								</p>
							</div>
							<div className="flex justify-between wrap">
								<InputBid />
								<ButtonBid text={"Place Bid"} />
							</div>
							<Divider />
							<Space direction="vertical" size={12} className="w-full">
								<h3 className="text-white text-[24px] font-bold">
									History Bid:
								</h3>
								{[...bidData].map((item, idx) => (
									<div className="flex justify-between w-full" key={idx}>
										<span className="text-base font-medium text-[#999]">
											{Helper.shortTextAdress(item.attributes.bidder)}
										</span>
										<span className="text-[#72ec9c] text-base font-medium">
											{item.attributes.bidPrice} MDT
										</span>
									</div>
								))}
							</Space>
						</Space>
					</Col>
				</Row>
			</RenderIf>
			<RenderIf
				isTrue={(openLoading == false && openData.length == 0) || noHistory}
			>
				<h2 className="text-3xl text-white font-bold">
					There are no auction opened at this time!
				</h2>
			</RenderIf>
		</>
	);
};

export default Auction;
