import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { CalendarIcon, X } from 'lucide-react'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CreditNoteGenerateModal from './CreditNoteGenerateModal'
import { LuFileMinus2 } from 'react-icons/lu'

const CreditNoteModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [showCreditGenerateModal, setShowCreditGenerateModal] = useState(false)
    const [openCal, setOpenCal] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const handleMarkAsRecieved = () => {
        onOpenChange(false)
        setShowCreditGenerateModal(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className='[&>button]:hidden p-0 rounded-none'
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
                        <p className='text-base text-[#474747] mb-2'>
                            Create Debit Note by marking all items as <span className='text-black'>Returned</span>
                        </p>
                        <div className="flex flex-row items-center justify-between">
                            <Label><span className="text-red-500 ml-1">*</span>Return Date:</Label>
                            <Popover open={openCal} onOpenChange={setOpenCal}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <CalendarIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date)
                                            setOpenCal(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter className="w-full flex justify-between border-t px-6 py-2 -mt-4">
                        <Button
                            variant="outline"
                            className='mr-auto'
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className='px-5'
                            type="button"
                            onClick={handleMarkAsRecieved}
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <CreditNoteGenerateModal open={showCreditGenerateModal} onOpenChange={setShowCreditGenerateModal} />
        </>
    )
}

export default CreditNoteModal