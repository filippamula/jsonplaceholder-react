import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFoundPage";
import Login from "../components/LoginPage";
import Home from "../components/PostsPage";
import Albums from "../components/AlbumsPage";
import Todos from "../components/TodosPage";

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
    },
    {
        path: "/albums",
        element: <Albums />
    },
    {
        path: "/todos",
        element: <Todos />
    }
]);