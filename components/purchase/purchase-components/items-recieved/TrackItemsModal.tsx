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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import { CalendarIcon, X } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import AddInInventoryModal from './AddInInventoryModal'

const TrackItemsModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    const [openCal, setOpenCal] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [showAddInInventory, setShowAddInInventory] = useState(false)

    const handleNext = () => {
        onOpenChange(false)
        setShowAddInInventory(true)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className='[&>button]:hidden p-0 min-w-lg max-h-vh flex flex-col'>
                    <DialogHeader className="flex-shrink-0">
                        <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                            <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'>
                                <CiBoxes />Track recevied items
                            </DialogTitle>
                            <DialogClose asChild>
                                <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                            </DialogClose>
                        </div>
                    </DialogHeader>

                    <div>
                        <div className="flex flex-row items-start justify-between px-6 mb-6">
                            <Label><span className="text-red-500 ml-1">*</span>Return Date:</Label>
                            <Popover open={openCal} onOpenChange={setOpenCal}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-80 justify-between font-normal"
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
                        <div className='px-6 border-t pt-3'>
                            <span className='text-base text-[#474747]'>Please mention which item have been delivered from this order</span>
                            <div className='mt-4'>
                                <RadioGroup defaultValue="business">
                                    <div className="w-full flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="business" id="business" />
                                        <Image src="/itemsBoxes.png" alt='itembox' width={40} height={40} />
                                        <Label htmlFor="business">Partial Order Recieved?</Label>
                                    </div>
                                    <div className="w-full flex items-center space-x-4 border p-4">
                                        <RadioGroupItem value="individual" id="individual" />
                                        <Image src="/Vector.png" alt='vector' width={40} height={40} />
                                        <Label htmlFor="individual">Full Order Recieved?</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                        <Button variant="outline" className='mr-auto'>Back</Button>
                        <Button variant="primary" className='px-5' onClick={handleNext}>Next</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AddInInventoryModal open={showAddInInventory} onOpenChange={setShowAddInInventory} />
        </>
    )
}

export default TrackItemsModal