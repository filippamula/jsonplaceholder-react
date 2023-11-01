import { useSelector } from "react-redux";
import { selectPosts } from "../features/PostsSlice";
import { selectUsers } from "../features/UsersSlice";
import { UserCircleIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Collapse, Ripple, initTE } from "tw-elements";
import CommentsComponent from "./CommentsComponent";
import { Post } from "../model/Post";

interface PostsProps {
    post: Post;
}

const PostComponent :React.FC<PostsProps> = ({post}) => {
    initTE({Collapse, Ripple})

    const users = useSelector(selectUsers)

    const getUser = (id: number) => {
        let user = users.find(user => user.id === id)
        if(user !== undefined) return user
        throw new Error("User not found")
    }

    return (
        // <div className="bg-white">
        // <div className="mx-auto max-w-7xl px-6 lg:px-8">
        //   <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        //     {posts.map((post) => (
              <article key={post.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                <div className="relative flex items-center gap-x-4">
                  <UserCircleIcon className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a>
                        <span className="absolute inset-0" />
                        {getUser(post.userId).name}
                      </a>
                    </p>
                    <p className="text-gray-600">{getUser(post.userId).company.name}</p>
                  </div>
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
                <div className="ease-in-out mt-5 px-1 py-1 rounded-lg hover:bg-gray-600 hover:text-white">
                    <button
                      type="button"
                      data-te-collapse-init
                      data-te-target={"#post"+post.id+"Comments"}
                    >
                      <ChatBubbleBottomCenterTextIcon className="h-10 w-10"/>
                    </button>
                </div>
                <div className="!visible hidden w-full" id={"post"+post.id+"Comments"}
                  data-te-collapse-item
                >
                  <CommentsComponent postId={post.id}/>
                </div>
              </article>
            // ))}
      //     </div>
      //   </div>
      // </div>
    );
};

export default PostComponent;
