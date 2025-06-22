import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, InputBase } from '@mui/material';
import PurchaseFilter from './PurchaseFilter';
import { FiEdit, FiFilter, FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';
import { IoMdEye, IoMdShare } from 'react-icons/io';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { RxTrash } from "react-icons/rx";
import { IconType } from 'react-icons';

type MenuOption = {
    label: string;
    icon: IconType;
    action: string;
    color: string
};

type PurchaseOrder = {
    purchaseOrder: string;
    createdOn: string;
    partyName: string;
    avatarColor: string;
    avatarInitial: string;
    purchaseAmount: string;
    purchaseStatus: string;
    sentOn: string;
    billStatus: string;
};


const getMenuOptionsByStatus = (status: string): MenuOption[] => {
    switch (status) {
        case 'Pending':
            return [
                { label: 'View Purchase Order', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Mark as Accepted', icon: HiOutlineCheckCircle, action: 'accept', color: "text-[#474747]" },
                { label: 'Delete Purchase Order', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
        case 'Delivered':
        case 'Partially Delivered':
            return [
                { label: 'View Purchase Order', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'View Invoice', icon: BiReceipt, action: 'viewInvoice', color: "text-[#474747]" },
                { label: 'Delete Purchase Order', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
        case 'Accepted':
            return [
                { label: 'View Purchase Order', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Upload Invoice', icon: BiReceipt, action: 'uploadInvoice', color: "text-[#474747]" },
                { label: 'Delete Purchase Order', icon: RxTrash, action: 'delete', color: "text-[#F5222D]" },
            ];
        case 'Draft':
            return [
                { label: 'View Purchase Order', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Send Purchase Order', icon: IoMdShare, action: 'send', color: "text-[#474747]" },
                { label: 'Edit Purchase Order', icon: FiEdit, action: 'edit', color: "text-[#474747]" },
                { label: 'Cancel Purchase Order', icon: RxTrash, action: 'cancel', color: "text-[#F5222D]" },
            ];
        case 'Overdue':
            return [
                { label: 'View Purchase Order', icon: IoMdEye, action: 'view', color: "text-[#474747]" },
                { label: 'Mark as Accepted', icon: HiOutlineCheckCircle, action: 'accept', color: "text-[#474747]" },
                { label: 'Send Purchase Order', icon: IoMdShare, action: 'send', color: "text-[#474747]" },
                { label: 'Cancel Purchase Order', icon: RxTrash, action: 'cancel', color: "text-[#F5222D]" },
            ];
    }
};

type ActionMenuProps = {
    status: string;
    row: PurchaseOrder
}

const ActionMenu = ({ status, row }: ActionMenuProps) => {
    const options = getMenuOptionsByStatus(status);

    const handleSelect = (action: string) => {
        console.log(`Action "${action}" selected for PO ${row.purchaseOrder}`);
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
                        <option.icon className={`w-8 h-8 ${option.color}`} />
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

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

const statusClasses = {
    Accepted: "bg-green-100 text-[#22B947]",
    Draft: "bg-blue-200 text-[#025AE0]",
    Overdue: "bg-yellow-100 text-[#FAAD14]",
    Pending: "bg-red-100 text-[#F5222D]",
    Rejected: "bg-red-100 text-[#F5222D]",
    'Partially Delivered': "bg-green-100 text-[#22B947]",
};

const columns: GridColDef[] = [
    {
        field: 'purchaseOrder',
        headerName: '# Purchase Order',
        flex: 1,
        renderCell: (params) => {
            const orderId = params.value; // e.g., "PO-000100"
            return (
                <a
                    href={`/purchase/view`}
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
    { field: 'purchaseAmount', headerName: 'Purchase Amount', flex: 1 },
    {
        field: 'purchaseStatus',
        headerName: 'Purchase Status',
        flex: 1,
        renderCell: (params) => {
            const status = params.value;
            const className = statusClasses[status] || "bg-gray-200 text-gray-700";

            return <Badge className={clsx(className, "rounded-full px-2 py-1 text-sm font-medium")}>{status}</Badge>;
        }
    },
    { field: 'sentOn', headerName: 'Sent On', flex: 1 },
    { field: 'billStatus', headerName: 'Bill Status', flex: 1 },
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
            return <ActionMenu status={params.row.purchaseStatus} row={params.row} />
        }
    }
];

export default function PurchaseTable() {
    const [searchText, setSearchText] = useState('');
    const [showPanel, setShowPanel] = useState(false)
    const [filters, setFilters] = useState({
        createdToday: false,
        showRecurring: false,
        statuses: [], // e.g., ['Paid', 'Overdue']
        dateRange: null, // or { startDate: '2025-01-01', endDate: '2025-01-30' }
    });


    const filteredRows = purchaseOrders.filter((order) => {
        const matchName = order.partyName.toLowerCase().includes(searchText.toLowerCase());

        const matchStatus = filters.statuses.length === 0 || filters.statuses.includes(order.purchaseStatus);

        const matchCreatedToday = !filters.createdToday;

        const matchDateRange = !filters.dateRange;

        const matchBilled = !filters.showRecurring || order.billStatus === "Billed by Party";

        return (
            matchName &&
            matchStatus &&
            matchCreatedToday &&
            matchDateRange &&
            matchBilled
        );
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
            <PurchaseFilter
                open={showPanel}
                onOpenChange={setShowPanel}
                filters={filters}
                setFilters={setFilters}
            />
        </>
    );
}
