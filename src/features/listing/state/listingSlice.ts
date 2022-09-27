import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dayjs } from "dayjs";
import apiUrls from "../../../api";
import { RootState } from "../../../common/state/store";
import { IListing } from "../../../models/model";

export interface IListingState {
    all: Array<IListing>
    newListing: IListingFormValues
}

export interface IListingFormValues {
    brand: string;
    model: string;
    yearPurchased: Dayjs["year"] | null;
    description: string;
    options: Array<string>;
}

const initialState: IListingState = {
  all: [],
  newListing: {
    brand: "",
    model: "",
    yearPurchased: null,
    description: "",
    options: [],
  }
};

export const getAllListings = createAsyncThunk(
  "bike-listing/all",
  async () => {
    const response = (await axios.get)<Array<IListing>>(
      `${apiUrls.listings.all}`,
    );
    return { data: (await response).data };
  },
);

// export const updateMedia = createAsyncThunk(
//   "media/update",
//   async ({ media }: { media: IMedia } & IAppLoaderAction) => {
//     await axios.put(`${apiUrls.medias.all}/${media.id}`, { tags: [...media.tags] });
//     return media;
//   },
// );

// export const deleteListing = createAsyncThunk(
//   "media/delete",
//   async ({ mediaId }: { mediaId: IMedia["id"] } & IAppLoaderAction) => {
//     await axios.delete(`${apiUrls.medias.all}/${mediaId}`);
//     return mediaId;
//   },
// );

export const listingSlice = createSlice({
    name: "listing",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllListings.fulfilled, (state, { payload }) => {
            const allBikeList = payload.data as Array<IListing>;
            state.all = allBikeList;
        });
    },
    reducers: {
        setNewListing: (state: IListingState, action: PayloadAction<IListingFormValues>) => {
            state.newListing = { ...action.payload };
          },
      },
},
  
);
export const getListingDraft = (state: RootState) => state.listing.newListing;

export const {
  setNewListing,
} = listingSlice.actions;

export const listingReducer = listingSlice.reducer;
