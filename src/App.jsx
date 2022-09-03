import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import RenderIf from "./configs/RenderIf";
import PrivateRoute from "./components/containers/PrivateRoute";
import PublicRoute from "./components/containers/PublicRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "./routes";

const App = () => {
	return (
		<div className="p-[24px] mx-[auto] w-100 h-[100%]" id="app">
			<BrowserRouter>
				<React.Suspense
					fallback={
						<div className="h-full flex align-middle justify-center">
							<Spin size="large" />
						</div>
					}
				>
					<div className="wrapper">
						<Routes>
							{Object.keys(routes).map((key) => {
								if (routes[key].isAuth) {
									return (
										<Route
											key={key}
											path={routes[key].path}
											element={
												<PrivateRoute>{routes[key].component} </PrivateRoute>
											}
										/>
									);
								} else if (!routes[key].isAuth) {
									console.log(routes[key]);

									return (
										<Route
											key={key}
											path={routes[key].path}
											element={
												<PublicRoute>{routes[key].component} </PublicRoute>
											}
										/>
									);
								}
							})}
						</Routes>
					</div>
				</React.Suspense>
			</BrowserRouter>
		</div>
	);
};

export default App;
