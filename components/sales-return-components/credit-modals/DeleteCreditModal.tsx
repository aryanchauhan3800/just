import React from 'react'
import { InvoiceDrawerProps } from '@/types/dashboardAndInvoiceTypes'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'

const DeleteCreditModal = ({ open, onOpenChange }: InvoiceDrawerProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='[&>button]:hidden p-0'>
                <DialogHeader>
                    <div className='flex flex-row justify-between items-center border-b py-4 px-6'>
                        <DialogTitle className='text-lg text-[#474747] flex items-center gap-2'><HiOutlineExclamationCircle className='text-[#025AE0]' />Head&apos;s Up</DialogTitle>
                        <DialogClose asChild>
                            <X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
                        </DialogClose>
                    </div>
                </DialogHeader>

                <DialogDescription className='flex flex-col p-6 gap-4'>
                    <span className='text-base text-[#6B6B6B]'>Are you sure you want to delete the Credit Note to <span className='text-[#242424]'>Archana Singh</span> ?</span>
                </DialogDescription>


                <DialogFooter className="flex-shrink-0 w-full flex justify-between border-t shadow-2xl px-6 py-2">
                    <Button variant="ghost" className='mr-auto'>Keep it</Button>
                    <Button className='px-5 bg-red-500'>Delete Credit Note</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCreditModal