import React, { useEffect, useState } from "react";
import { getCharacterByUrl } from "../../../../services/character";
import Card from "antd/lib/card/Card";
import { useRouter } from "next/router";
const SingleCharacterCard = ({ url }) => {
	const router = useRouter().push;
	const [cardData, setCardData] = useState();
	const coverFn = (source) => <img alt="example" src={source} />;
	useEffect(() => {
		(async () => {
			if (url) {
				const data = await getCharacterByUrl(url);
				console.log(data);
				setCardData(data);
			}
		})();
	}, [url]);

	return (
		<Card {...{ hoverable: true, cover: coverFn(cardData?.image) }}>
			<div className="flex justify-center flex-col">
				<h3 className="text-[14px] font-bold">{cardData?.name}</h3>
				<div className="flex justify-between flex-wrap">
					<span className="text-xs">{cardData?.species}</span>
					<span className="text-xs font-bold">{cardData?.type}</span>
				</div>
			</div>
		</Card>
	);
};

export default SingleCharacterCard;
