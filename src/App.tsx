import { ModeToggle } from "@/components/mode-toggle";
import Container from "@/components/ui/container";
import Todo from "@/pages/Todo";

function App() {
    return (
        <Container>
            <div className="flex justify-between py-5">
                <h3 className="text-2xl font-medium">Todo App</h3>
                <ModeToggle />
            </div>
            <Todo />
        </Container>
    );
}

export default App;
