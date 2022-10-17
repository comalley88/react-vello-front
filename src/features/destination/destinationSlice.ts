import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { RootState } from "../../common/state/store";

export interface IDestination {
    currentSearchDestination: IDestinationSearchForm
}

export interface IDestinationSearchForm {
    coords: IDestinationCoordinates
    destination: string,
    dates: {
        startDate: number,
        endDate: number
    }
}

export interface IDestinationCoordinates {
    latitude: number;
    longitude: number;
}

const initialState: IDestination = {
    currentSearchDestination: {
        coords: {
        latitude: 43.296482,
        longitude: 5.36978
        },
        destination: "",
        dates: {
            startDate: dayjs().valueOf(),
            endDate: dayjs().valueOf()

        }
    }
};

export const destinationSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {
        setDestinationCoords: (state: IDestination, action: PayloadAction<IDestinationCoordinates>) => {
            state.currentSearchDestination.coords = action.payload;
          },
        setDestination: (state: IDestination, action: PayloadAction<IDestinationSearchForm>) => {
            state.currentSearchDestination = {...action.payload};
          },
      },
},
);

export const getDestinationCoords = (state: RootState) => state.destination.currentSearchDestination.coords;
export const getDestination = (state: RootState) => state.destination.currentSearchDestination;


export const {
    setDestinationCoords,
    setDestination,
} = destinationSlice.actions;

export const destinationReducer = destinationSlice.reducer;
