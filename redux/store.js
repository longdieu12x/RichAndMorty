import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "../api";

const appReducer = combineReducers({
	[api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
	// if (action.type === "wallet/removeWallet") {
	// 	window.localStorage.removeItem("persist: root");
	// 	state = {};
	// }
	return appReducer(state, action);
};

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [api.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(api.middleware),
	devTools: true,
});

let persistor = persistStore(store);
export { persistor };
export default store;
