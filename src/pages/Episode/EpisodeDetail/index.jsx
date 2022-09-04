import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../../components/common/atoms/Card";
import moment from "moment";
import SingleCharacterCard from "../../../components/common/organisms/SingleCharacterCard";
import { useGetEpisodeDetailQuery } from "../../../api/episodeApi";

const EspisodeDetail = () => {
	const pathname = useLocation().pathname;
	const id = pathname.split("/")[2];
	const { data } = useGetEpisodeDetailQuery({ id });
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
						{data?.episode ? (
							<span className="text-xs">{data?.episode}</span>
						) : (
							<></>
						)}
					</div>
					<p className="text-xs font-medium">{data?.air_date}</p>
				</div>
			</Card>
			<h2 className="font-bold text-dark text-[24px] mb-[24px]">Characters</h2>
			<div className="grid grid-cols-3 gap-[8px] px-[64px]">
				{data?.characters?.length > 0 &&
					data.characters.map((item) => {
						return <SingleCharacterCard url={item} key={item} />;
					})}
			</div>
		</div>
	);
};

export default EspisodeDetail;
