import {createSlice} from "@reduxjs/toolkit";

export const loggedUserSlice = createSlice({
    name: "loggedUser",
    initialState: {
        loggedUser: null
    },
    reducers: {
        login: (state, action) => {
            state.loggedUser = action.payload
        },
        logout: (state) => {
            state.loggedUser = null
        }
    }
})

export const {login, logout} = loggedUserSlice.actions
export const selectUser = (state) => state.user.loggedUser
export default loggedUserSlice.reducer