import { useSelector } from "react-redux";
import { Album } from "../model/Album";
import { selectPhotos } from "../features/PhotosSlice";
import { selectUsers } from "../features/UsersSlice";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";

interface AlbumProps {
    album: Album;
}

const AlbumComponent: React.FC<AlbumProps> = ({ album }) => {

    const photos = useSelector(selectPhotos).filter((photo) => photo.albumId === album.id)
    const user = useSelector(selectUsers)


    return (
        <article key={album.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
            <MiniUserPortfolioComponent user={user.find((user) => user.id === album.userId)!} />
            {album.title}
            <div className="flex flex-wrap justify-center">
                {photos.map((photo) => (
                    <img className="h-auto max-w-full rounded-lg m-2" src={photo.thumbnailUrl} alt={photo.title} />
                ))}
            </div>
        </article>
    )
}

export default AlbumComponent;
