'use state'

import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RiSettingsLine } from 'react-icons/ri'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Image from 'next/image';
import ConfirmItemsModal from './ConfirmItemsModal';

const SalesReturnModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [showConfirmItemsModal, setShowConfirmItemsModal] = useState(false)
    const handleClose = () => {
        // Ensure clean state reset
        onOpenChange(false);
    };

    const handleDialogClose = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
    };

    const handleSalesReturnNext = () => {
        handleClose()
        setShowConfirmItemsModal(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none max-w-md'
                    onPointerDownOutside={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                        handleClose();
                    }}
                >
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-2xl flex items-center gap-2'>
                                <CiBoxes />Sales Return
                            </DialogTitle>
                            <button
                                onClick={handleDialogClose}
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </DialogHeader>
                    <div className='px-6 space-y-4'>
                        <div className='w-4/5 flex flex-row justify-between items-start'>
                            <Label htmlFor="salesReturnNo" className="text-sm font-medium text-gray-700 flex items-center">
                                <span className="text-red-500 ml-1">*</span>
                                Sales Return No:
                            </Label>
                            <div className="flex items-center w-1/2">
                                <Input id="salesReturnNo" defaultValue="SR-000001" className="rounded-r-none p-5" />
                                <Button variant="outline" className="rounded-l-none py-5 border-l-0 bg-[#FAFAFA]">
                                    <RiSettingsLine className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className='w-4/5 flex flex-row justify-between items-start'>
                            <Label htmlFor="invoiceNo" className="text-sm font-medium text-gray-700 flex items-center">
                                <span className="text-red-500 ml-1">*</span>
                                Return Back to:
                            </Label>
                            <Select defaultValue="pratapgarh">
                                <SelectTrigger className="flex items-center w-1/2">
                                    <SelectValue placeholder="Select payment terms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pratapgarh">Pratapgarh</SelectItem>
                                    <SelectItem value="net_15">Net 15</SelectItem>
                                    <SelectItem value="net_30">Net 30</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <hr />

                        <div>
                            <span>You are recording Sales return Amit Srivastav?</span>
                            <div className='mt-4'>
                                <RadioGroup defaultValue="business">
                                    <div className="w-4/5 flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="business" id="business" />
                                        <Image src="/redbox.png" alt='redbox' width={40} height={40} />
                                        <Label htmlFor="business">Partial Sales Return</Label>
                                    </div>
                                    <div className="w-4/5 flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="individual" id="individual" />
                                        <Image src="/whitebox.png" alt='whitebox' width={40} height={40} />
                                        <Label htmlFor="individual">Full Sales Return</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="w-full flex justify-between border-t shadow-2xl px-6 py-2">
                        <Button
                            variant="ghost"
                            className='mr-auto'
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className='px-5'
                            type="button"
                            onClick={handleSalesReturnNext}
                        >
                            Next
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ConfirmItemsModal open={showConfirmItemsModal} onOpenChange={setShowConfirmItemsModal} />
        </>
    )
}

export default SalesReturnModal