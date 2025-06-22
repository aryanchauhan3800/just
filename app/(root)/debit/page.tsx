'use client'

import DebitTable from '@/components/debit-components/DebitTable';
import NewDebitNote from '@/components/debit-components/NewDebitNote';
import InfoStrip from '@/components/InfoStrip';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StripItem } from '@/types/dashboardAndInvoiceTypes';
import { Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';


const items: StripItem[] = [
    {
        title: "Total Debit Note Amount",
        icon: HiOutlineBanknotes,
        all: false,
        color: "border-l-green-500",
        value: "00.00",
        percentage: "12",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Purchase in last 30 days",
        icon: RiMoneyRupeeCircleLine,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "12",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Recieved in last 30 days",
        icon: RiMoneyRupeeCircleLine,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "24",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Pending Adjustment",
        icon: BsBoxSeam,
        all: false,
        color: "border-l-purple-500",
        value: "00",
        percentage: "12",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
];

const page = () => {
    const [showPurchaseOrder, setShowPurchaseOrder] = useState(false)
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


    const handleDebitNote = () => {
        setShowPurchaseOrder(true)
    }

    return (
        <>
            <div className="flex flex-col h-full p-4 space-y-6">
                <Card className="flex flex-col justify-between bg-white border-none shadow-none p-4">
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className="text-2xl text-gray-800">Debit Note</h1>
                        <div className='flex justify-end gap-2'>
                            <Button variant="primary" onClick={handleDebitNote}>
                                <Upload />Debit Note
                            </Button>
                        </div>
                    </div>
                    <div className={`transition-all duration-300 sticky top-0 z-10 bg-white ${showInfoStrip ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <InfoStrip items={items} />
                    </div>
                    <DebitTable />
                </Card>
            </div>
            <NewDebitNote open={showPurchaseOrder} onOpenChange={setShowPurchaseOrder} />
        </>
    )
}

export default page