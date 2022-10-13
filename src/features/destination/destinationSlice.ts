import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../common/state/store";

export interface IDestination {
    currentSearchDestination: IDestinationCoordinates
}

export interface IDestinationCoordinates {
    latitude: number;
    longitude: number;
}

const initialState: IDestination = {
    currentSearchDestination: {
        latitude: 43.296482,
        longitude: 5.36978
    }
};

export const destinationSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {
        setDestinationCoords: (state: IDestination, action: PayloadAction<IDestinationCoordinates>) => {
            state.currentSearchDestination = action.payload;
          },
      },
},
);

export const getDestinationCoords = (state: RootState) => state.destination.currentSearchDestination;

export const {
    setDestinationCoords,
} = destinationSlice.actions;

export const destinationReducer = destinationSlice.reducer;
