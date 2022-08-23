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
			serverUrl={process.env.REACT_APP_SERVER_URL}
			appId={process.env.REACT_APP_APP_ID}
		>
			<App />
		</MoralisProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
