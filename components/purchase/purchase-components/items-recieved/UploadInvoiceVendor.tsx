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
import { Input } from '@/components/ui/input'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { BiReceipt } from 'react-icons/bi'

const UploadInvoiceVendor = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className='[&>button]:hidden p-0 rounded-none min-w-2xl'
            >
                <DialogHeader className='mb-2'>
                    <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                        <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                            <BiReceipt />Upload Invoice of Vendor
                        </DialogTitle>
                        <DialogClose
                            className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className='px-6'>
                    <div className='flex flex-row items-center gap-4 bg-green-100 p-4 rounded-lg border border-[#E8E8E8]'>
                        <div className='p-0.5 bg-white rounded-full'>
                            <IoCheckmarkCircle className='w-10 h-10 text-green-500' />
                        </div>
                        <div>
                            <p className='text-[#474747] text-xl'>Items Successfully Added</p>
                            <p className='text-[#6B6B6B] text-sm'>Items from purchase are successfully added in your inventory</p>
                        </div>
                    </div>
                    <hr className='my-6' />
                    <div className='flex flex-col space-y-2'>
                        <p className='text-xl text-[#474747]'>Upload Vendor Invoice</p>
                        <p className='text-base text-[#474747]'>Upload the invoice recieved from Vendor to track outgoing payments</p>
                        <div className="w-full border-2 border-dashed border-blue-500 bg-blue-50 rounded-md px-6 py-16 text-center cursor-pointer hover:border-blue-400 focus:outline-none">
                            <Upload className="mx-auto text-blue-500 mb-2" size={24} />
                            <p className="text-sm text-gray-600">
                                Drag & Drop file here or{" "}
                                <span className="text-blue-600 font-medium hover:underline">
                                    Click here
                                </span>
                            </p>
                            <Input
                                type="file"
                                accept="image/*"
                                name="logo"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="w-full flex justify-end border-t px-6 py-2 mt-4">
                    <Button
                        variant="primary"
                        className='px-5'
                        type="button"
                    >
                        Will do it later
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadInvoiceVendor