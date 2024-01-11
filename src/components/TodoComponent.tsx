import { useDispatch, useSelector } from "react-redux";
import Todo from "../model/Todo";
import MiniUserPortfolioComponent from "./MiniUserPortfolioComponent";
import { selectUsers } from "../features/UsersSlice";
import { CheckCircleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AppDispatch } from "../app/store";
import { selectUser } from "../features/loggedUserSlice";
import { deleteTodo, toggleTodo } from "../features/TodosSlice";

interface TodoProps {
    todo: Todo;
}

const TodoComponent: React.FC<TodoProps> = ({ todo }) => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()

    const users = useSelector(selectUsers)
    const isLoggedUserAuthor = todo.userId === user?.id

    const handleDeleteTodo = () => {
        if (isLoggedUserAuthor) {
            dispatch(deleteTodo(todo.id))
        }
    }

    const handleToggleTodo = () => {
        console.log("handleToggleTodo")
        if (isLoggedUserAuthor) {
            dispatch(toggleTodo(todo.id))
        }
    }

    return (
        <div className="w-full">
            <div className="flex w-full">
                <MiniUserPortfolioComponent user={users.find((user) => user.id === todo.userId)!} />
                {isLoggedUserAuthor ? (<TrashIcon className="w-5 h-5 ml-auto hover:text-red-600 cursor-pointer" onClick={handleDeleteTodo} />) : null}
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    <a>
                        <span className="inset-0" />
                        {todo.title}
                    </a>
                </h3>
                {
                    todo.completed
                        ? (<CheckCircleIcon className="h-10 w-10 text-green-500 cursor-pointer" onClick={handleToggleTodo} />)
                        : (<XCircleIcon className="h-10 w-10 text-red-500 cursor-pointer" onClick={handleToggleTodo} />)
                }
            </div>
        </div >
    );
};

export default TodoComponent;
