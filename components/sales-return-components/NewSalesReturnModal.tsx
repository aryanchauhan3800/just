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
import { Invoice, InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { Button } from '../ui/button'
import { ChevronRight, X } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge';
import SalesReturnModal from './SalesReturnModal';

const invoices: Invoice[] = [
    {
        invoiceNumber: "INV-000100",
        name: "Ashok Srivastav",
        avatarColor: "#FF5A5F",
        avatarInitial: "A",
        createdOn: "12-Jan-2025",
        invoiceAmount: "80,000",
        dueAmount: "24,000",
        dueDate: "12-Apr-2025",
        status: "Overdue"
    },
    {
        invoiceNumber: "INV-000101",
        name: "Akansha Mehra",
        avatarColor: "#00D2FF",
        avatarInitial: "A",
        createdOn: "15-Jan-2025",
        invoiceAmount: "1,20,000",
        dueAmount: "50,000",
        dueDate: "15-Apr-2025",
        status: "Partially Paid"
    },
    {
        invoiceNumber: "INV-000102",
        name: "Prabir Joshi",
        avatarColor: "#32CD32",
        avatarInitial: "P",
        createdOn: "18-Jan-2025",
        invoiceAmount: "95,000",
        dueAmount: "0",
        dueDate: "18-Apr-2025",
        status: "Paid"
    },
    {
        invoiceNumber: "INV-000103",
        name: "Balwant Singh Joshi",
        avatarColor: "#FFD700",
        avatarInitial: "B",
        createdOn: "20-Jan-2025",
        invoiceAmount: "75,000",
        dueAmount: "75,000",
        dueDate: "20-Apr-2025",
        status: "Due"
    },
    {
        invoiceNumber: "INV-000103",
        name: "Balwant Singh Joshi",
        avatarColor: "#FFD700",
        avatarInitial: "B",
        createdOn: "20-Jan-2025",
        invoiceAmount: "75,000",
        dueAmount: "75,000",
        dueDate: "20-Apr-2025",
        status: "Due"
    },
];

const NewSalesReturnModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
    const [showSalesModal, setShowSalesModal] = useState(false)

    const getInitials = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    const getStatusBadgeClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-[#22B947]';
            case 'partially paid':
                return 'bg-yellow-100 text-[#FAAD14]';
            case 'due':
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
                                <CiBoxes />Sales Return
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
                        <p className='text-base text-[#474747] px-4'>Select an Invoice to return</p>
                        <div className='px-6'>
                            <Input
                                placeholder='Search by customer or inovice number'
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
                                                <TableCell sx={{ py: 2, pl: 3, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    # Invoice
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Client / Company</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Created on</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Invoice Amount</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Due Amount</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Due Date</span>
                                                </TableCell>
                                                <TableCell sx={{ py: 2, px: 0, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                                    <span className="border-l-2 px-3">Status</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {invoices.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ px: 2, borderBottom: '1px solid #E5E7EB' }}>
                                                        <input
                                                            type="radio"
                                                            name="invoice"
                                                            checked={selectedInvoice === row.invoiceNumber + index}
                                                            onChange={() => setSelectedInvoice(row.invoiceNumber + index)}
                                                            className="w-4 h-4 accent-blue-600"
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>{row.invoiceNumber}</TableCell>
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
                                                                {row.avatarInitial || getInitials(row.name)}
                                                            </Avatar>
                                                            <Typography variant="body2">{row.name}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>{row.createdOn}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>₹{row.invoiceAmount}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>₹{row.dueAmount}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>{row.dueDate}</TableCell>
                                                    <TableCell sx={{ py: 1, px: 2 }}>
                                                        <Badge
                                                            variant="outline"
                                                            className={`px-3 pt-1.5 text-sm rounded-full ${getStatusBadgeClasses(row.status)}`}
                                                        >
                                                            {row.status}
                                                        </Badge>
                                                    </TableCell>
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
                        >
                            Record Sales Return <ChevronRight />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <SalesReturnModal open={showSalesModal} onOpenChange={setShowSalesModal} />
        </>
    )
}

export default NewSalesReturnModal