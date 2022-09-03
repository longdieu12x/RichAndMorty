import Home from "./pages/Home/Home";

export const routes = {
	home: {
		path: "/",
		component: <Home />,
		isAuth: true,
	},
};
