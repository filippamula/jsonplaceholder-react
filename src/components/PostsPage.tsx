import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/loggedUserSlice";
import { selectPosts } from "../features/PostsSlice";
import NavBarComponent from "./NavBarComponent";
import PostComponent from "./PostComponent";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { addPost } from "../features/PostsSlice";
import { Post } from "../model/Post";

const PostsPage = () => {
    const user = useSelector(selectUser).loggedUser
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [addPostError, setAddPostError] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    const handleAddPost = (event: React.FormEvent) => {
        event.preventDefault()
        try { dispatch(addPost({ userId: user?.id, title, body: content })) }
        catch (e) {

        }
    }

    const posts = useSelector(selectPosts)

    return (
        <div className="min-h-full">
            <NavBarComponent />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
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
                    {posts.map((post) => (
                        <article key={post.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                            <PostComponent post={post} />
                        </article>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default PostsPage;
