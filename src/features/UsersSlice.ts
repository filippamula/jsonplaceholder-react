import { stat } from 'fs';
import { User } from './../model/User';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { act } from 'react-dom/test-utils';
import { randomUUID } from 'crypto';

export interface UsersState {
    users: User[]
}

export interface RegisterUserPayload {
    email: string,
    name: string,
    phoneNo: string,
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    return data
})

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        registerUser: (state: UsersState, action: PayloadAction<RegisterUserPayload>) => {
            if (state.users.some((user) => user.email === action.payload.email)) {
                throw new Error("User already exists")
            }
            const newUser: User = {
                email: action.payload.email,
                name: action.payload.name,
                phone: action.payload.phoneNo,
                id: Math.random(),
                username: null,
                address: null,
                website: null,
                company: null
            }
            state.users.push(newUser)
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action) => {
            state.users = action.payload
        }
    }
})

export default usersSlice.reducer
export const { registerUser } = usersSlice.actions
export const selectUsers = (state: { users: UsersState }) => state.users.users
