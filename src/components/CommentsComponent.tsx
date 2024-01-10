import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchComments, selectComments } from "../features/CommentsSlice";
import { TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { AppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { selectUser } from "../features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import { addComment } from "../features/CommentsSlice";

interface CommentsProps {
  postId: number;
}

const CommentsComponent: React.FC<CommentsProps> = ({ postId }) => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector(selectUser).loggedUser

  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [addCommentError, setAddCommentError] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  })

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault()
    try { dispatch(addComment({ postId, title, email: user?.email, comment })) }
    catch (e) {
      setAddCommentError(true)
      setTimeout(() => {
        navigate("/")
      }, 5000);
    }
  }

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id))
  }

  const comments = useSelector(selectComments).filter(comment => comment.postId === postId)

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {comments.map((comment) => (
          <li key={comment.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <UserCircleIcon className="ml-2 h-6 w-6 text-gray-300" aria-hidden="true" />
              <div className="min-w-0 flex-auto overflow-clip">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.email}</p>
                <p className="mt-1 font-semibold leading-6 text-gray-900">{comment.name}</p>
                <p className="text-sm text-gray-600">{comment.body}</p>
              </div>
            </div>
            {user?.email === comment.email ? (<TrashIcon className="w-5 h-5 ml-auto hover:text-red-600 cursor-pointer" onClick={() => handleDeleteComment(comment.id)} />) : null}
          </li>
        ))}
      </ul>
      <form className="ring-1 ring-inset ring-gray-300 rounded-lg w-full" onSubmit={event => handleAddComment(event)}>
        <div className="flex">
          <div className="w-11/12 p-1">
            <input type="text" className="w-full border-b border-gray-300" placeholder="Title" onChange={(i) => setTitle(i.target.value)} />
            <input type="text" className="w-full" placeholder="Comment" onChange={(i) => setComment(i.target.value)} />
          </div>
          <div className="w-1/12 min-h-max items-center justify-center bg-gray-300 rounded-r-lg hover:bg-gray-600">
            <button type="submit" className="w-full h-full">Add</button>
          </div>
        </div>
      </form>
      <div className='text-red-700 leading-4 mt-1 text-right'>{addCommentError && 'Adding comment error'}</div>
    </div >
  );
};

export default CommentsComponent;
