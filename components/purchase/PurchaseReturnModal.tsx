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
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Image from 'next/image';
import { DialogClose } from '@radix-ui/react-dialog';
import ItemsReturnModal from './ItemsReturnModal';

const PurchaseReturnModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [showItemsReturnModal, setShowItemsReturnModal] = useState(false)

    const handleNext = () => {
        onOpenChange(false)
        setShowItemsReturnModal(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='[&>button]:hidden p-0 rounded-none max-w-md'>
                    <DialogHeader className='mb-2'>
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-2xl flex items-center gap-2'>
                                <CiBoxes />Purchase Return
                            </DialogTitle>
                            <DialogClose asChild>
                                <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                            </DialogClose>
                        </div>
                    </DialogHeader>
                    <div className='px-6 space-y-4'>
                        <div>
                            <p>Are you returning the purchase from <span>Amit Srivastav?</span></p>
                            <div className='mt-4'>
                                <RadioGroup defaultValue="business">
                                    <div className="flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="business" id="business" />
                                        <Image src="/redbox.png" alt='redbox' width={40} height={40} />
                                        <Label htmlFor="business">Partial Order Return</Label>
                                    </div>
                                    <div className="flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="individual" id="individual" />
                                        <Image src="/whitebox.png" alt='whitebox' width={40} height={40} />
                                        <Label htmlFor="individual">Full Order Return</Label>
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
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ItemsReturnModal open={showItemsReturnModal} onOpenChange={setShowItemsReturnModal} />
        </>
    )
}

export default PurchaseReturnModal