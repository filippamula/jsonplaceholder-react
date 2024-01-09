import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../model/Post";

export interface PostState {
    posts: Post[];
}

export interface AddPostPayload {
    userId: number | undefined;
    title: string;
    body: string;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        addPost: (state: PostState, action: PayloadAction<AddPostPayload>) => {
            if (action.payload.userId === undefined) {
                throw new Error("User ID is undefined");
            }
            const newPost: Post = {
                userId: action.payload.userId,
                id: Math.random(),
                title: action.payload.title,
                body: action.payload.body,
            };
            state.posts.push(newPost);
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled.type]: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export default postsSlice.reducer;
export const { addPost } = postsSlice.actions;
export const selectPosts = (state: { posts: PostState }) => state.posts.posts;
