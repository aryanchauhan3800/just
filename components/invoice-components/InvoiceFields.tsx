import React from 'react'
import { Card } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const InvoiceFields = () => {
    return (
        <Card className='border-none shadow-none rounded-none py-4'>
            <h1 className='px-4 text-[#474747] text-base'>Customize Invoice Fields</h1>
            <div className='space-y-4'>
                <div className='px-6 space-y-4'>
                    <div className="flex items-center gap-3">
                        <Checkbox id="logo" />
                        <Label htmlFor="logo">Company Logo</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="email" />
                        <Label htmlFor="email">Your Email</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="name" />
                        <Label htmlFor="name">Show your name in Company Address</Label>
                    </div>
                </div>

                <hr />

                <div className='px-6 space-y-4'>
                    <div className="flex items-center gap-3">
                        <Checkbox id="qr" />
                        <Label htmlFor="qr">QR code for Payment</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="address" />
                        <Label htmlFor="address">Shipping Address</Label>
                    </div>
                </div>

                <hr />

                <div className='px-6 space-y-4'>
                    <div className="flex items-center gap-3">
                        <Checkbox id="hsn" />
                        <Label htmlFor="hsn">HSN code for items</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox id="discount" />
                        <Label htmlFor="logo">Discount on each item</Label>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default InvoiceFields