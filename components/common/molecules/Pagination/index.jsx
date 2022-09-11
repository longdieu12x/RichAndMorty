import React from "react";
import { Pagination as Page } from "antd";
const Pagination = (props) => {
	const { defaultCurrent, total, pageHandler, current } = props;
	return (
		<Page
			defaultPageSize={1}
			current={current}
			defaultCurrent={defaultCurrent}
			total={total}
			onChange={pageHandler}
		/>
	);
};

export default Pagination;
