'use client'

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
import { CiCircleAlert } from 'react-icons/ci'
import { ChevronRight, Upload, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useRouter } from 'next/navigation'

const ReasonForDebit = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const router = useRouter()

    const handleCreateSalesReturn = () => {
        router.push("/debit/view")
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none min-w-5xl'
                >
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <CiCircleAlert className='text-[#FAAD14] h-6 w-6' />Reson of Sales return
                            </DialogTitle>
                            <DialogClose
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div className='px-6 space-y-3 w-full mb-2'>
                        <p className='text-[#474747] text-base'>Reson of Debit note</p>

                        <div className='space-y-3 w-full'>
                            <div className='flex flex-row items-start gap-4'>
                                <Checkbox className='mt-1' />
                                <div>
                                    <p className='text-[#242424] text-base'>Product damaged</p>
                                    <span className='text-[#6B6B6B] text-sm'>The items delivered were damaged</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-start gap-4'>
                                <Checkbox className='mt-1' />
                                <div>
                                    <p className='text-[#242424] text-base'>Customer didn't like the product</p>
                                    <span className='text-[#6B6B6B] text-sm'>The customer didn&apos;t like the item(s) delivered to them</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-start gap-4'>
                                <Checkbox className='mt-1' />
                                <div>
                                    <p className='text-[#242424] text-base'>Low Quality Products</p>
                                    <span className='text-[#6B6B6B] text-sm'>The items delivered are low quality</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-start gap-4'>
                                <Checkbox className='mt-1' />
                                <div>
                                    <p className='text-[#242424] text-base'>Item Expired</p>
                                    <span className='text-[#6B6B6B] text-sm'>The items surpassed expiry date and are no longer useful</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-start gap-4'>
                                <Checkbox className='mt-1' />
                                <div className='w-full'>
                                    <p className='text-[#242424] text-base mb-1'>Others...</p>
                                    <div className='flex flex-row items-start w-3/4'>
                                        <p className='text-[#000000D9] text-sm w-2/5'>Please mention:</p>
                                        <Textarea
                                            placeholder='Please mention reason of return'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2 -mt-4">
                        <Button
                            variant="ghost"
                            className='mr-auto'
                            type="button"
                        >
                            Cancel
                        </Button>
                        <div className='flex flex-row gap-4'>
                            <div className='flex items-center gap-2'>
                                <Checkbox /> Mark items returned today
                            </div>
                            <Button
                                variant='primary'
                                type="button"
                                onClick={handleCreateSalesReturn}
                            >
                                Done
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ReasonForDebit