import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from '@mui/material'
import { Button } from '@/components/ui/button'
import { ExpandMore } from '@mui/icons-material'
import { Separator } from '@/components/ui/separator'
import { CircleAlert, Plus } from 'lucide-react'
import PaymentHistoryDrawer from './PaymentHistoryDrawer'

const InvoiceTabs = ({invoiceDetails}) => {
    const records = true
    const [isExpanded, setIsExpanded] = useState(true)
    const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)

    return (
        <div className='mt-4'>
            <Tabs defaultValue="items" className="w-full">

                <TabsList className="gap-5 border-b pb-1 px-8 shadow-md w-full bg-white">
                    <TabsTrigger className="recievable_tab !py-5" value="items">Items</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="history">Payment History</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="attachment">Attachments</TabsTrigger>
                </TabsList>

                <TabsContent value="items" className='border-none'>
                    <div className='h-full pt-4 bg-white shadow-none'>
                        <div
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full px-4 bg-white hover:bg-white text-black border-none shadow-none flex items-center"
                        >
                            <Typography className="text-base font-medium">Items</Typography>
                            <ExpandMore className={`ml-auto transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {isExpanded && (
                        <div className='px-6 py-4 bg-white'>
                           {
                            invoiceDetails?.items?.map((item, index) => {
                                return (
                                    <div className="flex flex-row items-center justify-between">
                                    <span className='text-sm text-[#6B6B6B]'>{item?.name} x{item?.quantity}</span>
                                    <span className='text-base text-[#474747]'>₹ {item?.totalAmount}</span>
                                </div>
                                )
                            })
                           }
                           
                        </div>
                    )}
                    <Separator />
                    <div className='px-10 pt-2 bg-white'>
                        <div className="flex flex-row items-center justify-between text-base">
                            <span className='text-[#6B6B6B]'>Sub Total:</span>
                            <span className='text-[#474747]'>₹ {invoiceDetails?.totalTaxableAmount}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <span className='text-[#6B6B6B]'>Total:</span>
                            <span className='text-[#474747]'>₹ {invoiceDetails?.totalAmount}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <span className='text-[#6B6B6B]'>Balance Due:</span>
                            <span className='text-[#474747]'>₹ {invoiceDetails?.totalAmount - invoiceDetails?.totalPaid}</span>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value='history' className='space-y-4'>
                    <div className='w-full pt-4 bg-white'>
                        <Typography className="text-[#474747] text-base px-4">History</Typography>
                        {
                            !records ? (
                                <>
                                    <div className='w-full mt-10 px-6'>
                                        <p className='text-sm text-gray-600 text-center'>No payments recieved yet</p>
                                    </div>
                                </>
                            ) : (
                                <div className='px-6'>
                                    <div className='flex flex-row items-center justify-between text-sm text-[#8F8F8F] mt-4'>
                                        <span>Final Installment</span>
                                        <div className='flex flex-row items-center gap-2'>
                                            <span>24 Mar, 2025</span>
                                            <span
                                                className='text-gray-500'
                                                onClick={() => setIsHistoryDrawerOpen(true)}
                                            ><CircleAlert className="w-4 h-4" /></span>
                                        </div>
                                    </div>
                                    <span className='text-[#242424] text-base'>₹ 4007800000</span>
                                </div>
                            )
                        }
                        <Button className='no_outline_btn w-full px-6'>
                            <Plus />Record Payment
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value='attachment'>
                    <div className='h-full pt-4 bg-white shadow-none'>
                        <div
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full px-4 bg-white hover:bg-white text-black border-none shadow-none flex items-center"
                        >
                            <Typography className="text-base font-medium">Attachments</Typography>
                            <ExpandMore className={`ml-auto transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {isExpanded && (
                        <div className='px-6 py-4 bg-white'>
                            <div>
                                <h1>No attchments</h1>
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <PaymentHistoryDrawer open={isHistoryDrawerOpen} onOpenChange={setIsHistoryDrawerOpen} />
        </div>
    )
}

export default InvoiceTabs