'use client'

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, InputBase } from '@mui/material';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BiSort } from 'react-icons/bi';
import { CiCalendar } from 'react-icons/ci';
import { MdCurrencyRupee } from 'react-icons/md';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';
import { IconType } from 'react-icons';
import { IoMdEye } from 'react-icons/io';
import { RxTrash } from 'react-icons/rx';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { RiTriangleFill } from 'react-icons/ri';
import DebitFilter from './DebitFilter';

type MenuOption = {
    label: string;
    icon: IconType;
    action: string;
    color: string
};

type debitNote = {
    debitNote: string
    createdOn: string
    vendorName: string
    avatarColor: string
    avatarInitial: string
    amount: string
    action: string
    noteStatus: string
}

const getMenuOptionsByStatus = (status: string): MenuOption[] => {
    switch (status) {
        case 'Not Adjusted':
        case 'Partially Adjusted':
            return [
                { label: 'View Debit Note', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Adjust Now', icon: HiOutlineBanknotes, action: 'adjustNow', color: "text-[#474747]" },
                { label: 'Delete Debit Note now', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
        case 'Fully Adjusted':
            return [
                { label: 'View Debit Note', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Delete Purchase Order', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
    }
};

type ActionMenuProps = {
    status: string;
    row: debitNote
}

const ActionMenu = ({ status, row }: ActionMenuProps) => {
    const options = getMenuOptionsByStatus(status);

    const handleSelect = (action: string) => {
        console.log(`Action "${action}" selected for PO ${row.debitNote}`);
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

const debits = [
    {
        debitNote: "DN-000100",
        createdOn: "12-Jan-2025",
        vendorName: "Ashok Srivastav",
        avatarColor: "#FF5A5F",
        avatarInitial: "A",
        amount: "80,000",
        action: "pay",
        noteStatus: "Fully Adjusted",
    },
    {
        debitNote: "DN-000101",
        createdOn: "15-Jan-2025",
        vendorName: "Akansha Mehra",
        avatarColor: "#00D2FF",
        avatarInitial: "A",
        amount: "1,20,000",
        action: "receive",
        noteStatus: "Partially Adjusted",
    },
    {
        debitNote: "DN-000102",
        createdOn: "18-Jan-2025",
        vendorName: "Prabir Joshi",
        avatarColor: "#32CD32",
        avatarInitial: "P",
        amount: "95,000",
        action: "pay",
        noteStatus: "Not Adjusted",
    },
    {
        debitNote: "DN-000103",
        createdOn: "20-Jan-2025",
        vendorName: "Balwant Singh Joshi",
        avatarColor: "#FFD700",
        avatarInitial: "B",
        amount: "75,000",
        action: "receive",
        noteStatus: "Not Adjusted",
    }
];

const statusClasses = {
    'Not Adjusted': "bg-red-100 text-[#F5222D]",
    'Partially Adjusted': "bg-yellow-100 text-[#FAAD14]",
    'Fully Adjusted': "bg-green-100 text-[#22B947]",
};

const columns: GridColDef[] = [
    {
        field: 'debitNote',
        headerName: '# Debit Note',
        flex: 1,
        renderCell: (params) => {
            const orderId = params.value;
            return (
                <a
                    href={`/debit/view`}
                    className="text-blue-600 hover:underline font-medium"
                >
                    {orderId}
                </a>
            );
        }
    },
    { field: 'createdOn', headerName: 'Created On', flex: 1 },
    {
        field: 'vendorName',
        headerName: 'Vendor Name',
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
                {params.row.vendorName}
            </Box>
        ),
    },
    { field: 'amount', headerName: 'Amt', flex: 1 },
    {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params) => {
            const action = params.value

            return (
                <div>
                    {action === 'receive' ? (
                        <button className="text-green-600 flex items-center gap-1">
                            <RiTriangleFill />to Receive
                        </button>
                    ) : (
                        <button className="text-red-600 flex items-center gap-1">
                            <RiTriangleFill className='rotate-180' />to Pay
                        </button>
                    )}
                </div>
            );
        }
    },
    {
        field: 'noteStatus',
        headerName: 'Note Status',
        flex: 1,
        renderCell: (params) => {
            const status = params.value;
            const className = statusClasses[status] || "bg-gray-200 text-gray-700";

            return <Badge className={clsx(className, "rounded-full px-2 py-1 text-sm font-medium")}>{status}</Badge>;
        }
    },
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
            return <ActionMenu status={params.row.noteStatus} row={params.row} />
        }
    }
];

export default function DebitTable() {
    const [searchText, setSearchText] = useState('');
    const [showPanel, setShowPanel] = useState(false)
    const [filters, setFilters] = useState({
        statuses: [],
        dateRange: null,
        amountRange: null,
        withToPay: false,
        withToReceive: false
    });

    const filteredRows = debits.filter((order) => {
        const matchName = order.vendorName.toLowerCase().includes(searchText.toLowerCase());

        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.noteStatus);

        const matchToPay = !filters.withToPay || order.action === "pay";

        const matchToReceive = !filters.withToReceive || order.action === "receive";

        const matchAmount = (() => {
            if (!filters.amountRange) return true;
            const amount = order.amount || 0;
            if (filters.amountRange === "lessThan") return Number(amount) < 10000;
            if (filters.amountRange === "10000") return Number(amount) >= 10000 && Number(amount) <= 49999;
            return true;
        })();

        const matchDateRange = (() => {
            if (!filters.dateRange) return true;
            const returnDate = new Date(order.createdOn);
            const now = new Date();
            if (filters.dateRange === "week") {
                const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
                return returnDate >= sevenDaysAgo;
            }
            return true;
        })();

        return matchName && matchStatus && matchToPay && matchToReceive && matchAmount && matchDateRange;
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
            <DebitFilter
                open={showPanel}
                onOpenChange={setShowPanel}
                filters={filters}
                setFilters={setFilters}
            />
        </>
    );
}