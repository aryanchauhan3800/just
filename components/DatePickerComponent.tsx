import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DatePickerComponent = ({ date, setDate, children }: { date?: Date, setDate: (date?: Date) => void, children: React.ReactNode }) => (
    <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <div className="p-4">
                <Label className="text-sm font-medium">Select Date</Label>
                <Input
                    type="date"
                    value={date ? date.toISOString().split('T')[0] : ''}
                    onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                    className="mt-2 w-full"
                />
            </div>
        </PopoverContent>
    </Popover>
);

export default DatePickerComponent