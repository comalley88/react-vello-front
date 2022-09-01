import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { loadingHandler } from "./loaderHandleMiddleware";
import { createLogger } from "redux-logger";
import { appStateReducer } from "./appStateSlice";

const logger = createLogger({});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingHandler).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;