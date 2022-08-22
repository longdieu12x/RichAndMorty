import React from "react";
import { useMoralis, useChain } from "react-moralis";
import { Button } from "antd";
import RenderIf from "./configs/RenderIf";

const App = () => {
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		account,
		logout,
	} = useMoralis();

	const login = async () => {
		if (!isAuthenticated) {
			await authenticate()
				.then(function (user) {
					localStorage.setItem("metamask-address", user.get("ethAddress"));
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};

	const logOut = async () => {
		await logout();
		localStorage.removeItem("metamask-address");
	};

	return (
		<div className="p-20 w-100 h-[100vh] bg-black text-center">
			<h2 className="text-white text-2xl font-bold">Moralis Hello World! 🚀</h2>
			<div className="flex justify-center items-center mt-2">
				<RenderIf isTrue={!isAuthenticated}>
					<Button type="primary" onClick={login} loading={isAuthenticating}>
						🦊 Moralis Metamask Login
					</Button>
				</RenderIf>
				<RenderIf isTrue={isAuthenticated}>
					<p className="text-white font-medium text-base">
						Welcome, {localStorage.getItem("metamask-address")}
					</p>
					<Button
						type="primary mx-2"
						ghost
						onClick={logOut}
						disabled={isAuthenticating}
					>
						Logout
					</Button>
				</RenderIf>
			</div>
		</div>
	);
};

export default App;
