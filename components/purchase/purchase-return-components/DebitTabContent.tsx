import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import MarkItemReturnedModal from './MarkItemReturnedModal'
import { Card } from '@/components/ui/card'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

const columns: GridColDef[] = [
    { field: 'item', headerName: 'Items', flex: 1 },
    { field: 'qty', headerName: 'QTY', flex: 0.5, type: 'number' },
    { field: 'rate', headerName: 'Rate per Unit', flex: 0.7 },
    { field: 'tax', headerName: 'Tax', flex: 0.5 },
    { field: 'total', headerName: 'Total Amount (₹)', flex: 1 },
]

const rawRows = [
    { id: 1, item: 'JimJam Biscuits', qty: 1, rate: '10,000', tax: 100, total: '10,000' },
    { id: 2, item: 'Britannia Marie', qty: 2, rate: '5,000', tax: 120, total: '10,000' },
    { id: 3, item: 'Dabur Dant-Kranti', qty: 10, rate: '3,000', tax: 50, total: '30,000' },
    { id: 4, item: 'Vicks Vaporub', qty: 5, rate: '2,000', tax: 20, total: '10,000' },
]

const totalQty = rawRows.reduce((sum, row) => sum + row.qty, 0)
const totalAmount = rawRows.reduce((sum, row) => sum + parseInt(row.total.replace(/,/g, '')), 0)

const totalRow = {
    id: 'total-row',
    item: 'Total',
    qty: totalQty,
    rate: '',
    tax: '',
    total: totalAmount.toLocaleString(),
}

const rows = [...rawRows, totalRow]

const DebitTabContent = ({ isDebitNoteUploaded }: { isDebitNoteUploaded: boolean }) => {
    const [showCreditModal, setShowCreditModal] = useState(false)

    const handleCreateCredit = () => {
        setShowCreditModal(true)
    }

    if (isDebitNoteUploaded) {
        return (
            <div className='bg-[#FAFCFE] p-4 space-y-4'>
                <Card className='shadow-none pt-2 pb-4'>
                    <h1 className='px-4 pb-2 border-b text-[#474747] text-lg'>Amount</h1>
                    <div className='space-y-4 px-4'>
                        <div className='flex flex-row justify-between'>
                            <div className='bg-[#FAFAFA] border-l-6 border-[#8F8F8F] w-1/2 pl-4'>
                                <p className='text-[#8F8F8F] text-sm'>Debit Note Amount</p>
                                <p className='text-[#242424] text-[22px]'>60,000</p>
                            </div>
                            <Button className='bg-[#F5222D] hover:bg-[#F5222D] py-1'>
                                Pending
                            </Button>
                        </div>
                        <div className='bg-[#FAFAFA] w-1/2 pl-6'>
                            <p className='text-[#8F8F8F] text-sm flex flex-row justify-between'>
                                Settlement <span className='text-[#22B947] text-xs'>to receive</span>
                            </p>
                            <p className='text-[#242424] text-lg'>60,000</p>
                        </div>
                    </div>
                </Card>
                <Card className='shadow-none pt-2 pb-4'>
                    <h1 className='px-4 pb-2 border-b text-[#474747] text-lg'>Debit Note</h1>
                    <div className='flex flex-col space-y-6'>
                        <div>
                            pdf
                        </div>
                        <div>
                            <h1 className='px-4 pb-2 border-b text-[#474747] text-lg'>Credentials</h1>
                            <div className='flex flex-wrap px-6 space-y-2 pt-2'>
                                <div className='w-1/2 flex flex-row gap-4'>
                                    <p className='text-sm text-[#8F8F8F]'>Debit Note on:</p>
                                    <p className='text-sm text-[#242424]'>12 Apr, 2025</p>
                                </div>
                                <div className='w-1/2 flex flex-row gap-4'>
                                    <p className='text-sm text-[#8F8F8F]'>Bank Account:</p>
                                    <p className='text-sm text-[#242424]'>--</p>
                                </div>
                                <div className='w-1/2 flex flex-row gap-4'>
                                    <p className='text-sm text-[#8F8F8F]'>Payment Mode:</p>
                                    <p className='text-sm text-[#242424]'>--</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='px-4 pb-2 border-b text-[#474747] text-lg'>Items</h1>
                            <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    hideFooter
                                    disableColumnMenu
                                    disableRowSelectionOnClick
                                    getRowClassName={(params) =>
                                        params.id === 'total-row' ? 'total-row' : ''
                                    }
                                    sx={{
                                        '& .MuiDataGrid-cell': {
                                            borderBottom: 'none',
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: '#f9f9f9',
                                            fontWeight: 'bold',
                                            borderBottom: '1px solid #e0e0e0',
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <>
            <div className='w-full h-[670px] px-6 py-4 flex flex-col justify-center items-center'>
                <div className="relative w-28 h-20">
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-[#FDF9FA] to-[#F5DDE0] rounded-full z-0" />
                    <Image
                        src="/debitnote.png"
                        alt="debitnote"
                        width={40}
                        height={40}
                        className="relative z-10 mx-auto"
                    />
                </div>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <p className='text-[#474747] text-base'>Debit Note</p>
                    <p className='text-[#6B6B6B] text-sm'>Adjust the amount & upload Debit Note</p>
                    <Button
                        variant='outline'
                        className='text-[#474747] text-base'
                        onClick={handleCreateCredit}
                    >
                        Upload Debit Note<ChevronRight />
                    </Button>
                </div>
            </div>
            <MarkItemReturnedModal open={showCreditModal} onOpenChange={setShowCreditModal} />
        </>
    )
}

export default DebitTabContent
