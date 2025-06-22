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
import { CiBoxes } from 'react-icons/ci'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, Paper } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { IoMdEye } from 'react-icons/io'
import { Input } from '../ui/input'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { Checkbox } from '../ui/checkbox'
import { ItemRow } from '@/types/salesReturnTypes'
import ReasonForPurchaseReturn from './ReasonForPurchaseReturn'

const ItemsReturnModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [taxType, setTaxType] = useState("With Tax");
    const [showReasonReturnModal, setShowReasonReturnModal] = useState(false)

    const taxOptions = ["With Tax", "Without Tax"];

    const handleConfirmReturnNext = () => {
        onOpenChange(false)
        setShowReasonReturnModal(true)
    }

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
            field: 'sold',
            headerName: 'Originally Ordered',
            width: 180,
            renderCell: (params: GridRenderCellParams<ItemRow>) => params.row.sold
        },
        {
            field: 'return',
            headerName: 'Return Units',
            width: 250,
            renderCell: () => (
                <div className='flex items-center gap-2 h-full'>
                    <Button variant="outline" className='h-8'><LuMinus className='text-blue-500' /></Button>
                    <Input className='py-4' placeholder='Qty Returned' />
                    <Button variant="outline" className='h-8'><LuPlus className='text-blue-500' /></Button>
                </div>
            )
        },
        {
            field: 'cost',
            headerName: 'Cost Price per Unit',
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

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none min-w-5xl'
                >
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <CiBoxes />Return purchased items
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
                        <div className='flex flex-row justify-between'>
                            <p className='mb-4 text-base text-[#474747]'>
                                List of items sold to
                                <span className='text-[#242424] mx-1'>Ashok Srivastav</span>
                                - invoice number
                                <span className='text-[#242424] ml-1'>INV-000100</span>
                            </p>
                            <p className='text-base text-[#474747]'>Purchase date <span className='text-[#242424]'>14 May, 2025</span></p>
                        </div>
                        <Paper sx={{ height: 400, width: 975, boxShadow: "none" }}>
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

                    <div className='border-t px-6 py-4 w-full pl-52'>
                        <div className='grid grid-cols-2 bg-[#FAFAFA] border border-[#E8E8E8] mx-auto'>
                            <div className='flex flex-col justify-between py-2 px-6'>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='text-[#474747]'>Sub Total <span className='text-[#6B6B6B]'>(₹)</span></p>
                                    <p className='text-[#242424]'>700000.00</p>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='text-[#474747]'>Tax <span className='text-[#6B6B6B]'>(₹)</span></p>
                                    <p className='text-[#6B6B6B]'>700000.00</p>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='flex items-center gap-2 text-[#474747]'><Checkbox />Roundoff</p>
                                    <p className='text-[text-[#242424]]'>700000.00</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between border-l'>
                                <div className='flex flex-row justify-between px-4 py-3 gap-6'>
                                    <p className='text-[#474747] text-lg'>Value of Items returned</p>
                                    <p className='text-[#242424] text-xl'><span className='text-[#7F7B78] text-base'>₹</span> 70,000</p>
                                </div>
                                <div className='flex flex-row justify-between px-4 py-3 border-t gap-6'>
                                    <p className='text-[#474747] text-lg'>Adjustment Amt <span className='text-xs'>to recieve</span></p>
                                    <p className='text-[#242424] text-xl'><span className='text-[#7F7B78] text-base'>₹</span> 10,000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2 -mt-4">
                        <Button
                            variant="outline"
                            className='mr-auto'
                            type="button"
                        >
                            Cancel
                        </Button>
                        <div className='flex flex-row items-center gap-4'>
                            <p className='flex items-center gap-2 text-base text-[#242424]'><Checkbox />All items returned</p>
                            <Button
                                variant="primary"
                                className='px-5'
                                type="button"
                                onClick={handleConfirmReturnNext}
                            >
                                Create Purchase Return <ChevronRight />
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ReasonForPurchaseReturn open={showReasonReturnModal} onOpenChange={setShowReasonReturnModal} />
        </>
    )
}

export default ItemsReturnModal