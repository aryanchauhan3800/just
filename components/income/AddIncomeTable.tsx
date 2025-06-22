"use client";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { Dispatch, FC, SetStateAction, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { TrashIcon } from "@/assets/svgIcons/CustomIcons";
import { MdDragIndicator } from "react-icons/md";
import { Button } from "../ui/button";
import { Plus, Search, X } from "lucide-react";
import { CiBank } from "react-icons/ci";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RecordCombobox } from "@/components/expenses/RecordCombobox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import BankMethodDialog from "../invoice-components/bank-setup-components/BankMethodDialog";

type RowProps = {
    id: string;
    index: number;
    category: string;
    amount: number;
    removeRow: (index: number) => void;
    updateAmount: (value: number) => void;
};

const SortableRow: FC<RowProps> = ({
    amount,
    id,
    index,
    category,
    removeRow,
    updateAmount,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow className="h-[52px]" ref={setNodeRef} style={style}>
            <TableCell
                {...attributes}
                {...listeners}
                className="cursor-grab !w-12 !h-[52px] flex items-center text-[#8f8f8f]"
            >
                <MdDragIndicator className="size-4" />
                <span>
                    {index < 9 ? "0" : ""}
                    {index + 1}
                </span>
            </TableCell>
            <TableCell className="text-[#444444]">{category}</TableCell>
            <TableCell className="!w-40 text-[#444444]">
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                            updateAmount(Number.parseInt(value));
                        } else {
                            updateAmount(0);
                        }
                    }}
                    className="border-none shadow-none"
                />
            </TableCell>
            <TableCell className="!w-[60px]">
                <TrashIcon
                    onClick={() => removeRow(index)}
                    className="text-danger size-4"
                />
            </TableCell>
        </TableRow>
    );
};

export type RowData = { id: string; category: string; amount: number };

type CategoryType = {
    label: string;
    initial: boolean;
};

