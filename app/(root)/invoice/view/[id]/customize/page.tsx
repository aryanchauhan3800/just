'use client'

import ColorPicker from '@/components/invoice-components/ColorPicker'
import InvoiceFields from '@/components/invoice-components/InvoiceFields'
import TemplateTabs from '@/components/invoice-components/TemplateTabs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()

    return (
        <div>
            <div className="flex justify-between items-center py-2 px-4 border-b bg-white">
                <h1 className="text-xl text-[#474747]">Customize Invoice Template</h1>
                <div className='space-x-2'>
                    <Button variant='ghost' onClick={() => router.push("/invoice/view/[id]")}>Cancel</Button>
                    <Button variant='primary'>Apply Changes</Button>
                </div>
            </div>
            <div className='grid grid-cols-[8fr_1fr] gap-8'>
                <div className='border w-full'>Template</div>
                <div className='border space-y-4'>
                    <TemplateTabs />
                    <ColorPicker />
                    <InvoiceFields />
                </div>
            </div>
        </div>

    )
}

export default page