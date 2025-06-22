import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { CiBoxes } from 'react-icons/ci'
import { CalendarIcon, X } from 'lucide-react'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import DatePickerComponent from '@/components/DatePickerComponent'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import UploadDebitNote from './UploadDebitNote'

const MarkItemReturnedModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(new Date());
    const [showUpload, setShowUpload] = useState(false)

    const handleUpload = () => {
        setShowUpload(true)
        onOpenChange(false)
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
                                <CiBoxes />Mark Items as Returned
                            </DialogTitle>
                            <DialogClose
                                className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border flex items-center justify-center"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div className='px-6 mb-8'>
                        <p className='text-base text-[#474747] mb-2'>
                            Create Debit Note by marking items as <span className='text-black'>Returned</span>
                        </p>
                        <div className='flex flex-row justify-between items-start'>
                            <Label htmlFor="invoiceDate" className="text-sm font-medium text-gray-700">
                                <span className="text-red-500 ml-1">*</span>Returning Date:
                            </Label>
                            <DatePickerComponent date={purchaseDate} setDate={setPurchaseDate}>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-1/2 justify-start text-left font-normal mt-1", !purchaseDate && "text-muted-foreground")}
                                >
                                    {purchaseDate ? format(purchaseDate, "PPP") : <span className='flex flex-row items-center justify-between'>Pick a date <CalendarIcon /></span>}
                                </Button>
                            </DatePickerComponent>
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
                            onClick={handleUpload}
                        >
                            Upload Debit Note
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <UploadDebitNote open={showUpload} onOpenChange={setShowUpload} />
        </>
    )
}

export default MarkItemReturnedModal