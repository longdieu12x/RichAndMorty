import React, { useState } from "react";
import { useGetAllCharactersQuery } from "../../api/characterApi";
import Search from "../../components/common/atoms/Search";
import { Select, Space } from "antd";
import StatusConfig from "../../configs/Status";
import "./Home.scss";
import Card from "../../components/common/atoms/Card";
import Pagination from "../../components/common/molecules/Pagination";
import Gender from "../../configs/Gender";
import EndObject from "../../configs/EndObject";
//Display character
const Home = () => {
	const [params, setParams] = useState({
		page: 1,
		status: Object.keys(StatusConfig)[0],
		gender: Object.keys(Gender)[0],
		name: "",
	});
	const { data, isFetching, isLoading } = useGetAllCharactersQuery(params);
	console.log(data);
	const pageHandler = (item) => {
		setParams({ ...params, page: item });
	};

	const selectStatusHandler = (item) => {
		if (item == EndObject) {
			setParams({ ...params, status: null });
		} else {
			setParams({ ...params, status: item });
		}
	};

	const selectGenderHandler = (item) => {
		if (item == EndObject) {
			setParams({ ...params, gender: null });
		} else {
			setParams({ ...params, gender: item });
		}
	};

	const searchChangeHandler = (e) => {
		setParams({ ...params, name: e.target.value });
	};

	const coverFn = (source) => <img alt="example" src={source} />;
	return (
		<div id="home">
			<Space direction="vertical" size={40}>
				<div className="flex justify-between]">
					<Search changeHandler={searchChangeHandler} />
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
									<div className="flex justify-between flex-wrap">
										<span className="text-xs">{item.species}</span>
										<span className="text-xs font-bold">{item.type}</span>
									</div>
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
