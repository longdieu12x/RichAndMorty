import React from "react";
import Card from "../../components/common/atoms/Card";
import moment from "moment";
import SingleCharacterCard from "../../components/common/organisms/SingleCharacterCard";
import { getEpisodeDetail, getAllEpisodes } from "../../api/episodeApi";
import store from "../../redux/store";

const EspisodeDetail = ({ data }) => {
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

export async function getStaticPaths() {
	const data = await store.dispatch(
		getAllEpisodes.initiate({ page: 1, name: "" })
	);
	return {
		paths: data?.data?.results
			? data.data.results.map((item) => {
					return { params: { id: `${item?.id}` } };
			  })
			: [],
		fallback: true,
	};
}

export async function getStaticProps(context) {
	const id = context.params.id;
	const data = await store.dispatch(getEpisodeDetail.initiate({ id }));
	return {
		props: {
			data: data?.data,
		},
	};
}
