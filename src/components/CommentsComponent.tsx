import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectComments } from "../features/CommentsSlice";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { selectUsers } from "../features/UsersSlice";
import { Comment } from "../model/Comment";
import { AppDispatch } from "../app/store";
import { useEffect } from "react";

interface CommentsProps {
    postId: number;
}

const CommentsComponent: React.FC<CommentsProps> = ({postId}) => {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      dispatch(fetchComments());
    }, [dispatch]);

    const comments = useSelector(selectComments).filter(comment => comment.postId === postId)

    return(
    <ul role="list" className="divide-y divide-gray-100">
      {comments.map((comment) => (
        <li key={comment.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <UserCircleIcon className="ml-2 h-6 w-6 text-gray-300" aria-hidden="true" />
            <div className="min-w-0 flex-auto">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.email}</p>
                <p className="mt-1 font-semibold leading-6 text-gray-900">{comment.name}</p>
                <p className="text-sm text-gray-600">{comment.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    );
};

export default CommentsComponent;
