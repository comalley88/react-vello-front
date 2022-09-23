import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../features/auth/state/auth";
import { loadingHandler } from "../../features/auth/state/loaderHandleMiddleware";
import { createLogger } from "redux-logger";
import { appStateReducer } from "../../features/auth/state/appStateSlice";
import { listingReducer } from "../../features/listing/state/listingSlice";

const logger = createLogger({});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appStateReducer,
    listing: listingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingHandler).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;