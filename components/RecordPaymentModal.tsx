import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image'
import { Avatar } from '@mui/material'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { ChevronLeft, Upload, X } from 'lucide-react'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes';

const RecordPaymentModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='[&>button]:hidden p-0 min-w-6xl'>
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

                <div className='grid grid-cols-[1.5fr_2fr] gap-8 w-full pb-5 overflow-auto'>
                    <div className='pl-8'>
                        <div className='flex justify-center items-center h-3/5 bg-gradient-to-b from-[#F9F9F9] to-[#FFFFFF]'>
                            <Image src="/recordInvoice.png" alt='recordInvoice' height={150} width={150} />
                        </div>
                        <div className='bg-[#FAFAFA] p-4'>
                            <div className='space-y-2'>
                                <Avatar>
                                    A
                                </Avatar>
                                <h3 className='text-xl text-[#474747]'>Akansha Mishra</h3>
                                <p className='text-sm text-[#6B6B6B]'># INV 000010 - Due : 24 Apr, 2025</p>
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

                    <div className='flex flex-col space-y-4 pr-8 overflow-auto'>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Recieving Date:</Label>
                            <Input type="text" placeholder="Enter the Street name" />
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr] text-[#F5222D]">
                            <Label><span className="ml-1">*</span>Amount Recieved:</Label>
                            <Input type="text" placeholder="Enter amount recieved" />
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Bank Name:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="HDFC" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hdfc">HDFC</SelectItem>
                                    <SelectItem value="idbi">IDBI</SelectItem>
                                    <SelectItem value="sbi">SBI</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Paymeny Mode:</Label>
                            <Select>
                                <SelectTrigger className="w-full">
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
                            <Checkbox id="dontAsk" />
                            <Label htmlFor="dontAsk">TDS collected by customer</Label>
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Amount:</Label>
                            <Input type="text" placeholder="Enter TDS Amount" />
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Challan:</Label>
                            <Button variant="outline" className='w-40'>
                                <Upload className='h-4 w-4 text-[#025AE0]' />
                                <span className='text-[#242424] text-base'>Click to Upload</span>
                            </Button>
                        </div>
                        <hr />
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Notes:</Label>
                            <Input type="text" placeholder="Start writing..." />
                        </div>
                        <div className="grid grid-cols-[1.5fr_2fr]">
                            <Label><span className="text-red-500 ml-1">*</span>Attachments:</Label>
                            <Button variant="outline">
                                <Upload className='h-4 w-4 text-[#025AE0]' />
                                <span className='text-[#242424] text-base'>Click to Upload</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="w-full flex justify-between border-t shadow-2xl px-6 py-2">
                    <Button variant="ghost" className='mr-auto'><ChevronLeft />Back</Button>
                    <Button variant="primary" className='px-5'>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RecordPaymentModal