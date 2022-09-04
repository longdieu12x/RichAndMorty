import React from "react";
import { useLocation } from "react-router-dom";
import { useGetLocationDetailQuery } from "../../../api/locationApi";
import Card from "../../../components/common/atoms/Card";
import moment from "moment";
import SingleCharacterCard from "../../../components/common/organisms/SingleCharacterCard";
const LocationDetail = () => {
	const pathname = useLocation().pathname;
	const id = pathname.split("/")[2];
	const { data } = useGetLocationDetailQuery({ id });
	console.log(data);
	return (
		<div className="w-full flex flex-col items-center">
			<Card
				key={data?.id}
				style={{ width: "80%", marginTop: "48px", marginBottom: "36px" }}
			>
				<div className="flex justify-center flex-col">
					<h3 className="text-[14px] font-bold">{data?.name}</h3>
					<div className="flex justify-between flex-wrap">
						{data?.dimension ? (
							<span className="text-xs">{data?.dimension}</span>
						) : (
							<></>
						)}
						<span className="text-xs font-bold">{data?.type}</span>
					</div>
					<p className="text-xs font-medium">
						{moment(new Date(data?.created)).format("LL")}
					</p>
				</div>
			</Card>
			<h2 className="font-bold text-dark text-[24px] mb-[24px]">Residents</h2>
			<div className="grid grid-cols-3 gap-[8px] px-[64px]">
				{data?.residents?.length > 0 &&
					data.residents.map((item) => {
						return <SingleCharacterCard url={item} key={item} />;
					})}
			</div>
		</div>
	);
};

export default LocationDetail;
