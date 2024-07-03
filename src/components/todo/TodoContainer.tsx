// import { useAppSelector } from "@/redux/hooks";
import { useGetTodosQuery } from "@/redux/api/api";
import { ITodo } from "@/redux/features/todoSlice";
import { Key, useState } from "react";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";
import { AddTodoModal } from "./addTodoModal";

const TodoContainer = () => {
    // const { todos } = useAppSelector((state) => state.todo);
    const [filterValue, setFilterValue] = useState("")
    const { data: todos, isLoading } = useGetTodosQuery(filterValue)

    if (isLoading) {
        return <p>Loading</p>
    }
    console.log(todos);
    
    return (
        <div className="px-2.5 py-3.5 border rounded-md">
            <div className="flex gap-3">
                <AddTodoModal />
                <TodoFilter filterValue={filterValue} setFilterValue={setFilterValue}/>
            </div>
            {/* <div>
                <h3 className="text-sm text-center py-1.5">There is not Task Pending</h3>
            </div> */}
            {todos?.data.map((todo: ITodo, idx: Key | null | undefined) => (
                <TodoCard
                    key={idx}
                    id={todo._id as string}
                    title={todo.title}
                    description={todo.description}
                    isCompleted={todo.isCompleted}
                    priority={todo.priority}
                />
            ))}
        </div>
    );
};

export default TodoContainer;
