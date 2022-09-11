import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
	({ baseUrl }) =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axios({ url: baseUrl + url, method, data, params });
			return { data: result.data };
		} catch (err) {
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

const baseUrl = "https://rickandmortyapi.com/api/";

export const api = createApi({
	reducerPath: "api",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Character", "Location", "Episode"],
	endpoints: () => ({}),
});
