'use client'

import React, { useState } from 'react'
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
import { BiReceipt } from 'react-icons/bi'
import UploadDebitInDebitUpdate from './UploadDebitInDebitUpdate'

const UploadDebitInDebit = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isFileModalOpen, setFileModalOpen] = useState(false)

    const handleNext = () => {
        if (selectedFile) {
            setFileModalOpen(true)
            onOpenChange(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='[&>button]:hidden p-0 rounded-none min-w-2xl'>
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <BiReceipt />Upload Debit Note
                            </DialogTitle>
                            <DialogClose
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div className='px-6 mb-6'>
                        <div className='flex flex-col space-y-2'>
                            <p className='text-xl text-[#474747]'>Upload Debit Note</p>
                            <p className='text-base text-[#474747]'>Please upload the Debit note recieved from the Vendor</p>
                            <label
                                className="w-full border-2 border-dashed border-blue-500 bg-blue-50 rounded-md px-6 py-16 text-center cursor-pointer hover:border-blue-400 focus:outline-none"
                            >
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
                                    name="invoice"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2 -mt-4">
                        <Button
                            variant="ghost"
                            className='mr-auto'
                            type="button"
                        >
                            Back
                        </Button>
                        <Button
                            variant="primary"
                            className='px-5'
                            type="button"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <UploadDebitInDebitUpdate open={isFileModalOpen} onOpenChange={setFileModalOpen} file={selectedFile} />
        </>
    )
}

export default UploadDebitInDebit