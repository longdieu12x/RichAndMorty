import { api } from ".";

const episodeApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllEpisodes: build.query({
			query: (params) => {
				return {
					url: `episode`,
					method: "GET",
					params,
				};
			},
			providesTags: (result, error, id) => {
				if (result?.results?.length > 0) {
					return [
						{ type: "Episode", id: "LIST" },
						...result.results.map((item) => ({
							type: "Episode",
							id: item?.id,
						})),
					];
				} else {
					return [{ type: "Episode", id: "LIST " }];
				}
			},
		}),
		getEpisodeDetail: build.query({
			query: ({ id }) => {
				return {
					url: `episode/${id}`,
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

export const { useGetAllEpisodesQuery, useGetEpisodeDetailQuery } = episodeApi;

export const { getAllEpisodes, getEpisodeDetail } = episodeApi.endpoints;
