import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/loggedUserSlice"

export default configureStore({
    reducer:{
        user: userReducer,
    }
})