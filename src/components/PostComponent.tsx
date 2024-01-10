import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../features/UsersSlice";
import { ChatBubbleBottomCenterTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Collapse, Ripple, initTE } from "tw-elements";
import CommentsComponent from "./CommentsComponent";
import { Post } from "../model/Post";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";
import { selectUser } from "../features/loggedUserSlice";
import { AppDispatch } from "../app/store";
import { deletePost } from "../features/PostsSlice";

interface PostsProps {
  post: Post;
}

const PostComponent: React.FC<PostsProps> = ({ post }) => {
  initTE({ Collapse, Ripple })
  const user = useSelector(selectUser).loggedUser
  const dispatch = useDispatch<AppDispatch>()

  const users = useSelector(selectUsers)
  const isLoggedUserAuthor = post.userId === user?.id

  const getUser = (id: number) => {
    let user = users.find(user => user.id === id)
    if (user !== undefined) return user
    throw new Error("User not found")
  }

  const handleDeletePost = () => {
    if (isLoggedUserAuthor) {
      dispatch(deletePost(post.id))
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full">
        <MiniUserPortfolioComponent user={getUser(post.userId)} />
        {isLoggedUserAuthor ? (<TrashIcon className="w-5 h-5 ml-auto hover:text-red-600 cursor-pointer" onClick={() => handleDeletePost()} />) : null}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
          <a>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.body}
        </p>
      </div>
      <div className="w-fit ease-in-out mt-5 px-1 py-1 rounded-lg hover:bg-gray-600 hover:text-white">
        <button
          type="button"
          data-te-collapse-init
          data-te-target={"#post" + post.id + "Comments"}
        >
          <ChatBubbleBottomCenterTextIcon className="h-10 w-10" />
        </button>
      </div>
      <div className="!visible hidden w-full" id={"post" + post.id + "Comments"}
        data-te-collapse-item
      >
        <CommentsComponent postId={post.id} />
      </div>
    </div>
  );
};

export default PostComponent;
