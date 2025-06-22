import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes';
import { FaRegBell } from 'react-icons/fa6';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderReminder = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='[&>button]:hidden p-0 rounded-none min-w-2xl'>
                <DialogHeader className='mb-2 bg-[#FAFAFA]'>
                    <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                        <DialogTitle className='text-2xl text-[#474747] flex items-center gap-2'><FaRegBell />Order Reminder</DialogTitle>
                        <DialogClose asChild>
                            <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                        </DialogClose>
                    </div>
                    <DialogDescription className='flex flex-col text-[#474747] p-6 gap-4'>
                        <span className='text-lg text-black'>Set up Order Reminder</span>
                        <span className='text-base'>Now automatically send order reminders to Vendor</span>
                        <span className='text-base'>No additional money will be charged from you for this, our goal is to make your business management hassle-free</span>
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-row items-center justify-between px-6 w-4/5 mb-4'>
                    <label className="text-sm text-black">Set intervals for Reminder:</label>
                    <Select>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select time intervals" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                            <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter className="w-full flex justify-between border-t shadow-xl px-6 py-2">
                    <Button variant="ghost" className='mr-auto' onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="primary" className='px-5'>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderReminder