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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import parse from 'html-react-parser';
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Avatar } from '@mui/material'
import { ChevronLeft, MoreVerticalIcon, Upload, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import InvoiceTabs from '@/components/invoice-components/draft-invoice-components/InvoiceTabs';
import { useParams, useRouter } from 'next/navigation';
import { FiEdit } from 'react-icons/fi';
import { IoColorPaletteOutline, IoShareSocial } from 'react-icons/io5';
import { GoDownload } from "react-icons/go";
import { FaArrowsRotate, FaCrown, FaRegBell, FaWhatsapp } from 'react-icons/fa6';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineBanknotes, HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { CiAt } from 'react-icons/ci';
import { LiaSmsSolid } from 'react-icons/lia';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import InvoiceMail from '@/components/invoice-components/view-invoice-components/InvoiceMail';
import { useGetInvoicePrint, useGetParticularInvoice } from '@/hooks/useInvoice';

const Page = () => {
    const router = useRouter();
    const [isSent, setIsSent] = useState(false)
    const [isMailOpen, setIsMailOpen] = useState(false)
    const [showRecordPayment, setShowRecordPayment] = useState(false)
    const [showHeadsUpDialog, setShowHeadsUpDialog] = useState(false)
    const [showReminderDialog, setShowReminderDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [dontAskAgain, setDontAskAgain] = useState(false)
    const params = useParams()
    const id = params.id
    const {data:invoiceTemplateHtml,isLoading:isLoadingInvoiceTemplateHtml,isError:isErrorInvoiceTemplateHtml}=useGetInvoicePrint(id,{color:""})
    // console.log({invoiceTemplateHtml})
    const {data:invoiceDetails,isLoading:isInvoiceDetailsLoading,isError:isInvoiceDetailsError}=useGetParticularInvoice(id)
    console.log({invoiceDetails})
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

    const handleRecordPayment = () => {
        setShowRecordPayment(true)
    }

    const handleMail = () => {
        setIsMailOpen(true)
    }

    const handleSetReminder = () => {
        console.log("Payment reminder set")
    }

    const handleCustomizeTemplate = () => {
        router.push("/invoice/view/[id]/customize")
    }

    function extractBodyContent(html: string): { styles: string; body: string }  {
        if(!html) return { styles: '', body: '' }
        const styleMatch = html?.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
        const styles = styleMatch.join("\n");
      
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const body = bodyMatch ? bodyMatch[1] : html;
      
        return { styles, body }
      }
        const { styles, body } = extractBodyContent(invoiceTemplateHtml);
      
    return (
        <div className='h-full'>
            <div className='flex flex-row justify-between items-center border-b py-2 px-4 bg-white'>
                <h1 className='text-2xl text-[#474747]'>View Invoice</h1>
                <div className='flex flex-row items-center gap-4'>
                    <div className='space-x-4'>
                        {!isSent ? (
                            <>
                                <Button className='no_outline_btn'><FiEdit />Edit Invoice</Button>

                                <Button className='no_outline_btn border-l py-1 pl-3 rounded-none'
                                    onClick={handleCustomizeTemplate}
                                >
                                    <IoColorPaletteOutline />Customize Template
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className='no_outline_btn'
                                    onClick={() => setShowReminderDialog(true)}
                                >
                                    <FaRegBell />Set Payment Reminder
                                </Button>
                                <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
                                    <DialogContent className='[&>button]:hidden p-0 rounded-none min-w-2xl'>
                                        <DialogHeader className='mb-2 bg-[#FAFAFA]'>
                                            <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                                <DialogTitle className='text-2xl text-[#474747] flex items-center gap-2'><FaRegBell />Payment Reminder</DialogTitle>
                                                <DialogClose asChild>
                                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                                </DialogClose>
                                            </div>
                                            <DialogDescription className='flex flex-col text-[#474747] p-6 gap-4'>
                                                <span className='text-lg text-black'>Set up Payment Reminder</span>
                                                <span className='text-base'>Now automatically send payment reminders to client, for easy cashflow</span>
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
                                            <Button variant="ghost" className='mr-auto' onClick={() => setShowReminderDialog(false)}>Cancel</Button>
                                            <Button variant="primary" className='px-5' onClick={handleSetReminder}>Save</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger className='focus:outline-none focus:ring-0'>
                                <span className='border-l py-1 pl-3 flex items-center gap-2'><IoShareSocial />Share</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
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

                        <Button className='no_outline_btn border-l py-1 pl-3 rounded-none'><GoDownload />PDF</Button>
                    </div>

                    {!isSent ? (
                        <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleButtonClick}>
                            <AiOutlineCheck className='h-4 w-4' />Mark as Sent
                        </Button>
                    ) : (
                        <Button onClick={handleRecordPayment} className='bg-blue-500 hover:bg-blue-700'>
                            <HiOutlineBanknotes className="rotate-180 h-4 w-4" />
                            Record Payment
                        </Button>
                    )}

                    {
                        isSent ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVerticalIcon className='h-10 w-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E8E8] hover:bg-gray-100' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className='flex justify-between items-center gap-2'>
                                        <span className='flex items-center gap-2'><FaRegBell />Set Payment Reminder</span>
                                        <span className='text-yellow-500'><FaCrown /></span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2'>
                                        <FaArrowsRotate />Convert to Recurring Invoice
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2 text-red-500'>
                                        <MdOutlineStickyNote2 />Credit Note / Sales Return
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2 text-red-500'>
                                        <AiOutlineDelete />Delete Invoice
                                    </DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVerticalIcon className='h-10 w-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E8E8] hover:bg-gray-100' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='hover:cursor-pointer'>
                                    <DropdownMenuLabel className='flex items-center gap-2'><FaArrowsRotate />Convert to Recurring Invoice</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel className='flex items-center gap-2'><FiEdit />Edit Invoice</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel
                                        className='flex items-center gap-2 text-red-500'
                                        onClick={() => setShowDeleteDialog(true)}
                                    >
                                        <AiOutlineDelete />Delete Invoice
                                    </DropdownMenuLabel>
                                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                        <DialogContent className='[&>button]:hidden p-0 rounded-none'>
                                            <DialogHeader className='mb-2'>
                                                <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                                    <DialogTitle className='text-2xl text-[#F5222D] flex items-center gap-2'>
                                                        <HiOutlineExclamationTriangle />Delete Invoice
                                                    </DialogTitle>
                                                    <DialogClose asChild>
                                                        <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                                    </DialogClose>
                                                </div>
                                                <DialogDescription className='flex flex-col text-[#474747] p-6 gap-4'>
                                                    <span className='text-base'>You have already sent this invoice</span>
                                                    <span className='text-base'>Deleting this invoice will remove any record related to it from the data-base</span>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="w-full flex justify-between border-t shadow-2xl px-6 py-2">
                                                <Button variant="primary" className='mr-auto bg-[#F5222D]'>Delete Anyway</Button>
                                                <Button variant="ghost" className='px-5 border'>Create Sales Return Instead</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }
                </div>

                <Dialog open={showRecordPayment} onOpenChange={setShowRecordPayment}>
                    <DialogContent className='[&>button]:hidden p-0 min-w-4xl'>
                        <DialogHeader>
                            <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                                <DialogTitle className='text-2xl text-[#474747] flex items-center gap-2'>
                                    Record Payment Recieved
                                </DialogTitle>
                                <DialogClose asChild>
                                    <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                                </DialogClose>
                            </div>
                        </DialogHeader>

                        <div className='grid grid-cols-2 gap-4 max-w-4xl w-full mx-auto pb-2'>
                            <div className='pl-4'>
                                <div className='flex justify-center items-center h-3/5 bg-gradient-to-b from-[#F9F9F9] to-[#FFFFFF]'>
                                    <Image src="/recordInvoice.png" alt='recordInvoice' height={150} width={150} />
                                </div>
                                <div className='bg-[#FAFAFA] p-4'>
                                    <div className='space-y-2'>
                                        <Avatar>
                                            A
                                        </Avatar>
                                        <h3 className='text-xl text-[#474747]'>{invoiceDetails?.party?.name}</h3>
                                        <p className='text-sm text-[#6B6B6B]'># {invoiceDetails?.invoiceNumber} - Due : {new Date(invoiceDetails?.invoiceDate).toString()}</p>
                                    </div>
                                    <hr className='my-2' />
                                    <div className='flex flex-row gap-20'>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-[#6B6B6B]'>Total Amount:</span>
                                            <span>40,00,000</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-[#6B6B6B]'>Amount Due:</span>
                                            <span>80,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col space-y-4 pr-4'>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Recieving Date:</Label>
                                    <Input type="text" placeholder="Enter the Street name" className="w-2/3" />
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Amount Recieved:</Label>
                                    <Input type="text" placeholder="Enter amount recieved" className="w-2/3" />
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Bank Name:</Label>
                                    <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue defaultValue="hdfc" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hdfc">HDFC</SelectItem>
                                            <SelectItem value="idbi">IDBI</SelectItem>
                                            <SelectItem value="sbi">SBI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Payment Mode:</Label>
                                    <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Cash" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="banking">Net Banking</SelectItem>
                                            <SelectItem value="card">Card</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2 mt-1 px-4">
                                    <Checkbox id="dontAsk" checked={dontAskAgain} onCheckedChange={(checked) => setDontAskAgain(checked as boolean)} />
                                    <Label htmlFor="dontAsk">TDS collected by customer</Label>
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Amount:</Label>
                                    <Input type="text" placeholder="Enter TDS Amount" className="w-2/3" />
                                </div>
                                <div className="grid grid-cols-2 w-72">
                                    <Label><span className="text-red-500 ml-1">*</span>Challan:</Label>
                                    <Button variant="outline">
                                        <Upload className='h-4 w-4 text-[#025AE0]' />
                                        <span className='text-[#242424] text-base'>Click to Upload</span>
                                    </Button>
                                </div>
                                <hr />
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Notes:</Label>
                                    <Input type="text" placeholder="Start writing..." className="w-2/3" />
                                </div>
                                <div className="flex flex-row items-center justify-between">
                                    <Label><span className="text-red-500 ml-1">*</span>Attachments:</Label>
                                    <Button variant="outline" className='w-70'>
                                        <Upload className='h-4 w-4 text-[#025AE0]' />
                                        <span className='text-[#242424] text-base'>Click to Upload</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="w-full flex justify-between border-t shadow-2xl px-6 py-2">
                            <Button variant="ghost" className='mr-auto'><ChevronLeft />Back</Button>
                            <Button variant="primary" className='px-5' onClick={handleSetReminder}>Update</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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

            <div className='flex flex-row justify-between h-full'>

                <div className='max-w-[420px] h-full border-r bg-white'>
                    <div className='flex flex-row items-center mb-4 gap-4 p-4'>
                        <Avatar>
                           {invoiceDetails?.party?.name?.[0]}
                        </Avatar>
                        <div>
                            <h1 className='text-base text-[#242424]'>{invoiceDetails?.party?.name}</h1>
                            <p className='text-sm text-[#6B6B6B]'>{invoiceDetails?.invoiceNumber}</p>
                        </div>
                    </div>
                    <div className='w-2/3 mx-auto space-y-4'>
                        <div>
                            <p className='text-sm text-[#8F8F8F]'>Amount</p>
                            <p className='text-base text-[#242424]'>₹ {invoiceDetails?.totalAmount}</p>
                            <p className='text-sm text-[#8F8F8F]'>Due to {new Date(invoiceDetails?.invoiceDate)?.toLocaleDateString("en-IN")}</p>
                        </div>
                        <div>
                            <div className='grid grid-cols-2'>
                                <span className='text-sm text-[#8F8F8F]'>Status:</span>
                                <span>{invoiceDetails?.status}</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span className='text-sm text-[#8F8F8F]'>Date created:</span>
                                <span className='text-sm text-[#6B6B6B]'>{new Date(invoiceDetails?.createdAt)?.toLocaleDateString("en-IN")}</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span className='text-sm text-[#8F8F8F]'>Valid till Date:</span>
                                <span className='text-sm text-[#6B6B6B]'>{new Date(invoiceDetails?.dueDate)?.toLocaleDateString("en-IN")}</span>
                            </div>
                            <div className='grid grid-cols-2'>
                                <span className='text-sm text-[#8F8F8F]'>Validity:</span>
                                <span className='text-sm text-[#6B6B6B]'>{(invoiceDetails?.paymentTerms)}</span>
                            </div>
                        </div>
                    </div>

                    <InvoiceTabs invoiceDetails={invoiceDetails} />
                </div>

                {/* Placeholder for invoice template */}
                {(!isLoadingInvoiceTemplateHtml && invoiceTemplateHtml) &&  <div className="w-3xl border">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {parse(body)}
    </div>}
                {isLoadingInvoiceTemplateHtml && <div>Loading...</div>}
            </div>
        </div>
    )
}

export default Page
