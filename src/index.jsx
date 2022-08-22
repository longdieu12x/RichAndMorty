import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "antd/dist/antd.css";
import "./index.scss";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
	<React.StrictMode>
		<MoralisProvider
			serverUrl="https://hpz4yq50hr8y.usemoralis.com:2053/server"
			appId="FaLY0U96izeaTHPkmvxHUq87YIejSYU0KMBiHS5M"
		>
			<App />
		</MoralisProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
