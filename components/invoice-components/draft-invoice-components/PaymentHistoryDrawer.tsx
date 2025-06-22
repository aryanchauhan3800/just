import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { ChevronRight, X } from "lucide-react";
import React from 'react'
import { CiBank, CiCalendar } from "react-icons/ci";
import { RiBookReadLine } from "react-icons/ri";

const PaymentHistoryDrawer = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="h-full w-[500px] max-w-md rounded-none">
                <div>
                    <DrawerHeader className="flex flex-row justify-between items-center border-b px-4">
                        <DrawerTitle className="text-2xl text-[#474747]">Payment Recieved details</DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="border rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                </div>
                <DrawerDescription className="pt-10">
                    <div className="w-xs mx-auto grid grid-cols-2 pb-2 border-b">
                        <span className="text-[#8F8F8F]">Amount Recieved</span>
                        <span className="text-[#474747] text-2xl">40,00,000</span>
                    </div>
                    <div className="w-xs mx-auto py-4 text-[#8F8F8F] space-y-4 border-b">
                        <div className="grid grid-cols-2">
                            <span className="flex flex-row items-center gap-1"><CiCalendar />Recieving Date</span>
                            <span className="text-base text-[#474747]">12 Apr, 2025</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="flex flex-row items-center gap-1"><RiBookReadLine />Mode</span>
                            <span className="text-base text-[#474747]">Cash</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="flex flex-row items-center gap-1"><CiBank />Credited Bank</span>
                            <span className="text-base text-[#474747]">HDFC Bank - <span className="text-[#6B6B6B] text-sm">4478</span></span>
                        </div>
                    </div>
                    <div className="w-xs mx-auto text-sm py-4 space-y-2">
                        <h2 className="text-[#8F8F8F]">Notes</h2>
                        <p className="text-[#474747]">This is a demo description and note that the user has entered in the record payment process</p>
                    </div>
                </DrawerDescription>
                <DrawerFooter>
                    <Button variant="ghost">Close<ChevronRight /></Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default PaymentHistoryDrawer