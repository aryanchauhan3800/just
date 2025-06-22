'use client'

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, InputBase } from '@mui/material';
import { FiEdit, FiFilter, FiSearch } from 'react-icons/fi';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BiReceipt, BiSort } from 'react-icons/bi';
import { CiCalendar } from 'react-icons/ci';
import { MdCurrencyRupee } from 'react-icons/md';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import clsx from 'clsx';
import PurchaseReturnFilter from './PurchaseReturnFilter';
import { MoreVertical } from 'lucide-react';
import { IconType } from 'react-icons';
import { IoMdEye } from 'react-icons/io';
import { RxTrash } from 'react-icons/rx';

type MenuOption = {
    label: string;
    icon: IconType;
    action: string;
    color: string
};

type PurchaseReturn = {
    purchaseReturn: string;
    createdOn: string;
    partyName: string;
    avatarColor: string
    avatarInitial: string
    returnAmount: string
    itemStatus: string
    returnedOn: string
    debitNote: string
}

const getMenuOptionsByStatus = (status: string): MenuOption[] => {
    switch (status) {
        case 'Not Returned':
            return [
                { label: 'View Purchase Return', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Create Debit Note', icon: BiReceipt, action: 'viewInvoice', color: "text-[#474747]" },
                { label: 'Edit Purchase Return', icon: FiEdit, action: 'edit', color: "text-[#474747]" },
                { label: 'Cancel Purchase Return', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
        case 'Returned':
            return [
                { label: 'View Purchase Return', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'View Debit Note', icon: BiReceipt, action: 'uploadInvoice', color: "text-[#474747]" },
                { label: 'Delete Purchase Return', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
    }
};

type ActionMenuProps = {
    status: string;
    row: PurchaseReturn
}

const ActionMenu = ({ status, row }: ActionMenuProps) => {
    const options = getMenuOptionsByStatus(status);

    const handleSelect = (action: string) => {
        console.log(`Action "${action}" selected for PO ${row.purchaseReturn}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='rounded-full mt-2'>
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className='text-[#6B6B6B] text-lg'>
                    Action
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.map((option, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => handleSelect(option.action)}
                        className={`text-base ${option.color}`}
                    >
                        <option.icon className={`w-5 h-5 ${option.color}`} />
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const purchaseReturn = [
    {
        purchaseReturn: "PR-000100",
        createdOn: "12-Jan-2025",
        partyName: "Ashok Srivastav",
        avatarColor: "#FF5A5F",
        avatarInitial: "A",
        returnAmount: "80,000",
        itemStatus: "Returned",
        returnedOn: "12-Apr-2025",
        debitNote: "Debit Note Created",
    },
    {
        purchaseReturn: "PR-000101",
        createdOn: "15-Jan-2025",
        partyName: "Akansha Mehra",
        avatarColor: "#00D2FF",
        avatarInitial: "A",
        returnAmount: "1,20,000",
        itemStatus: "Not Returned",
        returnedOn: "15-Apr-2025",
        debitNote: "Debit Note Created",
    },
    {
        purchaseReturn: "PR-000102",
        createdOn: "18-Jan-2025",
        partyName: "Prabir Joshi",
        avatarColor: "#32CD32",
        avatarInitial: "P",
        returnAmount: "95,000",
        itemStatus: "Returned",
        returnedOn: "18-Apr-2025",
        debitNote: "Debit Note Created",
    },
    {
        purchaseReturn: "PR-000103",
        createdOn: "20-Jan-2025",
        partyName: "Balwant Singh Joshi",
        avatarColor: "#FFD700",
        avatarInitial: "B",
        returnAmount: "75,000",
        itemStatus: "Not Returned",
        returnedOn: "20-Apr-2025",
        debitNote: "Debit Note Created",
    }
];

const statusClasses = {
    'Not Returned': "bg-red-100 text-[#F5222D]",
    Returned: "bg-green-100 text-[#22B947]",
};

const columns: GridColDef[] = [
    {
        field: 'purchaseReturn',
        headerName: '# Purchase Return',
        flex: 1,
        renderCell: (params) => {
            const orderId = params.value;
            return (
                <a
                    href={`/purchase-return/view`}
                    className="text-blue-600 hover:underline font-medium"
                >
                    {orderId}
                </a>
            );
        }
    },
    { field: 'createdOn', headerName: 'Created On', flex: 1 },
    {
        field: 'partyName',
        headerName: 'Party Name',
        flex: 1.5,
        renderCell: (params) => (
            <Box display="flex" alignItems="center" gap={1}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: params.row.avatarColor,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: 14,
                    }}
                >
                    {params.row.avatarInitial}
                </Box>
                {params.row.partyName}
            </Box>
        ),
    },
    { field: 'returnAmount', headerName: 'Return Amt', flex: 1 },
    {
        field: 'itemStatus',
        headerName: 'Item Status',
        flex: 1,
        renderCell: (params) => {
            const status = params.value;
            const className = statusClasses[status] || "bg-gray-200 text-gray-700";

            return <Badge className={clsx(className, "rounded-full px-2 py-1 text-sm font-medium")}>{status}</Badge>;
        }
    },
    { field: 'returnedOn', headerName: 'Returned On', flex: 1 },
    { field: 'debitNote', headerName: 'Debit Note', flex: 1 },
    {
        field: 'actions',
        headerName: '',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <ActionMenu status={params.row.itemStatus} row={params.row} />
        }
    }
];

export default function PurchaseReturnTable() {
    const [searchText, setSearchText] = useState('');
    const [showPanel, setShowPanel] = useState(false)
    const [filters, setFilters] = useState({
        statuses: [],
        dateRange: null,         // e.g., { from: Date, to: Date }
        amountRange: null,       // e.g., "showAll", "lessThan", "10000"
        withDebitNote: false     // boolean
    });

    const filteredRows = purchaseReturn.filter((order) => {
        const matchName = order.partyName.toLowerCase().includes(searchText.toLowerCase());

        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.itemStatus);

        const matchDebitNote = !filters.withDebitNote || order.debitNote === "Debit Note Created";

        const matchAmount = (() => {
            if (!filters.amountRange) return true;
            const amount = order.returnAmount || 0; // adapt based on your data
            if (filters.amountRange === "lessThan") return Number(amount) < 10000;
            if (filters.amountRange === "10000") return Number(amount) >= 10000 && Number(amount) <= 49999;
            return true;
        })();

        const matchDateRange = (() => {
            if (!filters.dateRange) return true;
            const returnDate = new Date(order.returnedOn); // or the correct field
            const now = new Date();
            if (filters.dateRange === "week") {
                const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
                return returnDate >= sevenDaysAgo;
            }
            return true;
        })();

        return matchName && matchStatus && matchDebitNote && matchAmount && matchDateRange;
    });



    const handleFilterPanel = () => {
        setShowPanel(true)
    }

    return (
        <>
            <Card className='rounded-none border-none shadow-none mt-2'>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                    <InputBase
                        placeholder="Search by Party name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        startAdornment={<FiSearch className='mx-1 h-3.5 w-3.5 text-gray-500' />}
                        sx={{ px: 1, py: 0.5, border: '1px solid #E5E7EB', borderRadius: 6, width: 360, height: 48, fontStyle: 'italic' }}
                    />

                    <Box display="flex" gap={1}>
                        <Button
                            variant="outline"
                            className="h-12 border border-[#D6D6D6] text-[#025AE0] font-medium rounded-sm flex items-center hover:cursor-pointer hover:text-blue-800"
                            onClick={handleFilterPanel}
                        >
                            <FiFilter className='w-4 h-4' />
                            Filter
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="h-12 border border-[#D6D6D6] font-medium text-sm rounded-sm px-4 flex items-center hover:cursor-pointer hover:bg-gray-100">
                                <BiSort className='w-4 h-5 mr-1' />Sort
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-6">
                                <DropdownMenuLabel className='flex items-center gap-2 text-lg text-[#6B6B6B]'>
                                    Sort Purchase Orders
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                                    <CiCalendar />Orders - Oldest to Recent
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                                    <CiCalendar />Orders - Recent to Oldest
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                                    <MdCurrencyRupee />Order Amount - High to Low
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                                    <MdCurrencyRupee />Order Amount - Low to High
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Box>
                </Box>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{ border: "none" }}
                        rows={filteredRows.map((row, index) => ({ id: index, ...row }))}
                        columns={columns}
                    />
                </div>
            </Card>
            <PurchaseReturnFilter
                open={showPanel}
                onOpenChange={setShowPanel}
                filters={filters}
                setFilters={setFilters}
            />
        </>
    );
}
