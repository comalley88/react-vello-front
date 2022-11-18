import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import apiUrls from "../../../api";
import { RootState } from "../../../common/state/store";
import { IAddress, IListing, ITelephone } from "../../../models/model";

export interface IListingState {
    all: Array<IListing>
    newListing: IListingFormValues
}

export interface IListingFormValues {
    brand: string;
    model: string;
    yearPurchased: Dayjs | string;
    description: string;
    options: Array<string>;
    address: IAddress;
    telephone: ITelephone,
    dailyRate: number,
    photo: {}
}

const initialState: IListingState = {
  all: [],
  newListing: {
    brand: "",
    model: "",
    yearPurchased: dayjs(),
    description: "",
    options: [],
    address: {
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      city: "",
      country: ""
    },
    telephone: {
      prefix: "",
      number: ""
    },
    dailyRate: 15,
    photo: {}
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
