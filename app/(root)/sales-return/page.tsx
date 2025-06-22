'use client'

import InfoStrip from '@/components/InfoStrip'
import TableWithControls from '@/components/TableWithControls';
import Customtable from '@/components/Customtable';
import { Button } from '@/components/ui/button';
import { StripItem } from '@/types/dashboardAndInvoiceTypes';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card';
import { HiOutlineBanknotes, HiOutlineUsers } from 'react-icons/hi2';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { LuBox } from 'react-icons/lu';
import ReturnFilters from '@/components/sales-return-components/ReturnFilter';
import { Return } from '@/types/salesReturnTypes';
import { OpenInNew } from '@mui/icons-material';
import NewSalesReturnModal from '@/components/sales-return-components/NewSalesReturnModal';

const items: StripItem[] = [
    {
        title: "Total Sales Return Value",
        icon: HiOutlineBanknotes,
        all: false,
        color: "border-l-green-500",
        value: "24,00,00,000",
        isDownwardTred: true,
        isUpwardTred: false,
        percentage: "100",
        alert: true
    },
    {
        title: "Last 30 days return",
        icon: RiMoneyRupeeCircleLine,
        all: false,
        color: "border-l-yellow-500",
        value: "80,000",
        isDownwardTred: true,
        isUpwardTred: false,
        percentage: "100",
        alert: true
    },
    {
        title: "Items Returned last 30 days",
        icon: LuBox,
        all: false,
        color: "border-l-purple-500",
        value: "34",
        isDownwardTred: true,
        isUpwardTred: false,
        percentage: "100",
        alert: true
    },
    {
        title: "Party's returned from",
        icon: HiOutlineUsers,
        all: false,
        color: "border-l-red-500",
        value: "24",
        isDownwardTred: true,
        isUpwardTred: false,
        percentage: "100",
        alert: true
    },
];

const returns: Return[] = [
    {
        returnNumber: "SR-000100",
        createdOn: "12-Jan-2025",
        name: "Ashok Srivastav",
        avatarColor: "#FF5A5F",
        avatarInitial: "A",
        returnValue: "80,000",
        creditNote: "Credit Note",
        returnDate: "12-Apr-2025",
        status: "Recieved",
        amount: "settled"
    },
    {
        returnNumber: "SR-000100",
        createdOn: "12-Jan-2025",
        name: "Akansha Mishra",
        avatarColor: "#FF5A5d",
        avatarInitial: "A",
        returnValue: "80,000",
        creditNote: "--",
        returnDate: "--",
        status: "Recieved",
        amount: "--"
    },

];

