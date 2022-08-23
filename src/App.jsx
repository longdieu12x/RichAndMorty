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
	const { chainId, switchNetwork } = useChain();
	const [userAddress, setUserAddress] = useState("");

	const login = async () => {
		if (!isAuthenticated) {
			await authenticate()
				.then(function (user) {
					setUserAddress(user.get("ethAddress"));
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

	const onChange = () => {};

	useEffect(() => {
		if (account) {
			localStorage.setItem("metamask-address", account);
			setUserAddress(account);
		} else {
			setUserAddress(localStorage.getItem("metamask-address"));
		}
	}, [account]);

	useEffect(() => {
		if (chainId && chainId != 97) {
			if (
				window.confirm(
					"You are not on Binance Smart Chain Testnet, do you want to change to BSC testnet"
				) == true
			) {
				switchNetwork(97);
			} else {
				logOut();
			}
			switchNetwork(4);
		}
		if (chainId) {
			console.log(chainId);
			localStorage.setItem("metamask-chainId", chainId);
		} else {
			localStorage.setItem("metamask-chainId", "0x61");
		}
	}, [chainId]);

	return (
		<div className="p-20 w-100 h-[100%] bg-black text-center">
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
					<p className="text-base text-white">{`You are using chain: ${parseInt(
						chainId || localStorage.getItem("metamask-chainId"),
						16
					)}`}</p>
				</div>
			</RenderIf>
			<>
				<Tabs defaultActiveKey="1" onChange={onChange}>
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
