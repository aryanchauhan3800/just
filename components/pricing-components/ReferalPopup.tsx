import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ReferalPopup = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger className='text-blue-600'>Enter Refereal Code</DialogTrigger>
                <DialogContent>
                    <DialogTitle hidden></DialogTitle>
                    <DialogHeader>
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                            Referral Code:
                        </label>
                        <Input
                            type="text"
                            className=""
                            placeholder="Enter your referral code"
                        />
                        <Button
                            className="mt-4 w-full rounded-md bg-blue-500 text-white py-2 px-4"
                        >
                            Apply Discount
                        </Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReferalPopup