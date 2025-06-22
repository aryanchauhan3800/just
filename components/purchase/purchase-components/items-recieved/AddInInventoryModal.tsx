'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { CalendarIcon, ChevronDown, X } from 'lucide-react'
import { Avatar, Paper } from '@mui/material'
import { DataGrid, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid'
import { Button } from '@/components/ui/button'
import { CiBoxes } from 'react-icons/ci'
import { Input } from '@/components/ui/input'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import UploadInvoiceVendor from './UploadInvoiceVendor';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddedToInventory } from '@/stores/useCreditNoteStore';

type ItemRow = {
    id: number
    item: string
    avatarInitial: string
    avatarColor: string
    sold: number
}

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

const AddInInventoryModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const { setItemsAdded } = useAddedToInventory()
    const [taxType, setTaxType] = useState("With Tax");
    const [invoiceDate, setInvoiceDate] = useState<Date | undefined>();
    const [showLastPanel, setShowLastPanel] = useState(false)

    const taxOptions = ["With Tax", "Without Tax"];

    const columns = [
        {
            field: 'item',
            headerName: 'Item',
            width: 300,
            renderCell: (params: GridRenderCellParams<ItemRow>) => (
                <div className='flex flex-row gap-2 items-center h-full'>
                    <Avatar sx={{
                        width: 40,
                        height: 40,
                        bgcolor: params.row.avatarColor,
                        fontSize: '1.1rem',
                        mr: 1.5,
                        borderRadius: 3,
                    }}>
                        {params.row.avatarInitial}
                    </Avatar>
                    <div className='flex flex-col mt-4'>
                        <p className='text-base text-[#474747]'>{params.row.item}</p>
                        <span className='-mt-4'>400 / PCS</span>
                    </div>
                </div>
            )
        },
        {
            field: 'order',
            headerName: 'Order QTY',
            width: 200,
            renderCell: (params: GridRenderCellParams<ItemRow>) => params.row.sold
        },
        {
            field: 'received',
            headerName: 'Received in delivery',
            width: 250,
            renderCell: () => (
                <div className='flex items-center gap-2 h-full'>
                    <Button variant="outline" className='h-8'><LuMinus className='text-blue-500' /></Button>
                    <Input className='py-4' placeholder='Qty Received' />
                    <Button variant="outline" className='h-8'><LuPlus className='text-blue-500' /></Button>
                </div>
            )
        },
        {
            field: 'rate',
            headerName: 'Purchase Rate',
            width: 250,
            renderCell: () => (
                <div className="flex items-center space-x-1 border rounded-sm pl-2 mt-2 w-fit bg-white">
                    <div className="flex items-center">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                            placeholder="Amount"
                            className="w-24 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 text-sm"
                            defaultValue={2000}
                        />
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-sm text-[#6B6B6B] rounded-none font-normal h-auto py-2 border-l bg-[#FAFAFA]"
                            >
                                {taxType}
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1 w-32">
                            {taxOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setTaxType(option)}
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded-sm"
                                >
                                    {option}
                                </button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        {
            field: 'mrp',
            headerName: 'MRP per Unit(change if you want)',
            width: 250,
            renderCell: () => (
                <div className="flex items-center space-x-1 border rounded-sm pl-2 mt-2 w-fit bg-white">
                    <div className="flex items-center">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                            placeholder="Amount"
                            className="w-24 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-1 text-sm"
                            defaultValue={2000}
                        />
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-sm text-[#6B6B6B] rounded-none font-normal h-auto py-2 border-l bg-[#FAFAFA]"
                            >
                                {taxType}
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1 w-32">
                            {taxOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setTaxType(option)}
                                    className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded-sm"
                                >
                                    {option}
                                </button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            )
        },
        {
            field: 'date',
            headerName: 'Manufacturing Date',
            width: 180,
            renderCell: () => (
                <div className='flex items-center gap-2 h-full'>
                    <DatePickerComponent date={invoiceDate} setDate={setInvoiceDate}>
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal mt-1", !invoiceDate && "text-muted-foreground")}
                        >
                            {invoiceDate ? format(invoiceDate, "PPP") : <span className='flex flex-row justify-between w-full'>Select Date <CalendarIcon /></span>}
                        </Button>
                    </DatePickerComponent>
                </div>
            )
        },
    ];

    const rows = [
        {
            id: 1,
            item: 'JimJam Biscuits',
            avatarInitial: 'J',
            avatarColor: '#ff3030',
            sold: 20
        },
        {
            id: 2,
            item: 'Dabur Chawanprash',
            avatarInitial: 'D',
            avatarColor: '#5bff3b',
            sold: 15
        },
        {
            id: 3,
            item: 'Amritanjan',
            avatarInitial: 'A',
            avatarColor: '#ff3bd9',
            sold: 10
        },
        {
            id: 4,
            item: 'Amla Hair Oil',
            avatarInitial: 'A',
            avatarColor: '#3b3dff',
            sold: 8
        },
    ];

    const handleAddToInventory = () => {
        onOpenChange(false)
        setItemsAdded(true)
        setShowLastPanel(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none min-w-6xl'
                >
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <CiBoxes />Create Batches
                            </DialogTitle>
                            <DialogClose
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div className='px-6'>
                        <p className='mb-4 text-base text-[#474747]'>Create Batches in Inventory</p>
                        <Paper sx={{ height: 400, width: 1100, boxShadow: "none" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                checkboxSelection
                                disableColumnSorting={true}
                                disableColumnMenu={true}
                                hideFooterPagination={true}
                                hideFooter={true}
                            />
                        </Paper>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2 mt-4">
                        <Button
                            variant="outline"
                            className='mr-auto'
                            type="button"
                        >
                            Cancel
                        </Button>
                        <div className='flex flex-row gap-4'>
                            <div className='flex flex-row items-center gap-2'>
                                <Checkbox />
                                <Label>All items recieved</Label>
                            </div>
                            <Button
                                variant="primary"
                                className='px-5'
                                type="button"
                                onClick={handleAddToInventory}
                            >
                                Add Items to Inventory
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <UploadInvoiceVendor open={showLastPanel} onOpenChange={setShowLastPanel} />
        </>
    )
}

export default AddInInventoryModal