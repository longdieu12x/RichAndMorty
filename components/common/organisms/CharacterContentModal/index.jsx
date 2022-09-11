import React from "react";
import { useGetCharacterDetailQuery } from "../../../../api/characterApi";
import { Space, Row, Col } from "antd";
import moment from "moment";
import Router, { useRouter } from "next/router";

const CharacterContentModal = (props) => {
	const { id } = props;
	const { data } = useGetCharacterDetailQuery({ id });
	const locationUrl = `/locations/${
		data?.location?.url?.split("/").reverse()[0]
	}`;
	const goToLocationUrl = () => {
		Router.push(locationUrl);
	};
	return (
		<div id="character-content-modal">
			<div className="flex justify-between">
				<Row justify="space-between" align="top" gutter={[12, 0]}>
					<Col span={12}>
						<img src={data?.image} alt="img-modal" />
					</Col>
					<Col span={12}>
						<Space direction="vertical" size={12}>
							<h2 className="text-[24px] font-bold">{data?.name}</h2>
							<Space
								direction="horizontal"
								className="justify-between flex-wrap"
							>
								<p className="text-base font-medium">{data?.species}</p>
								<p className="text-base font-medium">{data?.gender}</p>
							</Space>
							<h3
								className="text-[16px] cursor-pointer"
								onClick={goToLocationUrl}
							>
								<span className="font-bold">Location:</span>{" "}
								{data?.location.name}
							</h3>
						</Space>
						<div className="overflow-y-auto h-[80px]">
							{data?.episode?.length > 0 &&
								data.episode.map((item) => (
									<p className="text-base" key={item}>
										<span className="font-bold">Episode:</span> {item}
									</p>
								))}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default CharacterContentModal;
