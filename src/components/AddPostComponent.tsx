import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/loggedUserSlice";
import { addPost } from "../features/PostsSlice";
import { AppDispatch } from "../app/store";

const AddPostComponent = () => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [addPostError, setAddPostError] = useState(false)

    const handleAddPost = (event: React.FormEvent) => {
        event.preventDefault()
        try { dispatch(addPost({ userId: user?.id, title, body: content })) }
        catch (e) {
            setAddPostError(true)
        }
    }

    return (
        <div>
            <div className='text-red-700 leading-4 mt-1 text-right'>{addPostError && 'Adding post error'}</div>
            <article className="flex mx-auto mt-2 mb-10 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                <form className="ring-1 ring-inset ring-gray-300 rounded-lg w-full" onSubmit={event => handleAddPost(event)}>
                    <div className="flex w-full">
                        <div className="w-11/12 p-1">
                            <input type="text" className="w-full border-b border-gray-300" placeholder="Title" onChange={(i) => setTitle(i.target.value)} />
                            <textarea className="w-full h-20" placeholder="Content" onChange={(i) => setContent(i.target.value)} />
                        </div>
                        <div className="w-1/12 min-h-max items-center justify-center bg-gray-300 rounded-r-lg hover:bg-gray-600">
                            <button type="submit" className="w-full h-full">Add</button>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    );
}

export default AddPostComponent;
