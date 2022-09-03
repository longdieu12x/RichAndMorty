import Home from "./pages/Home";

export const routes = {
	home: {
		path: "/",
		component: <Home />,
		isAuth: true,
	},
};
