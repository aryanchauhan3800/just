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
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Avatar,
    Typography,
    Box
} from '@mui/material';
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { Button } from '../ui/button'
import { ChevronRight, X } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge';
import UploadDebitInDebit from './UploadDebitInDebit';

const purchaseOrders = [
    {
        purchaseOrder: "PO-000100",
        createdOn: "12-Jan-2025",
        partyName: "Ashok Srivastav",
        avatarColor: "#FF5A5F",
        avatarInitial: "A",
        purchaseAmount: "80,000",
        purchaseStatus: "Overdue",
        sentOn: "12-Apr-2025",
        billStatus: "Billed By Party",
    },
    {
        purchaseOrder: "PO-000101",
        createdOn: "15-Jan-2025",
        partyName: "Akansha Mehra",
        avatarColor: "#00D2FF",
        avatarInitial: "A",
        purchaseAmount: "1,20,000",
        purchaseStatus: "Draft",
        sentOn: "15-Apr-2025",
        billStatus: "Billed By Party",
    },
    {
        purchaseOrder: "PO-000102",
        createdOn: "18-Jan-2025",
        partyName: "Prabir Joshi",
        avatarColor: "#32CD32",
        avatarInitial: "P",
        purchaseAmount: "95,000",
        purchaseStatus: "Accepted",
        sentOn: "18-Apr-2025",
        billStatus: "Billed By Party",
    },
    {
        purchaseOrder: "PO-000103",
        createdOn: "20-Jan-2025",
        partyName: "Balwant Singh Joshi",
        avatarColor: "#FFD700",
        avatarInitial: "B",
        purchaseAmount: "75,000",
        purchaseStatus: "Pending",
        sentOn: "20-Apr-2025",
        billStatus: "Billed by Party",
    }
];

const NewDebitNote = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
    const [showSalesModal, setShowSalesModal] = useState(false)

    const getInitials = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    const getStatusBadgeClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'accepted':
                return 'bg-green-100 text-[#22B947]';
            case 'partially delivered':
                return 'bg-green-100 text-[#22B947]';
            case 'pending':
                return 'bg-red-100 text-[#F5222D]';
            case 'rejected':
                return 'bg-red-100 text-[#F5222D]';
            case 'draft':
                return 'bg-blue-100 text-[#025AE0]'
            case 'overdue':
                return 'bg-yellow-100 text-[#FAAD14]'
        }
    };

    const handleNewSalesReturn = () => {
        onOpenChange(false)
        setShowSalesModal(true)
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
                                <CiBoxes />Debit Note
                            </DialogTitle>
                            <DialogClose
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div className='py-2 space-y-4'>
                        <p className='text-base text-[#474747] px-4'>Select a Vendor from Purchases</p>
                        <div className='px-6'>
                            <Input
                                placeholder='Search by vendor'
                                className='h-12 w-1/3 rounded-3xl italic'
                            />
                        </div>
                        <div className="px-6">
                            <Card className="border shadow-none rounded-none p-0">
                                <TableContainer component={Paper} elevation={0}>
                                    <Table sx={{ minWidth: '100%' }}>
                                        <TableHead>
                                            <TableRow sx={{ borderBottom: '1px solid #E5E7EB' }}>
                                                <TableCell />
                                                <TableCell sx={{ py: 2, pl: 2, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    # Purchase
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Created on</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 2, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Vendor</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Purchase Status</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Bill Status</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Bill Amount</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {purchaseOrders.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ px: 2, borderBottom: '1px solid #E5E7EB' }}>
                                                        <input
                                                            type="radio"
                                                            name="purchase"
                                                            checked={selectedInvoice === row.purchaseOrder + index}
                                                            onChange={() => setSelectedInvoice(row.purchaseOrder + index)}
                                                            className="w-4 h-4 accent-blue-600"
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>{row.purchaseOrder}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>{row.createdOn}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>
                                                        <Box display="flex" alignItems="center">
                                                            <Avatar
                                                                sx={{
                                                                    width: 36,
                                                                    height: 36,
                                                                    bgcolor: row.avatarColor,
                                                                    fontSize: '0.875rem',
                                                                    mr: 1.5
                                                                }}
                                                            >
                                                                {row.avatarInitial || getInitials(row.avatarInitial)}
                                                            </Avatar>
                                                            <Typography variant="body2">{row.partyName}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>
                                                        <Badge
                                                            variant="outline"
                                                            className={`px-3 pt-1.5 text-sm rounded-full ${getStatusBadgeClasses(row.purchaseStatus)}`}
                                                        >
                                                            {row.purchaseStatus}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>
                                                        <span className="text-blue-600 text-sm">{row.billStatus}</span>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>₹{row.purchaseAmount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2">
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
                            onClick={handleNewSalesReturn}
                            disabled={!selectedInvoice}
                        >
                            Create Debit Note <ChevronRight />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <UploadDebitInDebit open={showSalesModal} onOpenChange={setShowSalesModal} />
        </>
    )
}

export default NewDebitNote