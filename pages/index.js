import React, { useState, useEffect } from "react";
import { useGetAllCharactersQuery } from "../api/characterApi";
import Search from "../components/common/atoms/Search";
import { Select, Space } from "antd";
import StatusConfig from "../configs/Status";
import Card from "../components/common/atoms/Card";
import Pagination from "../components/common/molecules/Pagination";
import Gender from "../configs/Gender";
import EndObject from "../configs/EndObject";
import Modal from "../components/common/molecules/Modal";
import CharacterContentModal from "../components/common/organisms/CharacterContentModal";
import { getAllCharacters } from "../api/characterApi";
import store from "../redux/store";
//Display character
const Home = ({ characterData }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [params, setParams] = useState({
		page: 1,
		status: Object.keys(StatusConfig)[0],
		gender: Object.keys(Gender)[0],
		name: "",
	});
	const [idSelect, setIdSelect] = useState();
	const {
		data: queryData,
		isFetching,
		isLoading,
	} = useGetAllCharactersQuery(params);

	const [data, setData] = useState(characterData?.data || []);
	const pageHandler = (item) => {
		setParams({ ...params, page: item });
	};
	const cardHandler = (item) => {
		setIdSelect(item);
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

	useEffect(() => {
		if (idSelect) {
			console.log(idSelect);
			setIsVisible(true);
		}
	}, [idSelect]);

	useEffect(() => {
		setData(queryData);
	}, [queryData]);
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
								onClick={() => cardHandler(item?.id)}
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
			<>
				<Modal isVisible={isVisible} setIsVisible={setIsVisible}>
					<CharacterContentModal id={idSelect} />
				</Modal>
			</>
		</div>
	);
};

export default Home;
export async function getStaticProps(context) {
	const data = await store.dispatch(
		getAllCharacters.initiate({
			page: 1,
			status: Object.keys(StatusConfig)[0],
			gender: Object.keys(Gender)[0],
			name: "",
		})
	);
	return {
		props: {
			characterData: data,
		}, // will be passed to the page component as props
	};
}
