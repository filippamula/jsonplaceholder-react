import { useSelector } from "react-redux";
import { selectUsers } from "../features/UsersSlice";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Collapse, Ripple, initTE } from "tw-elements";
import CommentsComponent from "./CommentsComponent";
import { Post } from "../model/Post";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";

interface PostsProps {
  post: Post;
}

const PostComponent: React.FC<PostsProps> = ({ post }) => {
  initTE({ Collapse, Ripple })

  const users = useSelector(selectUsers)

  const getUser = (id: number) => {
    let user = users.find(user => user.id === id)
    if (user !== undefined) return user
    throw new Error("User not found")
  }

  return (
    <div>
      <MiniUserPortfolioComponent user={getUser(post.userId)} />
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
