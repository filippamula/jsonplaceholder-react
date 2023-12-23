import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFoundPage";
import Login from "../components/LoginComponent";
import Home from "../components/PostsPage";

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
        path: "/posts",
        element: <Home />
    }
]);