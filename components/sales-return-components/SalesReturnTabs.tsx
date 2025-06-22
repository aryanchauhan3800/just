import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from '@mui/material'
import { Button } from '@/components/ui/button'
import { ExpandMore, OpenInNew } from '@mui/icons-material'
import { Separator } from '@/components/ui/separator'
import { RiFileList3Line } from 'react-icons/ri'
import { Badge } from '../ui/badge'

const SalesReturnTabs = () => {
    const records = true
    const [isExpanded, setIsExpanded] = useState(true)
    const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)

    return (
        <div className='mt-4'>
            <Tabs defaultValue="items" className="w-full">
                <TabsList className="gap-5 border-b pb-1 px-8 shadow-md w-full bg-white">
                    <TabsTrigger className="recievable_tab !py-5" value="items">Items Returned</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="attachment">Attachments</TabsTrigger>
                    <TabsTrigger className="recievable_tab !py-5" value="invoice">Original Invoice</TabsTrigger>
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
                            <div className="flex flex-row items-center justify-between">
                                <span className='text-sm text-[#6B6B6B]'>Adidas Sport Shoes x3</span>
                                <span className='text-base text-[#474747]'>₹ 4000000</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className='text-sm text-[#6B6B6B]'>Adidas Sport Shoes x3</span>
                                <span className='text-base text-[#474747]'>₹ 4000000</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className='text-sm text-[#6B6B6B]'>Adidas Sport Shoes x3</span>
                                <span className='text-base text-[#474747]'>₹ 4000000</span>
                            </div>
                        </div>
                    )}
                    <Separator />
                    <div className='px-10 pt-2 bg-white'>
                        <div className="flex flex-row items-center justify-between text-base">
                            <span className='text-base text-[#6B6B6B]'>Returned goods value:</span>
                            <span className='text-[#474747]'>₹ 42100.00</span>
                        </div>
                        <div className="flex flex-row items-center justify-between border-b pb-2">
                            <span className='text-[#6B6B6B]'>Original Order Amt:</span>
                            <span className='text-[#474747]'>₹ 800000.00</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-2">
                            <span className='text-[#6B6B6B]'>Revised Due:</span>
                            <span className='text-[#474747]'>₹ 370000.00</span>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Button variant="outline" className='mt-4 text-base text-[#474747]'>
                                <RiFileList3Line className='h-4 w-4' />See original Invoice<OpenInNew sx={{ width: 18, height: 18 }} />
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value='invoice' className='space-y-4'>
                    <div className='w-full pt-4 bg-white'>
                        <Typography className="text-[#474747] text-base px-4">Invoice</Typography>
                        <div>
                            <div className='flex flex-col bg-[#FAFAFA] py-2 px-8'>
                                <p className='text-sm text-[#8F8F8F]'>Invoice Amt</p>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className='text-base text-[#242424]'>₹ 60000.00</p>
                                    <div className='space-x-2 flex items-center'>
                                        <Badge className='text-[#22B947] bg-green-100 rounded-2xl text-sm'>Paid</Badge>
                                        <OpenInNew sx={{ width: 18, height: 18, color: "#8F8F8F" }} />
                                    </div>
                                </div>
                            </div>
                            <div className='border-b pb-6 px-6'>
                                <div className="flex flex-row items-center justify-between">
                                    <span className='text-sm text-[#8F8F8F]'>Date recieved:</span>
                                    <span className='text-base text-[#6B6B6B]'>12 Mar, 2025</span>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <span className='text-sm text-[#8F8F8F]'>Due Date:</span>
                                    <span className='text-base text-[#6B6B6B]'>12 Mar, 2025</span>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <span className='text-sm text-[#8F8F8F]'>Return Amt:</span>
                                    <span className='text-base text-[#6B6B6B]'>₹ 240000</span>
                                </div>
                                <div className="flex flex-row items-center justify-between mt-4 px-4">
                                    <span className='text-sm text-[#8F8F8F]'>Revised Amt after Return:</span>
                                    <span className='text-base text-[#242424]'>₹ 40000</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <Button variant="outline" className='mt-4 text-base text-[#474747]'>
                                    <RiFileList3Line className='h-4 w-4' />See original Invoice<OpenInNew sx={{ width: 18, height: 18 }} />
                                </Button>
                            </div>
                        </div>
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
        </div>
    )
}

export default SalesReturnTabs