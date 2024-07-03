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
import { useAddTodoMutation } from "@/redux/api/api";
import { FormEvent, useRef, useState } from "react";

export function AddTodoModal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const formRef = useRef<HTMLFormElement | null>(null);

    //! local state management
    // const dispatch = useAppDispatch();

    const [ addTodo, { isError, isLoading, isSuccess} ] = useAddTodoMutation()
    console.log(isError, isLoading, isSuccess);
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        // const randomId = Math.random().toString(36).split(".")[1];
        // const randomId = Math.random().toString(36).substring(2, 10);

        const taskData: ITodo = {
            title,
            description,
            isCompleted: false,
            priority: priority,
        };
        addTodo(taskData)
    };

    const handleValueChange = (value: string) => {
        setPriority(value);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add Task that you want to finish.
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
                            onBlur={(e) => setDescription(e.target.value)}
                            required
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Priority
                        </Label>
                        <Select onValueChange={handleValueChange}>
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
                            Add Task
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
