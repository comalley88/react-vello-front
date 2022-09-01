import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum LoadingState {
  Idle,
  Loading,
  Success,
}

/**
 * AppState is used to store the error/loading flag of part of app
 * you can use it for an all page of a simple component
 * When you use it with an asyncThunk, the loading flag and the error value will be
 * automaticly update by @loaderHandlerMiddleware
 * It catch the fullfilled, pending and rejected actions and dispatch setIsLoading and setError actions
 * To show errors and loading state in the app you can use IsLoading component (cf @IsLoading) and Error component (@Error)
 * They will automaticly display a loader or an error in the app
 */
export interface IAppState {
  [componentId: string]: { loading: LoadingState; error: string };
}

const initialState: IAppState = { global: { loading: LoadingState.Idle, error: "" } };

export const appStateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading: (
      state: IAppState,
      action: PayloadAction<{ componentId: string; loading: LoadingState }>,
    ) => {
      const { componentId, loading } = action.payload;
      if (!state[componentId]) {
        state[componentId] = { loading, error: "" };
      } else {
        state[componentId].loading = loading;
      }
    },
    setError: (state: IAppState, action: PayloadAction<{ componentId: string; error: string }>) => {
      const { componentId, error } = action.payload;
      if (!state[componentId]) {
        state[componentId] = { loading: LoadingState.Idle, error };
      } else {
        state[componentId].error = error;
      }
    },
  },
});

export const errorSelector = (state: RootState, componentId: string): string =>
  state.app[componentId] && state.app[componentId].error;

export const loadingSelector = (state: RootState, componentId: string) =>
  state.app[componentId] && state.app[componentId].loading;

export const appStateReducer = appStateSlice.reducer;
export const { setIsLoading, setError } = appStateSlice.actions;