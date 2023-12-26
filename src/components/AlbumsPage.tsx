import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/loggedUserSlice";
import NavBarComponent from "./NavBarComponent";
import { fetchAlbums, selectAlbums } from "../features/AlbumsSlice";
import { AppDispatch } from "../app/store";

const AlbumsPage = () => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const albums = useSelector(selectAlbums)

    return (
        <div className="min-h-full">
            <NavBarComponent />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {albums.map((album) => (
                        <article key={album.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                            {album.title}
                        </article>
                    ))}
                </div>
            </main>
        </div>)
};

export default AlbumsPage;