const Page = () => {
    const router = useRouter();
    const [showNewSalesReturn, setShowNewSalesReturn] = useState(false)
    const [filters, setFilters] = useState({
        showReturns: {
            recieved: false,
            pending: false,
            draft: false,
            partiallyRecieved: false,
        },
        showCreditNotes: false,
        amountWise: 'showAll',
        returnsMade: '',
    });

    const [expandedSections, setExpandedSections] = useState({
        amountWise: true,
        returnsMade: true,
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const applyFilters = () => setIsFilterOpen(false);

    const cancelFilters = () => {
        setIsFilterOpen(false);
        setFilters({
            showReturns: {
                recieved: true,
                pending: true,
                draft: true,
                partiallyRecieved: true,
            },
            showCreditNotes: false,
            amountWise: 'showAll',
            returnsMade: ''
        });
    };

    const filterReturnsData = (query: string, returns: Return) => {
        const matchesSearch =
            returns.name.toLowerCase().includes(query.toLowerCase()) ||
            returns.returnNumber.toLowerCase().includes(query.toLowerCase());

        // Filter by delivery status
        const status = returns.status?.toLowerCase();
        const deliveryStatusMatches =
            (filters.showReturns.recieved && status === 'recieved') ||
            (filters.showReturns.pending && status === 'pending') ||
            (filters.showReturns.draft && status === 'draft') ||
            (filters.showReturns.partiallyRecieved && status === 'partially recieved');

        // Filter by credit note presence
        const hasCreditNote = returns.creditNote?.toLowerCase() !== '--';
        const creditNoteMatches = filters.showCreditNotes ? hasCreditNote : true;

        // Filter by amount wise
        let amountMatches = true;
        const rawAmount = returns.returnValue?.replace(/,/g, '');
        const amount = parseInt(rawAmount, 10);
        switch (filters.amountWise) {
            case 'lessThan9999':
                amountMatches = amount < 9999;
                break;
            case '10000to49999':
                amountMatches = amount >= 10000 && amount <= 49999;
                break;
            case '50000to99999':
                amountMatches = amount >= 50000 && amount <= 99999;
                break;
            case 'above100000':
                amountMatches = amount >= 100000;
                break;
            case 'showAll':
            default:
                amountMatches = true;
        }

        // Filter by returns made timeframe
        let returnsMadeMatches = true;
        if (filters.returnsMade) {
            const today = new Date();
            const createdOn = new Date(returns.createdOn);

            switch (filters.returnsMade) {
                case 'within7Days':
                    const sevenDaysAgo = new Date(today);
                    sevenDaysAgo.setDate(today.getDate() - 7);
                    returnsMadeMatches = createdOn >= sevenDaysAgo && createdOn <= today;
                    break;
                case 'thisMonth':
                    returnsMadeMatches =
                        createdOn.getMonth() === today.getMonth() &&
                        createdOn.getFullYear() === today.getFullYear();
                    break;
            }
        }

        return (
            matchesSearch &&
            deliveryStatusMatches &&
            creditNoteMatches &&
            amountMatches &&
            returnsMadeMatches
        );
    };

    const handleNewSalesReturn = () => {
        setShowNewSalesReturn(true)
    };

    const [showInfoStrip, setShowInfoStrip] = useState(true);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScrollTop.current) {
                // Scrolling down
                setShowInfoStrip(false);
            } else if (currentScroll < lastScrollTop.current) {
                // Scrolling up
                setShowInfoStrip(true);
            }

            lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <div className="flex flex-col h-full p-4 space-y-6">
                <Card className="flex flex-col justify-between bg-white border-none shadow-none p-4">
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className="text-2xl text-gray-800">Sales Return</h1>
                        <div className='flex items-center gap-2'>
                            <Button variant="outline">Sales Return Report<OpenInNew sx={{ width: 18, height: 18 }} className='text-[#6B6B6B]' /></Button>
                            <Button variant="primary" onClick={handleNewSalesReturn}>
                                <span className="text-xl">+</span>New Sales Return
                            </Button>
                        </div>
                    </div>
                    <div className={`transition-all duration-300 sticky top-0 z-10 bg-white ${showInfoStrip ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <InfoStrip items={items} />
                    </div>
                </Card>

                <Card className='border-none shadow-none p-4'>
                    <TableWithControls
                        data={returns}
                        columns={["Created on", "Client / Company", "Return Value", "Credit Note", "Return Date", "Delivary Status", "Amount"]}
                        tableType="Salesreturn"
                        mainColumn="# Return No"
                        onSearch={filterReturnsData}
                        searchPlaceholder="Search ..."
                        filterComponent={
                            <ReturnFilters
                                filters={filters}
                                setFilters={setFilters}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                applyFilters={applyFilters}
                                cancelFilters={cancelFilters}
                                isFilterOpen={isFilterOpen}
                                setIsFilterOpen={setIsFilterOpen}
                            />
                        }
                        customTableComponent={(data) => (
                            <Customtable
                                tableType="Salesreturn"
                                mainColumn="# Return No"
                                columns={["Created on", "Client / Company", "Return Value", "Credit Note", "Return Date", "Delivary Status", "Amount"]}
                                data={data}
                            />
                        )}
                        rowsPerPage={10}
                    />
                </Card>
            </div>
            <NewSalesReturnModal open={showNewSalesReturn} onOpenChange={setShowNewSalesReturn} />
        </>
    )
}

export default Page