'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LuFileMinus2 } from 'react-icons/lu'
import { ChevronRight } from 'lucide-react'
import PurchasePaymentModal from '@/components/purchase/PurchasePaymentModal'
import DebitTabContent from '@/components/purchase/purchase-return-components/DebitTabContent'
import { useDebitNoteUploaded } from '@/stores/useCreditNoteStore'
import RecordDebitPayment from '@/components/purchase/purchase-return-components/RecordDebitPayment'
import { HiOutlineBanknotes } from 'react-icons/hi2'
import DebitPageSkeleton from '@/components/debit-components/DebitPageSkeleton'
import PRPaymentModal from '@/components/debit-components/DebitPaymentModal'
import DebitPaymentModal from '@/components/debit-components/DebitPaymentModal'

const ViewPurchaseReturn = () => {
    const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false)
    const [showMakePaymentModal, setShowMakePaymentModal] = useState(false)

    const handleOpenRecordPaymentModal = () => {
        setShowRecordPaymentModal(true)
    }

    const handleMakePaymentModal = () => {
        setShowMakePaymentModal(true)
    }

    return (
        <DebitPageSkeleton
            title="View Debit Note"
            primaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleOpenRecordPaymentModal}>
                    <LuFileMinus2 className='h-4 w-4' />
                    Record Payment Recieved<ChevronRight />
                </Button>
            }
            recordPaymentModal={
                <RecordDebitPayment open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal} />
            }
            secondaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleMakePaymentModal}>
                    <HiOutlineBanknotes className='rotate-x-180 h-4 w-4' /> Make Payment<ChevronRight />
                </Button>
            }
            makePaymentModal={
                <DebitPaymentModal open={showMakePaymentModal} onOpenChange={setShowMakePaymentModal} />
            }
            user={{ name: 'Archana Singh', code: 'PO-000001', avatarLetter: 'A' }}
            infoSection={{
                amount: '₹2400',
                adjustment: '₹2400',
                dueDate: '24-May, 2025',
                details: [
                    { label: 'Payment Status', value: 'Pending' },
                    { label: 'Items Status', value: 'Items not received' },
                    { label: 'Date Created', value: '12 Mar, 2025' },
                    { label: 'Date Returning', value: '--' },
                ],
            }}
            rightContent={
                <div className='h-full w-full' >
                    <DebitTabContent isDebitNoteUploaded={true} />
                </div >
            }
        />
    )
}

export default ViewPurchaseReturn;