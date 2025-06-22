import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
const coupons = [
    {
        id: "welcome",
        name: "Welcome Pack",
        percentage: 25,
    },
    {
        id: "referral",
        name: "Referral Member",
        percentage: 30,
    }
]

const page = () => {
    return (
        <div className='w-full'>

            <div className='border-b border-gray-300 mb-6 py-8'>
                <h1 className='pricing_coupon_heading'>Discount Coupons</h1>
                <p className='pricing_coupon_subheading'>Get discount on the pricing plans</p>
            </div>

            <div className='max-w-4xl mx-auto py-10 px-4'>

                <div className='max-w-lg mx-auto mb-8'>
                    <label htmlFor="">Enter Coupon Code:</label>
                    <Input 
                        type='text'
                        placeholder='Enter coupon'
                    />
                </div>

                <p className='mb-4'><span className='font-semibold'>{coupons.length}</span> available Coupons</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {
                        coupons.map((coupon) => (
                            <div key={coupon.id} className="flex flex-col">
                                <div className='p-6 text-white bg-green-500 rounded-t-2xl'>
                                    <h2 className='text-lg'>{coupon.name}</h2>
                                    <p><span className='text-2xl'>{coupon.percentage}%</span> off</p>
                                </div>
                                <div className='p-6 bg-white border border-gray-400 rounded-b-2xl'>
                                    <p>Get {coupon.percentage}% off on the Pricing Plan</p>
                                    <Button className="bg-white hover:bg-white shadow-none text-blue-500 mt-2">Apply</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div >
    )
}

export default page