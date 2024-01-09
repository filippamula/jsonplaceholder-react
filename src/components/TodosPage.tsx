import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectTodos } from "../features/TodosSlice"
import { selectUser } from "../features/loggedUserSlice";
import { AppDispatch } from "../app/store"
import NavBarComponent from "./NavBarComponent"
import TodoComponent from "./TodoComponent"

const TodosPage = () => {
    const user = useSelector(selectUser).loggedUser
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    const todos = useSelector(selectTodos)

    return (
        <div className="min-h-full">
            <NavBarComponent />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {todos.map((todo) => (
                        <article key={todo.id} className="flex mx-auto my-10 px-5 py-3 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                            <TodoComponent todo={todo} />
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default TodosPage;
