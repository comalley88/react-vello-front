import { isFulfilled, isPending, isRejected, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { LoadingState, setError, setIsLoading } from "./appStateSlice";

export interface IAppLoaderAction {
  componentId: string;
}

/**
 * Catch the fullfilled, pending and rejected actions from asyncChunk and dispatch setIsLoading and setError actions from @appStateSlice
 */
export const loadingHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (action.meta && action.meta.arg && action.meta.arg.componentId) {
    const componentId = action.meta.arg.componentId;
    if (isPending(action)) {
      api.dispatch(setError({ componentId, error: "" }));
      api.dispatch(setIsLoading({ componentId, loading: LoadingState.Loading }));
    }
    if (isFulfilled(action)) {
      api.dispatch(setIsLoading({ componentId, loading: LoadingState.Success }));
    }
    if (isRejected(action)) {
      api.dispatch(setIsLoading({ componentId, loading: LoadingState.Idle }));
      try {
        if (action.error && action.error.message) {
          api.dispatch(setError({ componentId, error: action.error.message }));
        } else if (action.payload.data) {
          const errorMessages = action.payload.data[0].messages
            .map((errorElem: { id: string; message: string }) => errorElem.message)
            .join(" ");
          //@todo investigate on this
          api.dispatch(setError({ componentId, error: errorMessages }));
        }
      } catch (ex) {
        console.error(ex);
        api.dispatch(setError({ componentId, error: "An error occured" }));
      }
    }
  }

  return next(action);
};