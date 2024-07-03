import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ITodo {
    _id?: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: string;
}

export interface IInitialState {
    todos: ITodo[];
}

const initialState: IInitialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload);
        },
        // removeTodo : (state, action: PayloadAction<string>)=>{
        //     state.todos =  state.todos.filter(item=> item.id !== action.payload)
        // },
        // toggleComplete: (state, action: PayloadAction<string>)=>{
        //     const task = state.todos.find(item=> item.id == action.payload)
        //     task!.isCompleted = !task?.isCompleted
        // }
    },
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions

export default todoSlice.reducer;
