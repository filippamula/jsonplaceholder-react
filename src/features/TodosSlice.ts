import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Todo from "../model/Todo";

export interface TodoState {
    todos: Todo[];
}

export interface AddTodoPayload {
    userId: number | undefined;
    title: string;
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return data;
});

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<AddTodoPayload>) => {
            if (action.payload.userId === undefined) {
                throw new Error("User ID is undefined");
            }
            const newTodo: Todo = {
                userId: action.payload.userId,
                id: Math.random(),
                title: action.payload.title,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        deleteTodo: (state: TodoState, action: PayloadAction<number>) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos.splice(index, 1);
        },
        toggleTodo: (state: TodoState, action: PayloadAction<number>) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            state.todos[index].completed = !state.todos[index].completed;
        },
    },
    extraReducers: {
        [fetchTodos.fulfilled.type]: (state, action) => {
            state.todos = action.payload;
        },
    },
});

export default todosSlice.reducer;
export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;
