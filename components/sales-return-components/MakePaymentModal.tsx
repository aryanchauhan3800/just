import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { Button } from '../ui/button'
import { ChevronsLeft, X } from 'lucide-react'
import { Avatar } from '@mui/material';
import { CiBank } from 'react-icons/ci';
import MakePaymentTabs from './MakePaymentTabs';
import { RiFileList3Line } from 'react-icons/ri'
import PaymentMadeModal from './PaymentMadeModal'

const MakePaymentModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const scrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [showMadePaymentModal, setShowMadePaymentModal] = useState(false)

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handleScroll = () => {
            const index = Math.round(el.scrollLeft / el.offsetWidth);
            setActiveTab(index);
        };
        el.addEventListener('scroll', handleScroll);
        return () => {
            if (el) {
                el.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollRef]);

    const handleMakePayment = () => {
        onOpenChange(false)
        setShowMadePaymentModal(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='[&>button]:hidden p-0 min-w-3xl max-h-vh flex flex-col'>
                    <DialogHeader className="flex-shrink-0">
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <RiFileList3Line />Credit Note Settlement
                            </DialogTitle>
                            <DialogClose asChild>
                                <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div>
                        <div className="px-4 space-y-4 mb-4">
                            <div className='border border-[#E8E8E8] rounded-xl'>
                                <div className='flex flex-col gap-4 p-4'>
                                    <Avatar>A</Avatar>
                                    <div>
                                        <h1 className='text-[22px] text-[#242424]'>Archana Puran Singh <span className='p-1 text-xs text-[#22B947] bg-green-100'>Active</span></h1>
                                        <p className='text-lg text-[#6B6B6B]'>+91 8875889855</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full overflow-hidden">
                                <div
                                    ref={scrollRef}
                                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide gap-4 pb-2"
                                >
                                    <div className="snap-start min-w-full flex-shrink-0">
                                        <p className='text-[#6B6B6B] text-lg mb-2'>Credit Note Settlement</p>
                                        <div className='border rounded-xl flex flex-row w-full'>
                                            <div className='px-4 py-3 w-1/2'>
                                                <p className='text-[#242424] text-sm'>To Receive <span className='text-[#8F8F8F] text-xs'>for this Credit Note</span></p>
                                                <p className='text-[#474747] text-[22px]'>10,000.00</p>
                                            </div>
                                            <div className='px-4 py-3 w-1/2 border-l'>
                                                <p className='text-[#8F8F8F] text-xs flex gap-1'><CiBank className='h-[14px] w-[14px]' />Receiving in</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="snap-start min-w-full flex-shrink-0">
                                        <p className='text-[#6B6B6B] text-lg mb-2'>Summary of Party (to date)</p>
                                        <div className='flex flex-col sm:flex-row gap-2 w-full'>
                                            <div className='flex-1 px-2 py-3 rounded-lg bg-green-100 min-w-0'>
                                                <p className='text-[#242424] text-sm flex items-center gap-1'>
                                                    <ChevronsLeft className="rotate-225 w-4 h-4 text-[#8F8F8F]" />
                                                    To Receive
                                                </p>
                                                <p className='text-[#22B947] text-lg sm:text-xl pl-3 truncate'>₹ 80,000.00</p>
                                            </div>
                                            <div className='flex-1 px-2 py-3 rounded-lg bg-red-100 min-w-0'>
                                                <p className='text-[#242424] text-sm flex items-center gap-1'>
                                                    <ChevronsLeft className="rotate-45 w-4 h-4 text-[#8F8F8F]" />
                                                    To Pay
                                                </p>
                                                <p className='text-[#F5222D] text-lg sm:text-xl pl-3 truncate'>₹ 60,000.00</p>
                                            </div>
                                            <div className='flex-1 px-2 py-3 rounded-lg bg-[#FAFAFA] min-w-0'>
                                                <div className='flex flex-row justify-between'>
                                                    <p className='text-[#242424] text-sm'>Adjustment</p>
                                                    <span className='text-[#22B947] text-xs'>to Receive</span>
                                                </div>
                                                <p className='text-[#474747] text-lg sm:text-xl pl-3 truncate'>₹ 20,000.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-2 mt-2">
                                    <div
                                        className={`w-6 h-1 rounded-full transition-colors duration-300 ${activeTab === 0 ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                    ></div>
                                    <div
                                        className={`w-6 h-1 rounded-full transition-colors duration-300 ${activeTab === 1 ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </div><div>

                        </div>
                        <MakePaymentTabs />
                    </div>

                    <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                        <Button variant="outline" className='mr-auto'>Mark as Paid</Button>
                        <Button variant="primary" className='px-5' onClick={handleMakePayment}>Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <PaymentMadeModal open={showMadePaymentModal} onOpenChange={setShowMadePaymentModal} />
        </>
    )
}

export default MakePaymentModal