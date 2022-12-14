import { api } from ".";

const locationApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllLocations: build.query({
			query: (params) => {
				return {
					url: `location`,
					method: "GET",
					params,
				};
			},
			providesTags: (result, error, id) => {
				if (result?.results?.length > 0) {
					return [
						{ type: "Location", id: "LIST" },
						...result.results.map((item) => ({
							type: "Location",
							id: item?.id,
						})),
					];
				} else {
					return [{ type: "Location", id: "LIST " }];
				}
			},
		}),
		getLocationDetail: build.query({
			query: ({ id }) => {
				return {
					url: `location/${id}`,
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

export const { useGetAllLocationsQuery, useGetLocationDetailQuery } =
	locationApi;

export const { getAllLocations, getLocationDetail } = locationApi.endpoints;
