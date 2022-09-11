import "../styles/globals.scss";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "../redux/store";
import Navbar from "../components/common/organisms/Navbar/index";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="px-[24px]" id="root-wrapper">
					<Navbar />
					<Component {...pageProps} />
				</div>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
