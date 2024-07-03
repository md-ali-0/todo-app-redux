
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface TodoFilterProps {
    filterValue: string
    setFilterValue : (value: string)=> void
}
export function TodoFilter({filterValue, setFilterValue} : TodoFilterProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={filterValue}
                    onValueChange={setFilterValue}
                >
                    <DropdownMenuRadioItem value="high">
                        High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medium">
                        Medium
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="low">
                        Low
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
