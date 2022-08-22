import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.scss";
import { MoralisProvider } from "react-moralis";

console.log(process.env.REACT_APP_SERVER_URL);
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
