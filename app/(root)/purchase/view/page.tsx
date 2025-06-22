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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Avatar } from '@mui/material'
import { ChevronRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { GoDownload } from "react-icons/go";
import { FaCrown, FaWhatsapp } from 'react-icons/fa6';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiOutlineBanknotes, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { CiAt } from 'react-icons/ci';
import { LiaSmsSolid } from 'react-icons/lia';
import Image from 'next/image';
import InvoiceMail from '@/components/invoice-components/view-invoice-components/InvoiceMail';
import MoreOptionsDropdown from '@/components/purchase/purchase-components/MoreOptionsDropdown';
import { RiSendPlaneFill } from 'react-icons/ri';
import PurchaseTabs from '@/components/purchase/purchase-components/PurchaseTabs';
import PurchaseTabContent from '@/components/purchase/purchase-components/PurchaseTabContent'
import { useAddedToInventory, useInvoiceUploadDone } from '@/stores/useCreditNoteStore'
import { IoMdShare } from 'react-icons/io'
import PurchasePaymentModal from '@/components/purchase/PurchasePaymentModal'
import PurchaseReturnModal from '@/components/purchase/PurchaseReturnModal'

const Page = () => {
    const router = useRouter();
    const { isInvoiceUploaded } = useInvoiceUploadDone()
    const { itemsAdded } = useAddedToInventory()
    const [isSent, setIsSent] = useState(false)
    const [isAccepted, setIsAccepted] = useState(false)
    const [isReminderSet, setIsReminderSet] = useState(false)
    const [isMailOpen, setIsMailOpen] = useState(false)
    const [showHeadsUpDialog, setShowHeadsUpDialog] = useState(false)
    const [dontAskAgain, setDontAskAgain] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showPurchaseReturn, setShowPurchaseReturn] = useState(false)

    console.log(isInvoiceUploaded)

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

    const handleMail = () => {
        setIsMailOpen(true)
    }

    const handleSetReminder = () => {
        setIsReminderSet(true)
    }

    const handleAsAccepted = () => {
        setIsAccepted(true)
    }

    const handleMarkAsReceived = () => {
        console.log(true)
    }

    const handleCustomizeTemplate = () => {
        router.push("/purchase/view/[id]/customize")
    }

    const context = {
        status: false,
        isSent: isSent,
        isReminderSent: isReminderSet,
        itemsReceived: false,
        isAccepted: isAccepted,
        purchaseOrderDone: itemsAdded
    };

    return (
        <>
            <div className='h-full'>
                <div className='flex flex-row justify-between items-center border-b py-2 px-4 bg-white'>
                    <h1 className='text-2xl text-[#474747]'>
                        {
                            itemsAdded ? "View Purchase" : "View Purchase Order"
                        }
                    </h1>
                    <div className='flex flex-row items-center gap-4'>
                        <div className='space-x-4'>
                            {/* Show only if items are not yet added that means it is still a purchase order */}
                            {itemsAdded ? (
                                <Button className='no_outline_btn py-1 pl-3 rounded-none'><IoMdShare />Share</Button>
                            ) : (
                                <>
                                    {/* Show if not sent yet */}
                                    {!isSent ? (
                                        <>
                                            <Button className='no_outline_btn'>
                                                <FiEdit /> Edit Purchase Order
                                            </Button>

                                            <Button
                                                className='no_outline_btn border-l py-1 pl-3 rounded-none'
                                                onClick={handleCustomizeTemplate}
                                            >
                                                <IoColorPaletteOutline /> Customize Template
                                            </Button>

                                            <Button
                                                className='no_outline_btn border-l py-1 pl-3 rounded-none'
                                                onClick={handleButtonClick}
                                            >
                                                <AiOutlineCheck className='h-4 w-4' /> Mark as Sent
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            {/* Sent but not yet accepted or received */}
                                            {!isAccepted ? (
                                                <Button
                                                    className='no_outline_btn py-1 pl-3 rounded-none'
                                                    onClick={handleAsAccepted}
                                                >
                                                    <AiOutlineCheck className='h-4 w-4' /> Mark as Accepted
                                                </Button>
                                            ) : (
                                                <Button
                                                    className='no_outline_btn py-1 pl-3 rounded-none'
                                                    onClick={handleMarkAsReceived}
                                                >
                                                    <AiOutlineCheck className='h-4 w-4' /> Mark as Items Received
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                            <Button className='no_outline_btn border-l py-1 pl-3 rounded-none'><GoDownload />PDF</Button>
                        </div>

                        {!isSent ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className='flex items-center gap-1 p-2 rounded-sm text-white bg-blue-500 hover:bg-blue-700'
                                >
                                    <RiSendPlaneFill />Share
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className='flex justify-between items-center gap-6'>
                                        <span className='flex items-center gap-2'>
                                            <Image src="/logo.svg" alt='karosauda' width={12} height={12} />
                                            Share in Karosauda
                                        </span>
                                        <span className='text-yellow-500'><FaCrown /></span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2'>
                                        <FaWhatsapp className='text-green-500' />Whatsapp
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2 hover:cursor-pointer' onClick={handleMail}>
                                        <CiAt />Mail
                                    </DropdownMenuLabel>
                                    <InvoiceMail open={isMailOpen} onOpenChange={setIsMailOpen} />
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2'><LiaSmsSolid />SMS</DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                {
                                    isInvoiceUploaded ? (
                                        <Button className='bg-blue-500 hover:bg-blue-700' onClick={() => setShowPaymentModal(true)}>
                                            Clear Vendor Payment
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button className='bg-blue-500 hover:bg-blue-700'>
                                            <HiOutlineBanknotes className="rotate-180 h-4 w-4" />
                                            Upload Invoice from Vendor
                                        </Button>
                                    )
                                }
                            </>
                        )}

                        <MoreOptionsDropdown context={context} onPurchaseReturnClick={() => setShowPurchaseReturn(true)} />
                    </div>

                    <Dialog open={showHeadsUpDialog} onOpenChange={setShowHeadsUpDialog}>
                        <DialogContent className='[&>button]:hidden p-0'>
                            <DialogHeader>
                                <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                    <DialogTitle className='text-2xl text-[#025AE0] flex items-center gap-2'><HiOutlineExclamationTriangle />Head&apos;s Up</DialogTitle>
                                    <DialogClose asChild>
                                        <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                    </DialogClose>
                                </div>
                                <DialogDescription className='flex flex-col p-6 gap-4'>
                                    <span>You sure you want to mark it as Sent?</span>
                                    <span>Sent Purchase Orders can&apos;t be Edited</span>
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
                </div >

                <div className='flex flex-row justify-between h-full'>

                    <div className='max-w-[420px] h-full border-r bg-white'>
                        <div className='flex flex-row items-center mb-4 gap-4 p-4'>
                            <Avatar>
                                A
                            </Avatar>
                            <div>
                                <h1 className='text-base text-[#242424]'>Archana Singh</h1>
                                <p className='text-sm text-[#6B6B6B]'>PO-000001</p>
                            </div>
                        </div>
                        <div className='w-2/3 mx-auto space-y-4'>
                            <div>
                                <p className='text-sm text-[#8F8F8F]'>Order Amount</p>
                                <p className='text-base text-[#242424]'>4000000000</p>
                            </div>
                            <div>
                                <div className='grid grid-cols-2'>
                                    <span className='text-sm text-[#8F8F8F]'>Status:</span>
                                    <span>Not Sent</span>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <span className='text-sm text-[#8F8F8F]'>Date created:</span>
                                    <span className='text-sm text-[#6B6B6B]'>12 Mar, 2025</span>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <span className='text-sm text-[#8F8F8F]'>Valid to:</span>
                                    <span className='text-sm text-[#6B6B6B]'>12 Apr, 2025</span>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <span className='text-sm text-[#8F8F8F]'>Validity:</span>
                                    <span className='text-sm text-[#6B6B6B]'>1 month</span>
                                </div>
                            </div>
                        </div>

                        <PurchaseTabs isSent={isSent} isAccepted={isAccepted} setIsAccepted={setIsAccepted} />
                    </div>

                    <div className='w-full border'>
                        <div className='h-full w-full' >
                            <Tabs defaultValue="order">
                                <div className='p-1 border-b'>
                                    <TabsList className="bg-white">
                                        <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="order">Purchase Order</TabsTrigger>
                                        <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="purchase">Purchase</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value='order'>
                                    This is for purchase order
                                </TabsContent>
                                <TabsContent value='purchase'>
                                    <PurchaseTabContent isSent={isSent} isAccepted={isAccepted} setIsAccepted={setIsAccepted} />
                                </TabsContent>
                            </Tabs>
                        </div >
                    </div>
                </div>
            </div >
            <PurchasePaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
            <PurchaseReturnModal open={showPurchaseReturn} onOpenChange={setShowPurchaseReturn} />
        </>
    )
}

export default Page
