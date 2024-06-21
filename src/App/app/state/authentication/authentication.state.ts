import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AuthenticationState,
  AUTHENTICATION_STATE_NAME,
} from "./authentication.constant";

const initialState: AuthenticationState = {
  token: "",
  isLoading: false,
  id: "",
};

export const AuthenticationSlice = createSlice({
  name: AUTHENTICATION_STATE_NAME,
  initialState,
  reducers: {
    // Start loading
    logIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // End loading
    logOut: (state) => {
      state.token = null;
      state.id = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      window.alert("oke");
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});

export const AuthenticationReducer = AuthenticationSlice.reducer;
export const AuthenticationActions = AuthenticationSlice.actions;
