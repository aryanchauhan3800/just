"use client";

import React, { useMemo, useEffect, FC } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@/assets/svgIcons/CustomIcons";
import { v4 as uuid } from "uuid";
import { RecordCombobox } from "./expenses/RecordCombobox";
import { Search } from "lucide-react";
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
import { MdDragIndicator } from "react-icons/md";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { BsUpcScan } from "react-icons/bs";
import { Label } from "./ui/label";
import { ProductItem } from "@/types/dashboardAndInvoiceTypes";

type SortableRowProps = {
    row: ProductItem;
    index: number;
    handleInputChange: (index: number, field: keyof ProductItem, value: any) => void;
    deleteRow: (index: number) => void;
};

const SortableProductRow: FC<SortableRowProps> = ({
    row,
    index,
    handleInputChange,
    deleteRow,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: row.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell {...attributes} {...listeners} className="cursor-grab !w-12 !h-[52px] flex items-center text-[#8f8f8f]">
                <MdDragIndicator className="size-4 mr-2" />
                <span>{index + 1}</span>
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    placeholder="Product/Service name"
                    className="border-none focus:border shadow-none w-80"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={row.rate}
                    onChange={(e) => handleInputChange(index, "rate", Number(e.target.value))}
                    className="border-none focus:border shadow-none w-30"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(index, "quantity", Number(e.target.value))}
                    className="border-none focus:border shadow-none w-30"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={row.discount}
                    onChange={(e) => handleInputChange(index, "discount", Number(e.target.value))}
                    className="border-none focus:border shadow-none w-30"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={row.cgst}
                    onChange={(e) => handleInputChange(index, "cgst", Number(e.target.value))}
                    className="border-none focus:border shadow-none w-30"
                />
            </TableCell>
            <TableCell>
                <Input
                    type="number"
                    value={row.sgst}
                    onChange={(e) => handleInputChange(index, "sgst", Number(e.target.value))}
                    className="border-none focus:border shadow-none w-30"
                />
            </TableCell>
            <TableCell className="w-50">{row.amount.toFixed(2)}</TableCell>
            <TableCell>
                <TrashIcon
                    className="text-danger size-4 cursor-pointer"
                    onClick={() => deleteRow(index)}
                />
            </TableCell>
        </TableRow>
    );
};

type NewProductTableProps = {
    rows: ProductItem[];
    setRows: (newRows: ProductItem[]) => void;
    formik: any;
    onTotalsChange?: (totals: { subTotal: number; taxAmount: number; totalInvoiceAmount: number, roundOffAmount: number, isRoundedOff: boolean, totalDiscount: number }) => void; // Original prop
};