type AddIncomeTableProps = {
    rows: RowData[];
    setRows: Dispatch<SetStateAction<RowData[]>>;
};
const AddExpenseTable: FC<AddIncomeTableProps> = ({ rows, setRows }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const [categories, setCategories] = useState<CategoryType[]>([
        { label: "Office Supplies", initial: true },
        { label: "Repair & Maintenance", initial: true },
        { label: "Telephone & Internet Expense", initial: true },
        { label: "Transportation Expense", initial: true },
        { label: "Travel Expense", initial: true },
        { label: "Consultation Expense", initial: true },
        { label: "Advertising & Marketing", initial: true },
        { label: "Depreciation & Amortisation Expense", initial: true },
        { label: "Janitorial Expense", initial: true },
        { label: "Meals & Entertainment", initial: true },
        { label: "Printing & Stationary", initial: true },
        { label: "Output CGST", initial: true },
        { label: "Output IGST", initial: true },
        { label: "Output SGST", initial: true },
        { label: "TDS Payable", initial: true },
    ]);
    const [newCategory, setNewCategory] = useState<string>("");

    const [showAddCategoryModal, setShowAddCategoryModal] =
        useState<boolean>(false);
    const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);

    const deleteRow = (index: number) => {
        setRows((prev) => prev.filter((_, i) => i !== index));
    };

    const addCategory = (category: string) => {
        setCategories((prev) => [...prev, { label: category, initial: false }]);
        setNewCategory("");
    };

    const addRow = (category: string) => {
        const index = Number.parseInt(category);
        setRows((prev) => [
            {
                id: (prev.length + 1).toString(),
                amount: 0,
                category: categories.at(index - 1).label,
            },
            ...prev,
        ]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = rows.findIndex((item) => item.id === active.id);
            const newIndex = rows.findIndex((item) => item.id === over.id);

            const updated = [...rows];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);

            setRows(updated);
        }
    };

    return (
        <div className="overflow-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement, restrictToVerticalAxis]}
            >
                <SortableContext
                    items={rows.map((r) => r.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table>
                        <TableHeader>
                            <TableRow className="h-[56px] hover:bg-transparent">
                                <TableHead className="text-[#6B6B6B] font-normal !w-12">
                                    #
                                </TableHead>
                                <TableHead className="text-[#6B6B6B] font-normal">
                                    Income Category
                                </TableHead>
                                <TableHead className="text-[#6B6B6B] font-normal !w-40">
                                    Income Amount (₹)
                                </TableHead>
                                <TableHead className="!w-[60px]">
                                    {""}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="border-b">
                            {rows.map((row, index) => {
                                const updateAmount = (value: number) => {
                                    setRows((prev) =>
                                        prev.map((row, i) =>
                                            i === index
                                                ? {
                                                        amount: value,
                                                        category: row.category,
                                                        id: row.id,
                                                  }
                                                : row
                                        )
                                    );
                                };
                                return (
                                    <SortableRow
                                        updateAmount={updateAmount}
                                        key={index}
                                        id={row.id}
                                        index={index}
                                        category={row.category}
                                        amount={row.amount}
                                        removeRow={deleteRow}
                                    />
                                );
                            })}
                            <TableRow className="h-[52px] hover:bg-transparent">
                                <TableCell className="cursor-not-allowed !w-12 !h-[52px] flex items-center text-[#8f8f8f]">
                                    <MdDragIndicator className="size-4 opacity-70" />
                                    {rows.length < 9 ? "0" : ""}
                                    {rows.length + 1}
                                </TableCell>
                                <TableCell className="text-[#444444]">
                                    <div className="flex-1 flex justify-between gap-x-2 items-center">
                                        <RecordCombobox
                                            items={categories.map((item, i) => {
                                                return {
                                                    ...item,
                                                    id: (i + 1).toString(),
                                                };
                                            })}
                                            value={""}
                                            onChange={addRow}
                                            onCreateNew={() =>
                                                setShowAddCategoryModal(true)
                                            }
                                            popoverClassName="!w-[745px]"
                                            searchPlaceholder="Search category..."
                                            placeholder={
                                                <div className="flex gap-2 font-normal items-center text-[#B3B3B3]">
                                                    <Search className="text-[#B3B3B3]" />
                                                    Select Income Category
                                                </div>
                                            }
                                            renderItem={(item) => (
                                                <div className="flex items-center">
                                                    <span>{item.label}</span>
                                                </div>
                                            )}
                                            createNewText="New Category"
                                            triggerClassName="flex-1 border-none bg-transparent"
                                        />
                                        <Button
                                            onClick={() =>
                                                setShowAddCategoryModal(true)
                                            }
                                            className="text-brand hover:text-brand"
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <Plus />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="!w-40 text-[#444444]"></TableCell>
                                <TableCell className="!w-[60px]">
                                    <TrashIcon className="text-danger opacity-50 size-4" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="flex flex-1 py-4 justify-between gap-10">
                        {/* bank section */}
                        <div className="flex flex-1 items-center justify-between h-12">
                            <div className="flex flex-1 gap-2 items-center text-sm text-[#6B6B6B]">
                                <CiBank className="size-6" />
                                <div className="flex flex-col flex-1 items-start">
                                    <span className="text-base text-[#474747]">
                                        Select Bank Account
                                    </span>
                                    <span>
                                        Choose the bank account you are spending
                                        from
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="text-brand hover:text-brand"
                                onClick={() => setIsBankDialogOpen(true)}
                            >
                                Choose
                            </Button>
                        </div>
                        {/* total section */}
                        <div className="max-w-[480px] min-w-[480px] bg-[#FAFAFA] text-[#474747] text-sm flex flex-col gap-y-2">
                            {/* sub total */}
                            <div className="flex justify-between !h-10 items-center px-4">
                                <div>
                                    Sub Total{" "}
                                    <span className="text-[#6b6b6b]">(₹)</span>
                                </div>
                                <div className="!w-40 text-[#242424] text-end">
                                    00.00
                                </div>
                            </div>
                            {/* round off */}
                            <div className="flex justify-between !h-10 items-center px-4">
                                <div>
                                    <Checkbox /> Roundoff
                                </div>
                                <div className="!w-40 text-[#242424] text-end">
                                    00.00
                                </div>
                            </div>
                            {/* tds deducted */}
                            <div className="flex justify-between !h-10 items-center px-4">
                                <div>
                                    <Checkbox /> TDS Deducted
                                </div>
                                <div className="!w-40 text-[#242424]">
                                    <Input
                                        placeholder="Enter TDS Amount"
                                        className="placeholder:text-[#B3B3B3] placeholder:text-center bg-white text-end"
                                    />
                                </div>
                            </div>
                            {/* Total Expense Amt */}
                            <div className="flex justify-between !h-14 border-t border-t-[#E8E8E8] items-center px-4">
                                <div className="text-lg font-semibold">
                                    Total Income Amt :
                                </div>
                                <div className="!w-40 flex justify-end items-center gap-x-2 text-xl text-[#131415] font-medium text-end">
                                    <span className="text-[#6b6b6b] text-base">
                                        ₹
                                    </span>
                                    00.00
                                </div>
                            </div>
                        </div>
                    </div>
                </SortableContext>
            </DndContext>

            {/* modal */}
            <Dialog
                open={showAddCategoryModal}
                onOpenChange={setShowAddCategoryModal}
            >
                <DialogContent className="p-0 rounded-none">
                    <DialogHeader>
                        <DialogTitle className="px-6 py-4 border-b flex justify-between items-center">
                            <span>New Category</span>
                            <DialogClose asChild>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className="rounded-full"
                                >
                                    <X />
                                </Button>
                            </DialogClose>
                        </DialogTitle>
                        <DialogDescription className="px-6">
                            Add a new category for Income / Expenses
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 mt-4 px-6">
                        <span>Category :</span>
                        <Input
                            placeholder={"Eg. IT and Services"}
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="mt-6 py-4 px-6 border-t">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                className="ml-auto"
                                onClick={() => addCategory(newCategory)}
                            >
                                Add Category
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <BankMethodDialog
                open={isBankDialogOpen}
                onOpenChange={setIsBankDialogOpen}
            />
        </div>
    );
};

export default AddExpenseTable;
