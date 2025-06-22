'use client'

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
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Avatar } from '@mui/material'
import { MoreVerticalIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import InvoiceTabs from '@/components/invoice-components/draft-invoice-components/InvoiceTabs';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [isSent, setIsSent] = useState(false)
    const [showHeadsUpDialog, setShowHeadsUpDialog] = useState(false)
    const [showReminderDialog, setShowReminderDialog] = useState(false)
    const [dontAskAgain, setDontAskAgain] = useState(false)

    useEffect(() => {
        const savedPreference = localStorage.getItem('dontShowMarkAsSent')
        if (savedPreference === 'true') {
            setDontAskAgain(true)
        }
    }, [])

    const handleMarkAsSent = () => {
        setIsSent(true)
        setShowHeadsUpDialog(false)
        if (dontAskAgain) {
            localStorage.setItem('dontShowMarkAsSent', 'true')
        }
    }

    const handleButtonClick = () => {
        if (dontAskAgain || localStorage.getItem('dontShowMarkAsSent') === 'true') {
            handleMarkAsSent()
        } else {
            setShowHeadsUpDialog(true)
        }
    }

    const handleSetReminder = () => {

    }

    const handleCustomizeTemplate = () => {
        router.push("/invoice/new/[id]/customize")
    }

    return (
        <div className='h-full'>
            <div className='flex flex-row justify-between items-center border-b py-2 px-4'>
                <h1 className='text-xl'>View Invoice</h1>
                <div className='flex flex-row items-center gap-4'>
                    <div className='space-x-4'>
                        {!isSent ? (
                            <>
                                <Button className='no_outline_btn'>Edit Invoice</Button>
                                <Button className='no_outline_btn border-l py-1 pl-3 rounded-none' onClick={handleCustomizeTemplate}>Customize Template</Button>
                                <Button className='no_outline_btn border-l py-1 pl-3 rounded-none'>Share</Button>
                                <Button className='no_outline_btn border-l py-1 pl-3 rounded-none'>PDF</Button>
                            </>
                        ) : (
                            <>
                                <Button className='no_outline_btn' onClick={() => setShowReminderDialog(true)}>Set Payment Reminder</Button>
                                <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
                                    <DialogContent className='[&>button]:hidden p-0'>
                                        <DialogHeader>
                                            <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                                <DialogTitle className='text-xl text-blue-500'>Payment Reminder</DialogTitle>
                                                <DialogClose asChild>
                                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                                </DialogClose>
                                            </div>
                                            <DialogDescription className='flex flex-col p-6 gap-4'>
                                                <span className='text-lg font-semibold'>Set up Payment Reminder</span>
                                                <span>Now automatically send payment remindersto client, for easy cashflow</span>
                                                <span>No additional money will be charged from you for this, our goal is to make your business management hassle-free</span>
                                            </DialogDescription>
                                            <div className='flex flex-row items-center justify-between px-6'>
                                                <label className="text-sm font-normal">Set intervals for Reminder:</label>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select time intervals" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="week">Week</SelectItem>
                                                        <SelectItem value="month">Month</SelectItem>
                                                        <SelectItem value="year">Year</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </DialogHeader>
                                        <DialogFooter className="mt-4 border-t py-4 px-6 shadow-2xl">
                                            <Button className='bg-white hover:bg-white text-black shadow-none mr-auto' onClick={() => setShowReminderDialog(false)}>Cancel</Button>
                                            <Button className='mr-auto bg-blue-500 hover:bg-blue-700 ml-52' onClick={handleSetReminder}>Save</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button className='no_outline_btn border-l py-2 pl-3'>Share</Button>
                                
                                <Button className='no_outline_btn border-l py-2 pl-3'>PDF</Button>
                            </>
                        )}
                    </div>

                    {!isSent ? (
                        <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleButtonClick}>
                            Mark as Sent
                        </Button>
                    ) : (
                        <Button className='bg-blue-500 hover:bg-blue-700'>Record Payment</Button>
                    )}

                    <MoreVerticalIcon />
                </div>

                <Dialog open={showHeadsUpDialog} onOpenChange={setShowHeadsUpDialog}>
                    <DialogContent className='[&>button]:hidden p-0'>
                        <DialogHeader>
                            <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                <DialogTitle className='text-xl text-blue-500'>Head&apos;s Up</DialogTitle>
                                <DialogClose asChild>
                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                </DialogClose>
                            </div>
                            <DialogDescription className='flex flex-col p-6 gap-4'>
                                <span>You sure you want to mark it as Sent?</span>
                                <span>Sent Invoices can&apos;t be Edited or Deleted</span>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex items-center space-x-2 mt-4 border-t pt-4 px-6">
                            <Checkbox id="dontAsk" checked={dontAskAgain} onCheckedChange={(checked) => setDontAskAgain(checked as boolean)} />
                            <Label htmlFor="dontAsk">Don&apos;t ask me again</Label>
                        </div>

                        <DialogFooter className="pb-4 px-6 flex justify-between">
                            <Button className='mr-auto bg-blue-500 hover:bg-blue-700' onClick={handleMarkAsSent}>Mark as Sent</Button>
                            <Button className='bg-white hover:bg-white text-black shadow-none' onClick={() => setShowHeadsUpDialog(false)}>Cancel</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='flex flex-row gap-10 h-full'>

                <div className='w-1/3 h-full border-r'>
                    <div className='flex flex-row items-center mb-4 gap-4 p-4'>
                        <Avatar>
                            A
                        </Avatar>
                        <div>
                            <h1>Archana Singh</h1>
                            <p>INV-000001</p>
                        </div>
                    </div>
                    <div className='pl-10'>
                        <p>Amount</p>
                        <p>4000000000</p>
                        <p>Due to 24-May, 2025</p>
                        <div>
                            <div className='grid grid-cols-2'>
                                <span>Status:</span>
                                <span>Pending</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span>Date created:</span>
                                <span>12 Mar, 2025</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span>Valid till Date:</span>
                                <span>12 Apr, 2025</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span>Validity:</span>
                                <span>1 month</span>
                            </div>
                        </div>
                    </div>

                    {/* <InvoiceTabs  /> */}
                </div>


               
                <div className='w-1/2 border'>this is template</div>
            </div>
        </div>
    )
}

export default Page
