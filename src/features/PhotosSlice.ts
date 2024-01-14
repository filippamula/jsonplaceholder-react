import { Photo } from './../model/Photo';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PhotoState {
    photos: Photo[];
}

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    return data;
});

export const photoSlice = createSlice({
    name: "photos",
    initialState: {
        photos: [],
    },
    reducers: {
        deletePhoto: (state: PhotoState, action: PayloadAction<number>) => {
            const index = state.photos.findIndex((photo) => photo.id === action.payload);
            state.photos.splice(index, 1);
        }
    },
    extraReducers: {
        [fetchPhotos.fulfilled.type]: (state, action) => {
            state.photos = action.payload;
        },
    },
});

export default photoSlice.reducer;
export const { deletePhoto } = photoSlice.actions;
export const selectPhotos = (state: { photos: PhotoState }) => state.photos.photos;
