import { Button } from "@/components/ui/button";
import { useRemoveTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { CircleX } from "lucide-react";
import { UpdateTodo } from "./updateTodo";

interface ITodoCardProps {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    priority: string;
}

const TodoCard = ({
    id,
    title,
    description,
    isCompleted,
    priority,
}: ITodoCardProps) => {
    // const dispatch = useAppDispatch();

    const [removeTodo] = useRemoveTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    
    const toggleStatus = () => {
        const data = {
            title,
            description,
            isCompleted: !isCompleted,
            priority: priority,
        };
        updateTodo({ id, data });
        // dispatch(toggleComplete(id));
    };

    return (
        <div className="flex justify-between items-center border-t border-b px-2.5 py-1.5 gap-5 my-1.5">
            <input
                type="checkbox"
                name="isCompleted"
                id="isCompleted"
                defaultChecked={isCompleted}
                onChange={toggleStatus}
            />
            <h3 className="font-semibold flex-1">{title}</h3>
            <div className="flex items-center flex-1 gap-2">
                <div
                    className={`${priority === "high" && "bg-red-500"} ${
                        priority === "low" && "bg-green-500"
                    } ${
                        priority === "medium" && "bg-amber-500"
                    } rounded-full size-2`}
                ></div>
                <p className="capitalize">{priority}</p>
            </div>
            <div className="text-sm text-white flex-1">
                {isCompleted ? (
                    <span className="bg-green-600 rounded-md px-1 py-0.5">
                        Done
                    </span>
                ) : (
                    <span className="bg-amber-500 rounded-md px-1 py-0.5">
                        Pending
                    </span>
                )}
            </div>
            <p className="text-sm flex-[2]">{description}</p>
            <div className="flex gap-2">
                <UpdateTodo
                    todo={{ id, title, description, isCompleted, priority }}
                />
                <Button
                    onClick={() => removeTodo(id)}
                    className="bg-red-600"
                    variant={"default"}
                    size="sm"
                >
                    <CircleX className="size-4" />
                </Button>
            </div>
        </div>
    );
};

export default TodoCard;
