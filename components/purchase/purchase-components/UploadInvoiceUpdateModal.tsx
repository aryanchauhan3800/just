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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BiReceipt } from 'react-icons/bi'
import DatePickerComponent from '@/components/DatePickerComponent'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
import { useInvoiceUploadDone } from '@/stores/useCreditNoteStore'

type UploadInvoiceUpdateModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File | null;
}

const UploadInvoiceUpdateModal = ({ open, onOpenChange, file }: UploadInvoiceUpdateModalProps) => {
    const { setIsInvoiceUploaded } = useInvoiceUploadDone();
    const [recievedDate, setRecievedDate] = useState<Date | undefined>(new Date());
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const handleSaveInvoice = () => {
        onOpenChange(false)
        setIsInvoiceUploaded(true)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='[&>button]:hidden p-0 rounded-none min-w-3xl'>
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
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            <p className='text-[#474747] text-xl'>Vendor&apos;s Invoice</p>
                            <p className='text-[#474747] text-base'>The invoice recieved from Vendor tracks outgoing payments</p>
                        </div>
                        <p className='text-[#474747] text-base'>Replace File</p>
                    </div>
                    <div className='grid grid-cols-[1fr_1.5fr] gap-4 mt-2'>
                        <div>
                            {file && file.type.startsWith('image/') && (
                                <img src={URL.createObjectURL(file)} alt="Invoice Preview" className="mt-4 w-full max-w-sm" />
                            )}
                        </div>
                        <div className='space-y-2'>
                            <div>
                                <Label htmlFor="recievedDate" className="text-sm font-medium text-gray-700">
                                    <span className="text-red-500 ml-1">*</span>Date Recieved
                                </Label>
                                <DatePickerComponent date={recievedDate} setDate={setRecievedDate}>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !recievedDate && "text-muted-foreground")}
                                    >
                                        {recievedDate ? format(recievedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                            <div>
                                <Label htmlFor="dueDate" className="text-sm font-medium text-red-500 flex items-center">
                                    <span className="text-red-500 ml-1">*</span>Due Date
                                </Label>
                                <DatePickerComponent date={dueDate} setDate={setDueDate}>
                                    <Button
                                        variant={"outline"}
                                        className={cn("w-full justify-start text-left font-normal mt-1", !dueDate && "text-muted-foreground")}
                                    >
                                        {dueDate ? format(dueDate, "PPP") : <span className='flex w-full items-center justify-between'>Select Due Date <CalendarIcon /></span>}
                                    </Button>
                                </DatePickerComponent>
                            </div>
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div className='flex justify-end'>
                        <div className="w-3/4 space-y-2 p-4 bg-[#FAFAFA]">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#474747]">Sub Total (₹)</span>
                                <Input className='w-2/3' placeholder='Enter Total Amt of Invoice' />
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className='flex flex-row items-center gap-2 text-[#474747]'><Checkbox />Deduct TDS:</span>
                                <Input className='w-2/3' placeholder='Enter TDS' />
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <span className="text-[#474747] text-lg">Total Invoice Amt:</span>
                                <span className="text-base text-[#7F7B78]">₹ <span className='text-xl text-[#131415]'>7,30,000</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                    <Button variant="outline" className='mr-auto'>Back</Button>
                    <Button variant="primary" className='px-5' onClick={handleSaveInvoice}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadInvoiceUpdateModal