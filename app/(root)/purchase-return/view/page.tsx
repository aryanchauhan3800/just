'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LuFileMinus2 } from 'react-icons/lu'
import { ChevronRight } from 'lucide-react'
import PurchasePaymentModal from '@/components/purchase/PurchasePaymentModal'
import PurchasePageSkeleton from '@/components/purchase/purchase-return-components/PurchasePageSkeleton'
import MarkItemReturnedModal from '@/components/purchase/purchase-return-components/MarkItemReturnedModal'
import DebitTabContent from '@/components/purchase/purchase-return-components/DebitTabContent'
import { useDebitNoteUploaded } from '@/stores/useCreditNoteStore'
import RecordDebitPayment from '@/components/purchase/purchase-return-components/RecordDebitPayment'
import { HiOutlineBanknotes } from 'react-icons/hi2'

const ViewPurchaseReturn = () => {
    const { isDebitNoteUploaded } = useDebitNoteUploaded()
    const [showMarkItemReturnModal, setShowMarkItemReturnModal] = useState(false)
    const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false)
    const [showMakePaymentModal, setShowMakePaymentModal] = useState(false)

    const handleUploadDebitNote = () => {
        setShowMarkItemReturnModal(true)
    }

    const handleOpenRecordPaymentModal = () => {
        setShowRecordPaymentModal(true)
    }

    const handleMakePaymentModal = () => {
        setShowMakePaymentModal(true)
    }

    return (
        <PurchasePageSkeleton
            title="View Purchase Return"
            isDebitNoteUploaded={isDebitNoteUploaded}
            primaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleUploadDebitNote}>
                    <LuFileMinus2 className='h-4 w-4' />
                    Upload Debit Note
                </Button>
            }
            markItemAsReturned={
                <MarkItemReturnedModal open={showMarkItemReturnModal} onOpenChange={setShowMarkItemReturnModal} />
            }
            secondaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleOpenRecordPaymentModal}>
                    <LuFileMinus2 className='h-4 w-4' />
                    Record Payment Recieved<ChevronRight />
                </Button>
            }
            recordPaymentModal={
                <RecordDebitPayment open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal} />
            }
            thirdAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleMakePaymentModal}>
                    <HiOutlineBanknotes className='rotate-x-180 h-4 w-4' /> Make Payment<ChevronRight />
                </Button>
            }
            makePaymentModal={
                <PurchasePaymentModal open={showMakePaymentModal} onOpenChange={setShowMakePaymentModal} />
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
                    <Tabs defaultValue="return">
                        <div className='p-1 border-b'>
                            <TabsList className="bg-white">
                                <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="return">Purchase Return</TabsTrigger>
                                <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="debit">Debit Note</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value='return'>
                            This is for return
                        </TabsContent>
                        <TabsContent value='debit' className='flex-1 overflow-y-auto'>
                            <div className='h-full overflow-y-auto'>
                                <DebitTabContent isDebitNoteUploaded={isDebitNoteUploaded} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div >
            }
        />
    )
}

export default ViewPurchaseReturn;