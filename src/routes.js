import Home from "./pages/Home/Home";
import ListLocation from "./pages/Location/ListLocation";
import LocationDetail from "./pages/Location/LocationDetail";
import ListEpisode from "./pages/Episode/ListEpisode";
import EpisodeDetail from "./pages/Episode/EpisodeDetail";

export const routes = {
	listLocation: {
		path: "/locations",
		component: <ListLocation />,
		isAuth: false,
		exact: true,
	},
	locationDetail: {
		path: "/locations/:id",
		component: <LocationDetail />,
		isAuth: false,
		exact: true,
	},
	listEpisode: {
		path: "/episodes",
		component: <ListEpisode />,
		isAuth: false,
		exact: true,
	},
	episodeDetail: {
		path: "/episodes/:id",
		component: <EpisodeDetail />,
		isAuth: false,
		exact: true,
	},
	home: {
		path: "/",
		component: <Home />,
		isAuth: false,
	},
};
