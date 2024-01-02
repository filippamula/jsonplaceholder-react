import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/loggedUserSlice";
import NavBarComponent from "./NavBarComponent";
import { fetchAlbums, selectAlbums } from "../features/AlbumsSlice";
import { AppDispatch } from "../app/store";
import AlbumComponent from "./AlbumComponent";
import { fetchPhotos } from "../features/PhotosSlice";

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
        dispatch(fetchPhotos());
    }, [dispatch]);

    const albums = useSelector(selectAlbums)

    return (
        <div className="min-h-full">
            <NavBarComponent />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {albums.map((album) => (
                        <AlbumComponent key={album.id} album={album} />
                    ))}
                </div>
            </main>
        </div>)
};

export default AlbumsPage;
