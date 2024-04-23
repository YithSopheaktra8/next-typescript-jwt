import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type AccessTokenState = {
	token: string | null;
};

const initialState: AccessTokenState = {
	token: null,
};

const accessTokenSlice = createSlice({
	name: "accessToken",
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.token = action.payload;
		},
		clearAccessToken: (state) => {
			state.token = null;
		},
	},
});

export const { setAccessToken, clearAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;

export const getAccessToken = (state: RootState) => state.accessToken.token;

// Define selector
export const selectAccessToken = (state: { accessToken: AccessTokenState }) =>
	state.accessToken.token;
