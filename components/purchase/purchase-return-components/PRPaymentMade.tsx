import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RiFileList3Line } from 'react-icons/ri'
import { CiBank } from 'react-icons/ci'

const PRPaymentMade = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='[&>button]:hidden p-0 min-w-2xl max-h-vh flex flex-col'>
                <DialogHeader className="flex-shrink-0">
                    <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                        <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                            <RiFileList3Line />Payment made
                        </DialogTitle>
                        <DialogClose asChild>
                            <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className='px-6'>
                    <div className='flex flex-row justify-between my-2'>
                        <div className='flex items-center gap-2'>
                            <BsArrowUpRightCircleFill className='text-[#F5222D] w-8 h-8 p-1 rounded-full' />
                            I paid
                        </div>
                        <div className='flex items-center gap-2'>
                            <Checkbox />
                            <Label>Full Amount settled</Label>
                        </div>
                    </div>

                    <div className='border rounded-xl flex flex-row w-full mb-4'>
                        <div className='px-4 py-3 w-1/2'>
                            <p className='text-[#242424] text-sm'>To pay <span className='text-[#8F8F8F] text-xs'>for this Debit Note</span></p>
                            <p className='text-[#474747] text-[22px]'>10,000.00</p>
                        </div>
                        <div className='px-4 py-3 w-1/2 border-l'>
                            <p className='text-[#8F8F8F] text-xs flex gap-1'><CiBank className='h-[14px] w-[14px]' />Receiving in</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-row items-center gap-20">
                            <Label className='text-[#F5222D] text-sm'><span className="ml-1">*</span>How much did you pay:</Label>
                            <Input type="text" placeholder="Enter Country" className="w-1/2" />
                        </div>
                    </div>

                    <div className='space-y-4 my-4'>
                        <div className='flex flex-row items-center gap-2'>
                            <Checkbox />
                            <Label>TDS deducted</Label>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex flex-row gap-20'>
                                <Label className='text-sm'>Amount:</Label>
                                <Input className='h-10 w-1/2' placeholder='Enter TDS Amt deducted' />
                            </div>
                            <div className='flex flex-row gap-20'>
                                <Label className='text-sm'>Challan:</Label>
                                <Button variant="outline">
                                    <Upload className='h-4 w-4 text-blue-500' />
                                    <span className='text-black text-sm'>Click to Upload</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                    <Button variant="outline" className='mr-auto' onClick={() => onOpenChange(false)}>Back</Button>
                    <Button variant="primary" className='px-5'>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PRPaymentMade