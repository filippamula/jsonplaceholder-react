import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/loggedUserSlice";
import { AppDispatch } from "../app/store";
import { addTodo } from "../features/TodosSlice";

const AddTodoComponent = () => {
    const user = useSelector(selectUser).loggedUser
    const dispatch = useDispatch<AppDispatch>()

    const [title, setTitle] = useState("")
    const [addTodoError, setAddTodoError] = useState(false)

    const handleAddTodo = (event: React.FormEvent) => {
        event.preventDefault()
        try { dispatch(addTodo({ userId: user?.id, title })) }
        catch (e) {
            setAddTodoError(true)
        }
    }

    return (
        <div>
            <div className='text-red-700 leading-4 mt-1 text-right'>{addTodoError && 'Adding todo error'}</div>
            <article className="flex mx-auto mt-2 mb-10 flex-col items-start justify-between shadow-lg ring-1 ring-inset ring-gray-300 rounded-lg">
                <form className="ring-1 ring-inset ring-gray-300 rounded-lg w-full" onSubmit={event => handleAddTodo(event)}>
                    <div className="flex w-full">
                        <div className="w-11/12 p-1">
                            <input type="text" className="w-full" placeholder="Todo" onChange={(i) => setTitle(i.target.value)} />
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

export default AddTodoComponent;
