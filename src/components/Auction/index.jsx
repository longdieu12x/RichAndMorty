import React from "react";
import baseImg from "../../assets/image/5.jpg";
import { Row, Col, Image, Space, Divider } from "antd";
import InputBid from "../common/InputBid";
import ButtonBid from "../common/ButtonBid";
import Helper from "../../utils/Helper";
const Auction = () => {
	return (
		<Row justify="space-between" className="p-5">
			<Col span={11}>
				<Image
					src={baseImg}
					fallback={baseImg}
					className="object-contain"
					preview={false}
				/>
			</Col>
			<Col span={11} className="px-[8px] text-left">
				<Space size={12} direction="vertical" className="w-full">
					<p className="text-base font-medium">
						<span className="text-[#999]">Ends on</span> March 3rd, 2005
					</p>
					<h2 className="text-3xl text-white font-bold">Minh Dang Token</h2>
					<div className="flex justify-between items-center">
						<div>
							<p className="text-[24px] text-[#72ec9c] font-bold">
								1.000.000 MDT
							</p>
							<p className="text-base font-medium text-[#999]">Current Bid</p>
						</div>
						<div>
							<p className="text-[24px] text-[#72ec9c] font-bold">
								0.000005 ETH
							</p>
							<p className="text-base font-medium text-[#999] whitespace-nowrap underline underline-offset-8">
								Entrance Fee
							</p>
						</div>
					</div>
					<div>
						<p className="text-[24px] text-white font-bold">12:00:00</p>
						<p className="text-base font-medium text-[#999] whitespace-nowrap">
							Day remaining
						</p>
					</div>
					<div className="flex justify-between wrap">
						<InputBid />
						<ButtonBid text={"Bid"} />
					</div>
					<Divider />
					<Space direction="vertical" size={12} className="w-full">
						<h3 className="text-white text-[24px] font-bold">History Bid:</h3>
						{[1, 2, 3].map((item, idx) => (
							<div className="flex justify-between w-full">
								<span className="text-base font-medium text-[#999]">
									{Helper.shortTextAdress(
										"0xe42B1F6BE2DDb834615943F2b41242B172788E7E"
									)}
								</span>
								<span className="text-[#72ec9c] text-base font-medium">
									1.000.000 MDT
								</span>
							</div>
						))}
					</Space>
				</Space>
			</Col>
		</Row>
	);
};

export default Auction;
