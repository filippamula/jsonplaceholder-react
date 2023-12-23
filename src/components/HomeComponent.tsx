import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/loggedUserSlice";
import { AppDispatch } from "../app/store";
import { fetchPosts, selectPosts } from "../features/PostsSlice";
import NavBarComponent from "./NavBarComponent";
import PostComponent from "./PostComponent";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const posts = useSelector(selectPosts)

    const handleLogout = () => {
        dispatch(logout())
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="min-h-full">
            <NavBarComponent />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {posts.map((post) => (
                        <PostComponent post={post} />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default HomeComponent
