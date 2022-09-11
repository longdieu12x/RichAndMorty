import React, { useState, useEffect } from "react";
import { useGetAllLocationsQuery } from "../../api/locationApi";
import Search from "../../components/common/atoms/Search";
import { Select, Space } from "antd";
import Card from "../../components/common/atoms/Card";
import Pagination from "../../components/common/molecules/Pagination";
import moment from "moment";
import { useRouter } from "next/router";
import store from "../../redux/store";
import { getAllLocations } from "../../api/locationApi";
//Display character
const ListLocation = ({ locationData }) => {
	const navigate = useRouter().push;
	const [data, setData] = useState(locationData?.data || []);
	const [params, setParams] = useState({
		page: 1,
		name: "",
	});
	const {
		data: queryData,
		isFetching,
		isLoading,
	} = useGetAllLocationsQuery(params);
	const pageHandler = (item) => {
		setParams({ ...params, page: item });
	};

	const cardHandler = (item) => {
		navigate(`/locations/${item}`);
	};

	const searchChangeHandler = (e) => {
		setParams({ ...params, name: e.target.value });
	};
	useEffect(() => {
		setData(queryData);
	}, [queryData]);
	return (
		<div id="home">
			<Space direction="vertical" size={40}>
				<div className="flex justify-between]">
					<Search changeHandler={searchChangeHandler} />
				</div>
				<div className="grid grid-cols-4 gap-4">
					{data?.results != undefined &&
						data.results.map((item) => (
							<Card
								{...{ hoverable: true }}
								key={item?.id}
								onClick={() => cardHandler(item?.id)}
							>
								<div className="flex justify-center flex-col">
									<h3 className="text-[14px] font-bold">{item.name}</h3>
									<div className="flex justify-between flex-wrap">
										{item?.dimension ? (
											<span className="text-xs">{item.dimension}</span>
										) : (
											<></>
										)}
										<span className="text-xs font-bold">{item.type}</span>
									</div>
									<p className="text-xs font-medium">
										{moment(new Date(item?.created)).format("LL")}
									</p>
								</div>
							</Card>
						))}
				</div>
				<div className="flex justify-center">
					<Pagination
						current={params.page}
						defaultCurrent={1}
						total={data?.info?.pages}
						pageHandler={pageHandler}
					/>
				</div>
			</Space>
		</div>
	);
};

export default ListLocation;
export async function getStaticProps(context) {
	const data = await store.dispatch(
		getAllLocations.initiate({ page: 1, name: "" })
	);

	return {
		props: {
			locationData: data,
		},
	};
}
