import React, { useState } from 'react';
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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CustomTableProps } from '@/types/dashboardAndInvoiceTypes';
import { BiSolidReceipt } from 'react-icons/bi';
import { MdCurrencyRupee, MdOutlineStickyNote2 } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import SalesReturnModal from './sales-return-components/SalesReturnModal';

const Customtable = ({ tableType, mainColumn, data, columns }: CustomTableProps) => {
    const router = useRouter();
    const [showSalesModal, setShowSalesModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const getInitials = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    const handleViewInvoice = (row) => {
        router.push(`/invoice/view/${row?._id}`);
    };

    const getStatusBadgeClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-[#22B947]';
            case 'overdue':
                return 'bg-red-100 text-[#F30000]';
            case 'recieved':
                return 'bg-green-100 text-[#22B947]';
            case 'pending':
                return 'bg-red-100 text-[#F30000]';
            case 'partially paid':
                return 'bg-yellow-100 text-[#FAAD14]';
            case 'due':
                return 'bg-yellow-100 text-[#FAAD14]'
            case 'draft':
                return 'bg-blue-100 text-[#025AE0]'
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const handleSalesReturn = (e: React.MouseEvent, rowIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen(null); // Close dropdown first
        setTimeout(() => {
            setShowSalesModal(true);
        }, 100); // Small delay to ensure dropdown closes
    };

    const handleModalChange = (open: boolean) => {
        setShowSalesModal(open);
        if (!open) {
            // Reset any focus issues
            setTimeout(() => {
                document.body.focus();
            }, 100);
        }
    };

    return (
        <>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: '100%' }}>
                    <TableHead>
                        <TableRow sx={{ borderBottom: '1px solid #E5E7EB' }}>
                            <TableCell sx={{ py: 2, pl: 3, fontSize: '0.875rem', fontWeight: 500, color: '#4B5563' }}>
                                {mainColumn}
                            </TableCell>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        py: 2,
                                        px: 0,
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: '#4B5563'
                                    }}
                                >
                                    <span className='border-l-2 px-3'>{column}</span>
                                </TableCell>
                            ))}
                            {(tableType !== 'dashboard' && tableType !== 'stockAlert') && <TableCell />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => {
                            const isLastRow = index === data.length - 1;
                            return (
                                <TableRow key={index}>
                                    {Object.keys(row).map((key, cellIndex) => {
                                        if (key === 'avatarInitial' || key === 'avatarColor' || key === "_id") return null;

                                        return (
                                            <TableCell
                                                key={cellIndex}
                                                sx={{
                                                    py: 1,
                                                    px: 2,
                                                    borderBottom: isLastRow ? 'none' : '1px solid #E5E7EB'
                                                }}
                                            >
                                                {key === 'name' || key === 'item' ? (
                                                    <Box display="flex" alignItems="center">
                                                        {
                                                            tableType !== "stockAlert" ? (
                                                                <Avatar
                                                                    sx={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        bgcolor: row.avatarColor || '#4b9eff',
                                                                        fontSize: '0.875rem',
                                                                        mr: 1.5
                                                                    }}
                                                                >
                                                                    {row.avatarInitial || getInitials(row[key])}
                                                                </Avatar>
                                                            ) : (
                                                                <Avatar
                                                                    sx={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        bgcolor: row.avatarColor || '#4b9eff',
                                                                        fontSize: '1.1rem',
                                                                        mr: 1.5,
                                                                        borderRadius: 3,
                                                                    }}
                                                                >
                                                                    {row.avatarInitial || getInitials(row[key])}
                                                                </Avatar>
                                                            )
                                                        }
                                                        <Typography variant="body2">{row[key]}</Typography>
                                                    </Box>
                                                ) : key === 'invoiceNumber' ? (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#2563EB',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => router.push(`/invoice/view/${row[key]}`)}
                                                    >
                                                        {row[key]}
                                                    </Typography>
                                                ) : key === 'status' ? (
                                                    <Badge
                                                        variant="outline"
                                                        className={`px-3 pt-1.5 text-sm rounded-full ${getStatusBadgeClasses(row[key])}`}
                                                    >
                                                        {row[key]}
                                                    </Badge>
                                                ) : (
                                                    <Typography variant="body2">{row[key]}</Typography>
                                                )}
                                            </TableCell>
                                        );
                                    }).filter(cell => cell !== null)}

                                    {tableType !== 'dashboard' && tableType !== 'stockAlert' && (
                                        <TableCell
                                            align="right"
                                            sx={{
                                                borderBottom: isLastRow ? 'none' : '1px solid #E5E7EB'
                                            }}
                                        >
                                            <DropdownMenu
                                                open={dropdownOpen === index}
                                                onOpenChange={(open) => setDropdownOpen(open ? index : null)}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <MoreVertIcon fontSize="small" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={()=>handleViewInvoice(row)}>
                                                        <BiSolidReceipt className="mr-2" /> View Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <MdCurrencyRupee className="mr-2" /> Record Payment
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => handleSalesReturn(e, index)}>
                                                        <MdOutlineStickyNote2 className="mr-2" /> Sales Return
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <FiEdit className="mr-2" /> Edit Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className='text-red-500'>
                                                        <AiOutlineDelete className='mr-2 text-red-500' /> Delete Invoice
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <SalesReturnModal open={showSalesModal} onOpenChange={handleModalChange} />
        </>
    );
};

export default Customtable;
