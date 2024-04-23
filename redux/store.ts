import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import cartSlice from "./features/cart/cartSlice";
import userProfileSlice from "./features/userProfile/userProfileSlice";
import { ecommerceApi } from "./service/ecommerce";
// import {accessToken} from "./service/acessToken"
import accessToken from "./features/token/tokenSlice"
// create store
export const makeStore = () => {
	return configureStore({
		reducer: {
			[ecommerceApi.reducerPath]: ecommerceApi.reducer,
			// [accessToken.reducerPath] : accessToken.reducer,
			accessToken : accessToken,
			counter: counterSlice,
			cart: cartSlice,
			userProfile: userProfileSlice,
		},
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(ecommerceApi.middleware),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
