import React from "react";
import Register from "./components/Register";
import {useSelector} from "react-redux";
import {selectUser} from "./features/loggedUserSlice";
import Home from "./components/Home";

const App = () => {
    const loggedUser = useSelector(selectUser)

    return <div>
        {loggedUser ? <Home/> : <Register/>}
    </div>;
};

export default App;
