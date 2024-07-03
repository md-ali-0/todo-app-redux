import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ITodo } from "@/redux/features/todoSlice";
// import { useAppDispatch } from "@/redux/hooks";
import { useUpdateTodoMutation } from "@/redux/api/api";
import { LucidePencil } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

interface UpdateTodoProps {
    todo: {
        id: string;
        title: string;
        description: string;
        isCompleted: boolean;
        priority: string;
    };
}

export function UpdateTodo({ todo }: UpdateTodoProps) {
    const [id,] = useState(todo.id);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const formRef = useRef<HTMLFormElement | null>(null);

    const [updateTodo] = useUpdateTodoMutation();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data: ITodo = {
            title,
            description,
            isCompleted: false,
            priority: priority,
        };

        updateTodo({ id, data });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-400" variant={"default"} size="sm">
                    <LucidePencil className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogDescription>
                        Update Task that you want to finish.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={onSubmit}
                    className="grid gap-4 py-4"
                    ref={formRef}
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            defaultValue={title}
                            onBlur={(e) => setTitle(e.target.value)}
                            required
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            defaultValue={description}
                            onBlur={(e) => setDescription(e.target.value)}
                            required
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Priority
                        </Label>
                        <Select
                            onValueChange={(value) => setPriority(value)}
                            defaultValue={priority}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Priority</SelectLabel>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                if (formRef.current) {
                                    formRef.current.requestSubmit();
                                }
                            }}
                            type="submit"
                        >
                            Update Task
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
