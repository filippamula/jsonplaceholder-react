import { useSelector } from "react-redux";
import Todo from "../model/Todo";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";
import { selectUsers } from "../features/UsersSlice";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface TodoProps {
    todo: Todo;
}

const TodoComponent: React.FC<TodoProps> = ({ todo }) => {

    const user = useSelector(selectUsers)

    return (
        <div>
            <MiniUserPortfolioComponent user={user.find((user) => user.id === todo.userId)!} />
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    <a>
                        <span className="absolute inset-0" />
                        {todo.title}
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {
                        todo.completed
                            ? <CheckCircleIcon className="h-10 w-10 text-green-500" />
                            : <XCircleIcon className="h-10 w-10 text-red-500" />
                    }
                </p>
            </div>
        </div>
    );
};

export default TodoComponent;
