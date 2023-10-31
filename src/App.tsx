import { useDispatch, useSelector} from "react-redux";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import { selectUser } from "./features/loggedUserSlice";
import { useEffect } from "react";
import { fetchUsers } from "./features/UsersSlice";
import { AppDispatch } from "./app/store";

const App = () => {
    let loggedUser = useSelector(selectUser)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchUsers());}, [dispatch]);

    return (<div>
        {loggedUser.loggedUser ? <HomeComponent/> : <LoginComponent/>}
    </div>);
};

export default App;
