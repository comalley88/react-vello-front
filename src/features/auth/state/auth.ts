import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/model";
import axios from "axios";
import apiUrls from "../../../api";
import { storeAuthInLocalStorage } from "../../utils/localStroage";
import { IAppLoaderAction } from "../../auth/state/loaderHandleMiddleware";
import { RootState } from "./store";

export interface IAuthFormData {
  email: string;
  password: string;
  rememberme: boolean;
}

export interface IAuth {
  currentUser?: IUser;
  jwt: string;
}

export const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberme }: IAuthFormData & IAppLoaderAction) => {
    const response = await axios.post<{ jwt: string; user: IUser }>(apiUrls.auth.signIn, {
      identifier: email,
      password,
      from_environment: "WebApp",
    });
    const { jwt, user } = response.data;

    return { jwt, user };
  },
);

const initialState: IAuth = { currentUser: undefined, jwt: "" };


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.currentUser = payload.user;
      state.jwt = payload.jwt;
    });
  },
});

export const currentUserSelector = (state: RootState) => state.auth.currentUser;

export const jwtSelector = (state: RootState) => state.auth.jwt;

export const authReducer = authSlice.reducer;

