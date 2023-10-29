import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { logout, selectUser } from "../features/loggedUserSlice";
import { AppDispatch } from "../app/store";

const Home = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(logout())
    }

    return(
        <div>
            <h1>Welcome <span>{user.loggedUser}</span></h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
