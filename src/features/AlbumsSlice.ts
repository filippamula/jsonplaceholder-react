import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album } from "../model/Album";

export interface AlbumState {
    albums: Album[];
}

export interface AddAlbumPayload {
    userId: number | undefined;
    title: string;
}

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const data = await response.json();
    return data;
});

export const albumsSlice = createSlice({
    name: "albums",
    initialState: {
        albums: [],
    },
    reducers: {
        deleteAlbum: (state: AlbumState, action: PayloadAction<number>) => {
            const index = state.albums.findIndex((album) => album.id === action.payload);
            state.albums.splice(index, 1);
        },
        addAlbum: (state: AlbumState, action: PayloadAction<AddAlbumPayload>) => {
            if (action.payload.userId === undefined) {
                throw new Error("User ID is undefined");
            }
            const newAlbum: Album = {
                id: Math.random(),
                userId: action.payload.userId,
                title: action.payload.title,
            };
            state.albums.push(newAlbum);
        }
    },
    extraReducers: {
        [fetchAlbums.fulfilled.type]: (state, action) => {
            state.albums = action.payload;
        },
    },
});

export default albumsSlice.reducer;
export const { deleteAlbum, addAlbum } = albumsSlice.actions;
export const selectAlbums = (state: { albums: AlbumState }) => state.albums.albums;
