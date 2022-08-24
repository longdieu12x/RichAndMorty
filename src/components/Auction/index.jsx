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
	const [nftData, setNftData] = useState({});
	const [imgLoading, setImgLoading] = useState(false);
	const [entranceFee, setEntranceFee] = useState(0);
	const [noHistory, setNoHistory] = useState(false);
	const [bidValue, setBidValue] = useState();
	const [currentBid, setCurrentBid] = useState(0);
	const [expired, setExpired] = useState(false);
	const [isBidding, setIsBidding] = useState(false);
	const [provider, setProvider] = useState({
		data: null,
		isSigner: false,
	});

	const { enableWeb3, isAuthenticated, authenticate } = useMoralis();
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
				console.log("Update entity", entity.attributes.nftID);
				if (noHistory) {
					setNoHistory(false);
				}
				if (expired) {
					setExpired(false);
				}
				return [entity, ...all];
			},
			onLiveEnter: (entity, all) => {
				console.log("Enter entity", entity.attributes.nftID);
				if (noHistory) {
					setNoHistory(false);
				}
				if (expired) {
					setExpired(false);
				}
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
		{
			live: true,
			onLiveUpdate: (entity, all) => {
				console.log("Update entity", entity.attributes.nftID);

				return [entity, ...all];
			},
			onLiveEnter: (entity, all) => {
				console.log("Enter entity", entity.attributes.nftID);

				return [entity, ...all];
			},
		}
	);
	const {
		data: bidData,
		error: bidError,
		isLoading: bidLoading,
	} = useMoralisQuery(
		"AuctionPlaceBid",
		(query) =>
			query
				.descending("bidPrice")
				.descending("createdAt")
				.equalTo("nftID", openData[0]?.attributes?.nftID)
				.limit(3),
		[openData],
		{
			live: true,
			onLiveUpdate: (entity, all) => {
				console.log("UPDATE BID", entity.attributes.bidPrice);
				let hasItem = false;
				all.forEach((item) => {
					if (item.attributes.bidPrice == entity.attributes.bidPrice) {
						hasItem = true;
					}
				});
				return hasItem ? [...all].splice(0, 3) : [entity, ...all].splice(0, 3);
			},
			onLiveEnter: (entity, all) => {
				console.log("ENTER BID");
				let hasItem = false;
				all.forEach((item) => {
					if (item.attributes.bidPrice == entity.attributes.bidPrice) {
						hasItem = true;
					}
				});
				return hasItem ? [...all].splice(0, 3) : [entity, ...all].splice(0, 3);
			},
		}
	);
	async function getNFTData(id) {
		const nftId = id;
		const signer = provider.data;
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

	async function handleBid() {
		try {
			setIsBidding(true);
			if (!bidValue) {
				message.error("Please input bid's value!");
				return;
			}
			if (expired) {
				message.error("It is not time to bid!");
				return;
			}
			if (parseInt(bidValue) < parseInt(ethers.utils.formatEther(currentBid))) {
				message.error(
					"You have to bid value that is greater than current bid!"
				);
				return;
			}
			const signer = provider.data;
			if (provider.isSigner == false) {
				await authenticate();
			}

			const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
			const approveTx = await tokenContract.approve(
				auctionAddress,
				ethers.utils.parseEther(bidValue.toString())
			);
			await approveTx.wait();
			const auctionContract = new ethers.Contract(
				auctionAddress,
				auctionAbi,
				signer
			);
			const fee = await auctionContract.entranceFee();
			const tx = await auctionContract.placeBid(
				ethers.utils.parseEther(bidValue.toString()),
				{
					value: fee,
				}
			);
			await tx.wait();
			setBidValue();
		} catch (e) {
			console.log(e);
		} finally {
			setIsBidding(false);
		}
	}

	useEffect(() => {
		(async () => {
			if (isAuthenticated) {
				const web3Provider = await enableWeb3();
				const signer = web3Provider.getSigner();
				setProvider({ ...provider, data: signer, isSigner: true });
			} else {
				setProvider({ ...provider, data: getProvider(), isSigner: false });
			}
		})();
	}, [isAuthenticated]);

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
				if (
					openData.length > 0 &&
					openData[0].attributes.nftID == closeData[0].attributes.nftID
				) {
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
				} else {
					console.log("Here");
					message.info(
						"NFT metadata is not available, please back in minutes!"
					);
					setNftData({
						...nftData,
						image: baseImg,
						name: "Minh Dang Token",
					});
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

	useEffect(() => {
		if (bidData.length > 0) {
			setCurrentBid(bidData[0].attributes.bidPrice);
		}
	}, [bidData]);

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
								{!openLoading && openData.length != 0
									? moment(
											parseInt(`${openData[0]?.attributes?.endTime}000` || 0)
									  ).format("LL")
									: moment().format("LL")}
							</p>
							<h2 className="text-3xl text-white font-bold">{nftData.name}</h2>
							<div className="flex justify-between items-center">
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{Helper.numberToCurrencyStyle(
											ethers.utils.formatEther(currentBid)
										)}{" "}
										MDT
									</p>
									<p className="text-base font-medium text-[#999]">
										Current Bid
									</p>
								</div>
								<div>
									<p className="text-[24px] text-[#72ec9c] font-bold">
										{Helper.numberToCurrencyStyle(entranceFee)} ETH
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
										func={() => {
											setExpired(true);
										}}
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
								<InputBid
									inputHandler={(e) => setBidValue(e.target.value)}
									value={bidValue}
								/>
								<ButtonBid
									text={"Place Bid"}
									clickHandler={handleBid}
									loading={isBidding}
								/>
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
											{ethers.utils.formatEther(item.attributes.bidPrice)} MDT
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
