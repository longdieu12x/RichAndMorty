import React from "react";
import Card from "../../components/common/atoms/Card";
import moment from "moment";
import SingleCharacterCard from "../../components/common/organisms/SingleCharacterCard";
import store from "../../redux/store";
import { getLocationDetail, getAllLocations } from "../../api/locationApi";
const LocationDetail = ({ data }) => {
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
export async function getStaticPaths() {
	const data = await store.dispatch(
		getAllLocations.initiate({ page: 1, name: "" })
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
	const data = await store.dispatch(getLocationDetail.initiate({ id }));
	return {
		props: {
			data: data?.data,
		},
	};
}