const NewProductTable: FC<NewProductTableProps> = ({ rows, setRows, formik, onTotalsChange }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const defaultProductItem: ProductItem = {
        id: uuid(),
        name: "",
        rate: 0,
        quantity: 1,
        discount: 0,
        cgst: 0,
        sgst: 0,
        amount: 0,
        cost: 0,
    };

    useEffect(() => {
        if (!Array.isArray(rows) || rows.length === 0) {
            setRows([defaultProductItem]);
        }
    }, [rows, setRows]);

    const handleInputChange = (
        index: number,
        field: keyof ProductItem,
        value: any
    ) => {
        const currentItems = [...rows];
        const row = { ...currentItems[index], [field]: value };

        const rate = Number(row.rate) || 0;
        const quantity = Number(row.quantity) || 0;
        const discount = Number(row.discount) || 0;
        const cgst = Number(row.cgst) || 0;
        const sgst = Number(row.sgst) || 0;

        const base = rate * quantity;
        const discountAmt = base * (discount / 100);
        const taxable = base - discountAmt;
        const cgstAmt = taxable * (cgst / 100);
        const sgstAmt = taxable * (sgst / 100);
        const amount = taxable + cgstAmt + sgstAmt;

        currentItems[index] = {
            ...row,
            rate,
            quantity,
            discount,
            cgst,
            sgst,
            amount: isNaN(amount) ? 0 : amount,
        };

        setRows(currentItems);
    };

    const addRow = (productName: string = "") => {
        const newProduct: ProductItem = {
            id: uuid(),
            name: productName,
            rate: 0,
            quantity: 1,
            discount: 0,
            cgst: 0,
            sgst: 0,
            amount: 0,
            cost: 0,
        };
        setRows([...rows, newProduct]);
    };

    const deleteRow = (index: number) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = rows.findIndex((row) => row.id === active.id);
            const newIndex = rows.findIndex((row) => row.id === over?.id);

            const reorderedRows = [...rows];
            const [movedRow] = reorderedRows.splice(oldIndex, 1);
            reorderedRows.splice(newIndex, 0, movedRow);
            setRows(reorderedRows);
        }
    };

    const totals = useMemo(() => {
        const subTotal = rows.reduce((sum, row) => sum + row.amount, 0);
        const taxAmount = subTotal * 0.18;
        let totalInvoiceAmount = subTotal + taxAmount;
        let roundOffAmount = 0;
        let totalDiscount = 0;
        let discount = 0

        const isRoundedOff = formik?.values?.isRoundedOff || false;

        for (const row of rows) {
            discount = Number(row.discount)
        }

        totalDiscount = subTotal * (discount / 100)

        if (isRoundedOff) {
            const roundedTotal = Math.ceil(totalInvoiceAmount);
            roundOffAmount = roundedTotal - totalInvoiceAmount;
            totalInvoiceAmount = roundedTotal;
        }

        return {
            subTotal,
            taxAmount,
            totalInvoiceAmount,
            isRoundedOff,
            roundOffAmount,
            totalDiscount
        };
    }, [rows, formik?.values?.isRoundedOff]);

    useEffect(() => {
        if (onTotalsChange) {
            onTotalsChange({
                subTotal: totals.subTotal,
                taxAmount: totals.taxAmount,
                totalInvoiceAmount: totals.totalInvoiceAmount,
                isRoundedOff: totals.isRoundedOff,
                roundOffAmount: totals.roundOffAmount,
                totalDiscount: totals.totalDiscount
            });
        }
    }, [totals, onTotalsChange]);


    return (
        <div className="space-y-4">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement, restrictToVerticalAxis]}
            >
                <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Product / Service</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Discount %</TableHead>
                                <TableHead>CGST %</TableHead>
                                <TableHead>SGST %</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, i) => (
                                <SortableProductRow
                                    key={row.id}
                                    row={row}
                                    index={i}
                                    handleInputChange={handleInputChange}
                                    deleteRow={deleteRow}
                                />
                            ))}
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>
                                    <RecordCombobox
                                        items={[]}
                                        value={""}
                                        onChange={(v) => addRow(v)}
                                        onCreateNew={() => { addRow() }}
                                        popoverClassName="!w-[745px]"
                                        searchPlaceholder="Search product..."
                                        placeholder={
                                            <div className="flex gap-2 font-normal items-center text-[#B3B3B3]">
                                                <Search className="text-[#B3B3B3]" />
                                                Select Product/Service
                                            </div>
                                        }
                                        renderItem={(item) => (
                                            <div className="flex items-center">
                                                <span>{item.label}</span>
                                            </div>
                                        )}
                                        createNewText="New Product"
                                        triggerClassName="flex-1 border-none bg-transparent"
                                    />
                                </TableCell>
                                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                <TableCell>
                                    <TrashIcon className="text-danger opacity-50 size-4" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </SortableContext>
            </DndContext>

            {/* Totals Section */}
            <div className="flex justify-between items-start mt-4">
                <div className="flex items-center space-x-2 text-blue-700">
                    <BsUpcScan className='h-4 w-4' />
                    <Label htmlFor="scanItems" className="text-base font-normal">Scan Items (POS)</Label>
                </div>
                <div className="w-full md:w-1/3 space-y-2 p-4 bg-[#FAFAFA]">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sub Total (₹)</span>
                        <span className="text-gray-800">{totals.subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (₹)</span>
                        <span className="text-gray-800">{totals.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className='flex flex-row items-center gap-2'>
                            <Checkbox
                                checked={formik?.values?.isRoundedOff || false} // Read from Formik
                                onCheckedChange={(checked: boolean) => formik?.setFieldValue('isRoundedOff', checked)} // Write to Formik
                                id="isRoundedOff"
                            />
                            <Label htmlFor="isRoundedOff">Roundoff:</Label>
                        </span>
                        <span className="text-gray-800">{totals.roundOffAmount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                        <span className="text-[#474747]">Total Invoice Amt:</span>
                        <span className="text-indigo-600">{totals.totalInvoiceAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProductTable;