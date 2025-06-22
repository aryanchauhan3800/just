import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import CreditNoteModal from './credit-modals/CreditNoteModal'

const CreditTabContent = () => {
    const [showCreditModal, setShowCreditModal] = useState(false)
    const handleCreateCredit = () => {
        setShowCreditModal(true)
    }

    return (
        <>
            <div className='w-full h-[670px] px-6 py-4 flex flex-col justify-center items-center'>
                <div className="relative w-28 h-20">
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-white to-purple-100 rounded-full z-0" />
                    <Image
                        src="/creditnote.png"
                        alt="creditNote"
                        width={40}
                        height={40}
                        className="relative z-10 mx-auto"
                    />
                </div>
                <div className='flex flex-col justify-center items-center space-y-2'>
                    <p className='text-[#474747] text-base'>Credit Note</p>
                    <p className='text-[#6B6B6B] text-sm'>Adjust the amount & create Credit Note</p>
                    <Button
                        variant='outline'
                        className='text-[#474747] text-base'
                        onClick={handleCreateCredit}
                    >
                        Create Credit Note<ChevronRight />
                    </Button>
                </div>
            </div>
            <CreditNoteModal open={showCreditModal} onOpenChange={setShowCreditModal} />
        </>
    )
}

export default CreditTabContent