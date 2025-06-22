import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Typography } from '@mui/material'
import { Button } from '@/components/ui/button'
import { ExpandMore } from '@mui/icons-material'
import { Separator } from '@/components/ui/separator'
import { GoUpload } from "react-icons/go";
import { ChevronRight } from 'lucide-react'

const PurchaseReturnTabs = () => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
        <>
            <div className='mt-4'>
                <Tabs defaultValue="items" className="w-full">

                    <TabsList className="gap-2 border-b pb-1 px-8 shadow-md w-full bg-white">
                        <TabsTrigger className="recievable_tab !py-5" value="items">Items</TabsTrigger>
                        <TabsTrigger className="recievable_tab !py-5" value="attachment">Attachments</TabsTrigger>
                        <TabsTrigger className="recievable_tab !py-5" value="vendor">Invoice from Vendor</TabsTrigger>
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
                                <span className='text-[#6B6B6B]'>Sub Total:</span>
                                <span className='text-[#474747]'>₹ 4007800000.00</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className='text-[#6B6B6B]'>Total:</span>
                                <span className='text-[#474747]'>₹ 4007800000.00</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span className='text-[#6B6B6B]'>Balance Due:</span>
                                <span className='text-[#474747]'>₹ 4007800000.00</span>
                            </div>
                        </div>

                        <div className='mt-4 text-center'>
                            <Button variant='ghost' className='text-[#025AE0] text-base font-medium'>View Original Purchase <ChevronRight /></Button>
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
                                <div className='h-80 flex flex-col justify-center items-center'>
                                    <h1 className='text-[#6B6B6B] text-sm mb-4'>No attchments</h1>
                                    <Button variant='outline'>
                                        <GoUpload />Attachment
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value='vendor' className='space-y-4'>
                        <div className='w-full pt-4 bg-white'>
                            <Typography className="text-[#474747] text-base px-4">Invoice from Vendor</Typography>
                            <div>

                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div >
        </>
    )
}

export default PurchaseReturnTabs