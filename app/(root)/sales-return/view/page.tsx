'use client'

import { Button } from '@/components/ui/button'
import ViewPageSkeleton from '@/components/ViewPageSkeleton'
import { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreditTabContent from '@/components/sales-return-components/CreditTabContent'
import { LuFileMinus2 } from 'react-icons/lu'
import { ChevronRight } from 'lucide-react'
import RecordPaymentModal from '@/components/RecordPaymentModal'
import MakePaymentModal from '@/components/sales-return-components/MakePaymentModal'
import CreditNoteModal from '@/components/sales-return-components/credit-modals/CreditNoteModal'
import { useCreditTabOpen } from '@/stores/useCreditNoteStore'

const ViewPurchaseReturn = () => {
    const { setShowMenuForCredit } = useCreditTabOpen();
    const [isSent, setIsSent] = useState(false)
    const [showCreditModal, setShowCreditModal] = useState(false)
    const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false)
    const [showMakePaymentModal, setShowMakePaymentModal] = useState(false)

    const handleMarkAsSent = () => {
        setIsSent(true)
    }

    const handleCreateCreditNote = () => {
        setShowCreditModal(true)
    }

    const handleOpenRecordPaymentModal = () => {
        setShowRecordPaymentModal(true)
    }

    const handleMakePaymentModal = () => {
        setShowMakePaymentModal(true)
    }

    const handleCreditTab = () => {
        setShowMenuForCredit(true)
    }

    return (
        <ViewPageSkeleton
            title="View Sales Return"
            isSent={isSent}
            onMarkAsSent={handleMarkAsSent}
            primaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleMarkAsSent}>
                    <AiOutlineCheck className='h-4 w-4' /> Mark as Sent
                </Button>
            }
            secondaryAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleCreateCreditNote}>
                    <LuFileMinus2 className='h-4 w-4' />
                    Create Credit Note
                </Button>
            }
            createCreditNote={
                <CreditNoteModal open={showCreditModal} onOpenChange={setShowCreditModal} />
            }
            thirdAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleOpenRecordPaymentModal}>
                    <LuFileMinus2 className='h-4 w-4' />
                    Record Payment Recieved<ChevronRight />
                </Button>
            }
            recordPaymentModal={
                <RecordPaymentModal open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal} />
            }
            fourthAction={
                <Button className='bg-blue-500 hover:bg-blue-700' onClick={handleMakePaymentModal}>
                    <LuFileMinus2 className='h-4 w-4' /> Return Payment<ChevronRight />
                </Button>
            }
            makePaymentModal={
                <MakePaymentModal open={showMakePaymentModal} onOpenChange={setShowMakePaymentModal} />
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
            leftTabs={
                < div className='p-4' >
                    <p className='font-medium'>Items Returned</p>
                    <ul className='text-sm text-[#6B6B6B] list-disc ml-5'>
                        <li>Adidas Sport Shoes x 3</li>
                        <li>JimJam Biscuits x 12</li>
                        <li>Atim Hair Oil x 5</li>
                    </ul>
                </div >
            }
            rightContent={
                <div className='h-full w-full'>
                    <Tabs defaultValue="sales" onValueChange={(value) => setShowMenuForCredit(value === "credit")}>
                        <div className='p-1 border-b'>
                            <TabsList className="bg-white">
                                <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="sales">Sales Return</TabsTrigger>
                                <TabsTrigger className='shadow-none data-[state=active]:shadow-sm' value="credit">Credit Note</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value='sales'>
                            This is for sales template
                        </TabsContent>
                        <TabsContent value='credit'>
                            <CreditTabContent />
                        </TabsContent>
                    </Tabs>
                </div >
            }
        />
    )
}

export default ViewPurchaseReturn;