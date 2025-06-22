import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LuFileMinus2 } from 'react-icons/lu'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useCreditNoteStore } from '@/stores/useCreditNoteStore'


const CreditNoteGenerateModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const { setShowRecordPayment } = useCreditNoteStore()
    const [selectedReason, setSelectedReason] = useState("sales")

    const options = [
        {
            value: "sales",
            title: "Sales Return",
            description: "Buyer is returning Goods to you",
        },
        {
            value: "excess",
            title: "Excess Invoicing",
            description: "The amount charged is more than it should be",
        },
        {
            value: "tax",
            title: "Incorrect Tax Rate Charged",
            description: "GST was charged at a higher rate than applicable",
        },
        {
            value: "sale",
            title: "Post-Sale Discount",
            description: "Give Discount after the invoice is issued",
        },
    ]

    const handleGenerateCredit = () => {
        onOpenChange(false)
        setShowRecordPayment(true)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className='[&>button]:hidden p-0 rounded-none min-w-2xl'
            >
                <DialogHeader className='mb-2'>
                    <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                        <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                            <LuFileMinus2 />Create Credit Note
                        </DialogTitle>
                        <DialogClose
                            className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <div className='px-6 mb-4'>
                    <p className='mb-4'>Why are you issuing a Credit Note</p>
                    <RadioGroup
                        className='px-4'
                        value={selectedReason}
                        onValueChange={(val) => setSelectedReason(val)}
                    >
                        {options.map((option) => {
                            const isSelected = selectedReason === option.value
                            return (
                                <div key={option.value} className="flex gap-3 items-start">
                                    <RadioGroupItem value={option.value} id={option.value} className='mt-1' />
                                    <div>
                                        <Label
                                            htmlFor={option.value}
                                            className={`text-base ${isSelected ? 'text-[#242424]' : 'text-[#B3B3B3]'}`}
                                        >
                                            {option.title}
                                        </Label>
                                        <div className={`text-sm ${isSelected ? 'text-[#6B6B6B]' : 'text-[#B3B3B3]'}`}>
                                            {option.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </RadioGroup>
                </div>

                <DialogFooter className="w-full flex justify-between border-t shadow-md px-6 py-2 mt-4">
                    <Button
                        variant="ghost"
                        className='mr-auto'
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        className='px-5 bg-red-500 hover:bg-red-600'
                        type="button"
                        onClick={handleGenerateCredit}
                    >
                        Create Credit Note<ChevronRight />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreditNoteGenerateModal