import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountResponse } from "../../types";

type State = {
    accessToken: string | null;
    refreshToken: string | null;
    account: AccountResponse | null;
};

const initialState: State = {
    accessToken: null,
    refreshToken: null,
    account: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        setAuthTokens(
            state: State,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) {
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
        },
        setAccount(state: State, action: PayloadAction<AccountResponse>) {
            state.account = action.payload;
        },
        setLogout(state: State) {
            state.account = null;
            state.refreshToken = null;
            state.accessToken = null;
        },
    },
});

export default authSlice;
