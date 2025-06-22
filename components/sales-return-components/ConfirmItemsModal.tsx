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
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { CiBoxes } from 'react-icons/ci'
import { ChevronRight, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, Paper } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { IoMdEye } from 'react-icons/io'
import { Input } from '../ui/input'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { Checkbox } from '../ui/checkbox'
import ReasonForReturnModal from './ReasonForReturnModal'
import { ItemRow } from '@/types/salesReturnTypes'

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
        headerName: 'Sold QTY',
        width: 280,
        renderCell: (params: GridRenderCellParams<ItemRow>) => params.row.sold
    },
    {
        field: 'returned',
        headerName: 'Returned by Customer',
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
        field: 'show',
        headerName: '',
        width: 100,
        renderCell: () => (
            <span className='flex justify-center items-center h-full'>
                <IoMdEye />
            </span>
        )
    }
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

const ConfirmItemsModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [showReasonReturnModal, setShowReasonReturnModal] = useState(false)

    const handleConfirmReturnNext = () => {
        onOpenChange(false)
        setShowReasonReturnModal(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none min-w-5xl'
                >
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <CiBoxes />Confirm Items Returned
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
                        <p className='mb-4 text-base text-[#474747]'>List of items sold to <span className='text-[#242424]'>Ashok Srivastav</span> - invoice number <span className='text-[#242424]'>INV-000100</span></p>
                        <Paper sx={{ height: 400, width: 975 }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                checkboxSelection
                                disableColumnSorting={true}
                                disableColumnMenu={true}
                                hideFooterPagination={true}
                                hideFooter={true}
                                sx={{ border: 0 }}
                            />
                        </Paper>
                    </div>

                    <div className='border-t px-6 py-4 w-full pl-52'>
                        <div className='flex flex-row justify-end gap-6 bg-[#FAFAFA] border border-[#E8E8E8] mx-auto'>
                            <div className='flex flex-col justify-between py-2 w-1/3'>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='text-[#474747]'>Sub Total</p>
                                    <p className='text-[#242424]'>700000.00</p>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='text-[#474747]'>Sub Total</p>
                                    <p className='text-[#6B6B6B]'>700000.00</p>
                                </div>
                                <div className='flex flex-row justify-between text-sm'>
                                    <p className='flex items-center'><Checkbox />Roundoff</p>
                                    <p className='text-[text-[#242424]]'>700000.00</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between border-l'>
                                <div className='flex flex-row justify-between px-4 py-3 gap-6'>
                                    <p className='text-[#474747] text-lg'>Value of Returned Goods</p>
                                    <p className='text-[#242424] text-xl'>70,000</p>
                                </div>
                                <div className='flex flex-row justify-between px-4 py-3 border-t gap-6'>
                                    <p className='text-[#474747] text-lg'>Adjustment Amt <span className='text-xs'>to recieve</span></p>
                                    <p className='text-[#242424] text-xl'>10,000</p>
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
                        <Button
                            variant="primary"
                            className='px-5'
                            type="button"
                            onClick={handleConfirmReturnNext}
                        >
                            Confirm Sales Return <ChevronRight />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ReasonForReturnModal open={showReasonReturnModal} onOpenChange={setShowReasonReturnModal} />
        </>
    )
}

export default ConfirmItemsModal