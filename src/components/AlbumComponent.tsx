import { useDispatch, useSelector } from "react-redux";
import { Album } from "../model/Album";
import { deletePhoto, selectPhotos } from "../features/PhotosSlice";
import { selectUsers } from "../features/UsersSlice";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";
import { selectUser } from "../features/loggedUserSlice";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteAlbum } from "../features/AlbumsSlice";
import { AppDispatch } from "../app/store";
import { useState } from "react";

interface AlbumProps {
    album: Album;
}

const AlbumComponent: React.FC<AlbumProps> = ({ album }) => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()

    const photos = useSelector(selectPhotos).filter((photo) => photo.albumId === album.id)
    const users = useSelector(selectUsers)
    const [photoPath, setPhotoPath] = useState("")

    const isLoggedUserAuthor = album.userId === user?.id

    const handleDeletePost = () => {
        if (isLoggedUserAuthor) {
            dispatch(deleteAlbum(album.id))
        }
    }

    const handleDeletePhoto = (photoId: number) => {
        if (isLoggedUserAuthor) {
            dispatch(deletePhoto(photoId))
        }
    }

    const handleAddPhoto = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(photoPath)
        // dispatch(addPhoto({ albumId: album.id, title: photoPath, thumbnailUrl: photoPath }))
    }

    return (
        <article key={album.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
            <div className="flex w-full">
                <MiniUserPortfolioComponent user={users.find((user) => user.id === album.userId)!} />
                {isLoggedUserAuthor ? (<TrashIcon className="w-5 h-5 ml-auto hover:text-red-600 cursor-pointer" onClick={() => handleDeletePost()} />) : null}
            </div>
            {album.title}
            <div className="flex flex-wrap justify-center">
                {photos.map((photo) => (
                    <div>
                        <img className="max-w-full rounded-lg m-2 w-36 h-36" src={photo.thumbnailUrl} alt={photo.title} />
                        <div className="flex w-36 m-auto">
                            <div className="w-10/12">{photo.title}</div>
                            <TrashIcon className="w-5 h-5 ml-auto hover:text-red-600 cursor-pointer" onClick={() => handleDeletePhoto(photo.id)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-center w-full my-8">
                <input type="file" name="file" onChange={(i) => setPhotoPath(i.target.value)} />
                <div className="w-1/12 items-center justify-center bg-gray-300 rounded-r-lg hover:bg-gray-600">
                    <button type="submit" className="w-full h-full" onClick={handleAddPhoto}>Add photo</button>
                </div>
            </div>
        </article>
    )
}

export default AlbumComponent;
