'use client'

import InfoStrip from '@/components/InfoStrip';
import PurchaseTable from '@/components/purchase/purchase-components/PurchaseTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StripItem } from '@/types/dashboardAndInvoiceTypes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { CiBoxes, CiCircleAlert, CiStar } from 'react-icons/ci';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';


const items: StripItem[] = [
    {
        title: "Total Purchase Amount",
        icon: CiBoxes,
        all: false,
        color: "border-l-green-500",
        value: "00.00",
        percentage: "0",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Purchase in Line",
        icon: RiMoneyRupeeCircleLine,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "0",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Payment Pending",
        icon: CiCircleAlert,
        all: false,
        color: "border-l-yellow-500",
        value: "00.00",
        percentage: "0",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
    },
    {
        title: "Potential Margin",
        icon: CiStar,
        all: false,
        color: "border-l-purple-500",
        value: "00",
        percentage: "0",
        isUpwardTred: true,
        isDownwardTred: false,
        alert: false
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

    const handleNewPurchase = () => {
        router.push("/purchase/new-purchase")
    }

    const handleRecordPurchase = () => {
        router.push("/purchase/record-purchase")
    }

    return (
        <div className="flex flex-col h-full p-4 space-y-6">
            <Card className="flex flex-col justify-between bg-white border-none shadow-none p-4">
                <div className='flex flex-row justify-between items-center'>
                    <h1 className="text-2xl text-gray-800">Purchase</h1>
                    <div className='flex items-center gap-2'>
                        <Button variant="outline" onClick={handleNewPurchase}>
                            <span className="text-xl">+</span>New Purchase Order
                        </Button>
                        <Button variant="primary" onClick={handleRecordPurchase}>
                            <span className="text-xl">+</span>Record New Purchase
                        </Button>
                    </div>
                </div>
                <div className={`transition-all duration-300 sticky top-0 z-10 bg-white ${showInfoStrip ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <InfoStrip items={items} />
                </div>
                <PurchaseTable />
            </Card>
        </div>
    )
}

export default page