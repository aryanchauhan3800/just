'use client'

import InfoStrip from '@/components/InfoStrip';
import PurchaseReturnTable from '@/components/purchase/purchase-return-components/PurchaseReturnTable';
import { Card } from '@/components/ui/card';
import { StripItem } from '@/types/dashboardAndInvoiceTypes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { CiBoxes, CiStar } from 'react-icons/ci';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';


const items: StripItem[] = [
    {
        title: "Total Purchase Returned",
        icon: CiBoxes,
        all: false,
        color: "border-l-green-500",
        value: "00.00",
        percentage: "3",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: true,

    },
    {
        title: "Total Debit Notes",
        icon: CiStar,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "3",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: true,
    },
    {
        title: "Amount To Recieve",
        icon: HiOutlineBanknotes,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "3",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: true,
    },
    {
        title: "Item(s) pending return",
        icon: RiMoneyRupeeCircleLine,
        all: false,
        color: "border-l-purple-500",
        value: "00",
        percentage: "3",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: true
    },
];

const page = () => {
    const router = useRouter()
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
        <div className="flex flex-col h-full p-4 space-y-6">
            <Card className="flex flex-col justify-between bg-white border-none shadow-none p-4">
                <div className='flex flex-row justify-start items-center'>
                    <h1 className="text-2xl text-gray-800">Purchase</h1>
                </div>
                <div className={`transition-all duration-300 sticky top-0 z-10 bg-white ${showInfoStrip ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <InfoStrip items={items} />
                </div>
                <PurchaseReturnTable />
            </Card>
        </div>
    )
}

export default page