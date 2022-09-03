import React, { useState } from "react";
import { useGetAllCharactersQuery } from "../../api/characterApi";
import Search from "../../components/common/atoms/Search";
import { Select, Space, Card as C } from "antd";
import StatusConfig from "../../configs/Status";
import "./Home.scss";
import Card from "../../components/common/atoms/Card";
import Pagination from "../../components/common/molecules/Pagination";
import Gender from "../../configs/Gender";
//Display character
const { Meta } = C;
const Home = () => {
	const [params, setParams] = useState({
		page: 1,
		status: Object.keys(StatusConfig)[0],
		gender: Object.keys(Gender)[0],
	});
	const { data, isFetching, isLoading } = useGetAllCharactersQuery(params);
	console.log(data);
	const pageHandler = (item) => {
		setParams({ ...params, page: item });
	};

	const selectStatusHandler = (item) => {
		setParams({ ...params, status: item });
	};

	const selectGenderHandler = (item) => {
		setParams({ ...params, gender: item });
	};

	const coverFn = (source) => <img alt="example" src={source} />;
	return (
		<div id="home">
			<Space direction="vertical" size={40}>
				<div className="flex justify-between]">
					<Search />
					<Select
						defaultValue={Object.keys(StatusConfig)[0]}
						onChange={selectStatusHandler}
					>
						{Object.keys(StatusConfig).map((item, idx) => (
							<Select.Option value={item} key={idx}>
								{item}
							</Select.Option>
						))}
					</Select>
					<Select
						defaultValue={Object.keys(Gender)[0]}
						onChange={selectGenderHandler}
					>
						{Object.keys(Gender).map((item, idx) => (
							<Select.Option value={item} key={idx}>
								{item}
							</Select.Option>
						))}
					</Select>
				</div>
				<div className="grid grid-cols-4 gap-4">
					{data?.results != undefined &&
						data.results.map((item) => (
							<Card
								{...{ hoverable: true, cover: coverFn(item.image) }}
								key={item?.id}
							>
								<div className="flex justify-center flex-col">
									<h3 className="text-[14px] font-bold">{item.name}</h3>
									<p className="text-xs">{item.species}</p>
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

export default Home;
