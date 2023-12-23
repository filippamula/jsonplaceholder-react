import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFoundComponent";
import Login from "../components/LoginComponent";
import Home from "../components/HomeComponent";

export const routes = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    }
]);