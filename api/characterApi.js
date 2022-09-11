import { api } from ".";
import { HYDRATE } from "next-redux-wrapper";
const characterApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllCharacters: build.query({
			query: (params) => {
				return {
					url: `character`,
					method: "GET",
					params,
				};
			},
			providesTags: (result, error, id) => {
				if (result?.results?.length > 0) {
					return [
						{ type: "Character", id: "LIST" },
						...result.results.map((item) => ({
							type: "Character",
							id: item?.id,
						})),
					];
				} else {
					return [{ type: "Character", id: "LIST " }];
				}
			},
		}),
		getCharacterDetail: build.query({
			query: ({ id }) => {
				return {
					url: `character/${id}`,
					method: "GET",
				};
			},
		}),
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
});

export const { useGetAllCharactersQuery, useGetCharacterDetailQuery } =
	characterApi;

export const { getAllCharacters, getCharacterDetail } = characterApi.endpoints;
