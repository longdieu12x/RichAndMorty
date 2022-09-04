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
});

export const { useGetAllEpisodesQuery, useGetEpisodeDetailQuery } = episodeApi;
