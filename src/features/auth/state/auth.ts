import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/model";
import axios from "axios";
import apiUrls from "../../../api";
import { storeAuthInLocalStorage } from "../../utils/localStroage";
import { IAppLoaderAction } from "../../auth/state/loaderHandleMiddleware";
import { RootState } from "../../../common/state/store";
import { setToken } from "../../../strapi/helpers";

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
  async ({ email: identifier, password }: IAuthFormData & IAppLoaderAction) => {
    
    const response = await axios.post<{ jwt: string; user: IUser }>(apiUrls.auth.signIn, {
      identifier,password
    }
       
    );
    const { jwt, user } = response.data;
    setToken(jwt)
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

