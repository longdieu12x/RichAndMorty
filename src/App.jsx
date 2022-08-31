import React, { useState, useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Button, Tabs } from "antd";
import RenderIf from "./configs/RenderIf";
import Auction from "./components/Auction";
import Collection from "./components/Collection";

const { TabPane } = Tabs;
const App = () => {
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		user,
		account,
		logout,
	} = useMoralis();
	console.log(isAuthenticated, user, account);
	const [userAddress, setUserAddress] = useState("");

	const login = async () => {};

	const logOut = async () => {};

	return (
		<div className="p-20 w-100 h-[100%] bg-black text-center" id="app">
			<h2 className="text-white text-2xl font-bold">Moralis Hello World! 🚀</h2>
			<div className="flex justify-center items-center mt-2">
				<RenderIf isTrue={!isAuthenticated}>
					<Button type="primary" onClick={login} loading={isAuthenticating}>
						🦊 Moralis Metamask Login
					</Button>
				</RenderIf>
				<RenderIf isTrue={isAuthenticated}>
					<p className="text-white font-medium text-base">
						Welcome, {userAddress}
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
			<RenderIf isTrue={isAuthenticated}>
				<div className="flex justify-center items-center mt-2 mb-2">
					<p className="text-base text-white">{`You are using chain: `}</p>
				</div>
			</RenderIf>
			<>
				<Tabs defaultActiveKey="1" onChange={() => {}}>
					<TabPane tab="Auction" key="1">
						<Auction />
					</TabPane>
					<TabPane tab="NFT Collection" key="2">
						<Collection />
					</TabPane>
				</Tabs>
			</>
		</div>
	);
};

export default App;
