import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BiReceipt } from 'react-icons/bi'
import DatePickerComponent from '@/components/DatePickerComponent'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useDebitNoteUploaded } from '@/stores/useCreditNoteStore'
import DebitItemsReturned from './DebitItemsReturned';

type UploadDebitInDebitUpdateProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file: File | null;
}

const UploadDebitInDebitUpdate = ({ open, onOpenChange, file }: UploadDebitInDebitUpdateProps) => {
    const [recievedDate, setRecievedDate] = useState<Date | undefined>(new Date());
    const [openItemsModal, setOpenItemsModal] = useState(false)

    const handleSaveDebit = () => {
        onOpenChange(false)
        setOpenItemsModal(true)
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

                    <div className='px-6'>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <p className='text-[#474747] text-xl'>Debit Note from Vendor</p>
                                <p className='text-[#474747] text-base'>You have uploaded Debit Note from the Vendor</p>
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
                                    <Label htmlFor="recievedDate" className="text-sm font-medium">
                                        <span className="text-red-500 ml-1">*</span>Date Recieved
                                    </Label>
                                    <DatePickerComponent date={recievedDate} setDate={setRecievedDate}>
                                        <Button
                                            variant={"outline"}
                                            className={cn("w-full justify-start text-left font-normal mt-1", !recievedDate && "text-muted-foreground")}
                                        >
                                            {recievedDate ? format(recievedDate, "PPP") : <span className='w-full flex justify-between items-center'>Pick a date <CalendarIcon /></span>}
                                        </Button>
                                    </DatePickerComponent>
                                </div>
                                <div>
                                    <Label htmlFor="dueDate" className="text-sm font-medium">
                                        <span className="text-red-500 ml-1">*</span>Settlement Mode
                                    </Label>
                                    <Select defaultValue="cash">
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select payment mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='flex justify-end'>
                            <div className="w-3/4 space-y-2 py-4 bg-[#FAFAFA]">
                                <div className="flex justify-between text-sm px-4">
                                    <span className="text-[#474747]">Sub Total (₹)</span>
                                    <Input className='w-1/2' placeholder='Enter Amt in Debit Note' />
                                </div>
                                <hr />
                                <div className="flex justify-between px-4">
                                    <span className="text-[#474747] text-lg">Settlement Amt:</span>
                                    <span className="text-base text-[#7F7B78]">₹ <span className='text-xl text-[#131415]'>00</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                        <Button variant="outline" className='mr-auto'>Back</Button>
                        <Button variant="primary" className='px-5' onClick={handleSaveDebit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <DebitItemsReturned open={openItemsModal} onOpenChange={setOpenItemsModal} />
        </>
    )
}

export default UploadDebitInDebitUpdate