'use client'

import React, { useState } from 'react'
import { IoShareSocial } from 'react-icons/io5'
import { Avatar } from '@mui/material'
import SalesReturnTabs from './sales-return-components/SalesReturnTabs'
import { GoDownload } from 'react-icons/go'
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon } from 'lucide-react'
import { CiBoxes } from 'react-icons/ci'
import MarkItemRecievedModal from './sales-return-components/MarkItemRecievedModal'
import { useCreditNoteStore, useCreditTabOpen } from '@/stores/useCreditNoteStore'
import DeleteCreditModal from './sales-return-components/credit-modals/DeleteCreditModal'

type ViewPageSkeletonProps = {
    title: string
    isSent?: boolean
    onMarkAsSent?: () => void
    primaryAction?: React.ReactNode
    secondaryAction?: React.ReactNode
    createCreditNote?: React.ReactNode
    thirdAction?: React.ReactNode
    recordPaymentModal?: React.ReactNode
    fourthAction?: React.ReactNode
    makePaymentModal?: React.ReactNode
    user: {
        name: string
        code: string
        avatarLetter: string
    }
    infoSection: {
        amount: string
        adjustment: string
        dueDate?: string
        details: { label: string; value: string }[]
    }
    leftTabs?: React.ReactNode
    rightContent: React.ReactNode
}

const ViewPageSkeleton = ({
    title,
    isSent,
    onMarkAsSent,
    primaryAction,
    secondaryAction,
    createCreditNote,
    thirdAction,
    recordPaymentModal,
    fourthAction,
    makePaymentModal,
    user,
    infoSection,
    rightContent,
}: ViewPageSkeletonProps) => {
    const { showRecordPayment } = useCreditNoteStore()
    const { showMenuForCredit } = useCreditTabOpen();
    const [showRecievedModal, setShowRecievedModal] = useState(false)
    const [showDeleteCreditHeadsUp, setShowDeleteCreditHeadsUp] = useState(false)

    console.log(showMenuForCredit)

    const handleRecieved = () => {
        setShowRecievedModal(true)
    }

    const handleDeleteCredit = () => {
        setShowDeleteCreditHeadsUp(true)
    }

    return (
        <>
            <div className='h-full w-full'>
                <div className='flex justify-between items-center border-b py-2 px-4 bg-white'>
                    <h1 className='text-2xl text-[#474747]'>{title}</h1>
                    <div className='flex gap-4 items-center'>
                        <span className='flex items-center gap-2 text-base text-[#474747]' onClick={handleRecieved}>
                            <AiOutlineCheck className='h-4 w-4' />Mark Item as Recieved
                        </span>
                        <span className='border-l py-1 pl-3 flex items-center gap-2 text-base text-[#474747]'>
                            <IoShareSocial /> Share
                        </span>
                        <span className='border-l py-1 pl-3 flex items-center gap-2 text-base text-[#474747]'>
                            <GoDownload />PDF
                        </span>
                        {
                            isSent ?
                                (showRecordPayment ?
                                    (false ? thirdAction : fourthAction)
                                    : secondaryAction)
                                : primaryAction
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVerticalIcon className='h-10 w-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E8E8] hover:bg-gray-100' />
                            </DropdownMenuTrigger>
                            {
                                showMenuForCredit ? (
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel onClick={handleDeleteCredit} className='flex items-center gap-2 text-red-500'>
                                            <AiOutlineDelete />Delete Credit Note
                                        </DropdownMenuLabel>
                                    </DropdownMenuContent>
                                ) : (
                                    <DropdownMenuContent>
                                        {
                                            !isSent && (
                                                <DropdownMenuLabel onClick={onMarkAsSent} className='flex items-center gap-2'>
                                                    <AiOutlineCheck /> Mark as Sent
                                                </DropdownMenuLabel>
                                            )
                                        }
                                        <DropdownMenuLabel className='flex items-center gap-2' onClick={handleRecieved}>
                                            <CiBoxes />Mark item as Recieved
                                        </DropdownMenuLabel>
                                        <DropdownMenuLabel className='flex items-center gap-2'>
                                            <IoShareSocial />Share Purchase Return
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className='flex items-center gap-2 text-red-500'>
                                            <AiOutlineDelete />Cancel Sales Return
                                        </DropdownMenuLabel>
                                    </DropdownMenuContent>
                                )
                            }
                        </DropdownMenu>
                    </div>
                </div>

                <div className='flex h-full'>
                    {/* Left section */}
                    <div className='w-[400px] h-full border-r bg-white overflow-y-auto'>
                        <div className='flex items-center gap-4 p-4'>
                            <Avatar>{user.avatarLetter}</Avatar>
                            <div>
                                <h1 className='text-base text-[#242424]'>{user.name}</h1>
                                <p className='text-sm text-[#6B6B6B]'>{user.code}</p>
                            </div>
                        </div>
                        <div className='w-5/6 mx-auto space-y-4'>
                            <div className='pl-9'>
                                <p className='text-sm text-[#8F8F8F]'>Value of Returned Goods</p>
                                <p className='text-base text-[#242424]'>{infoSection.amount}</p>
                            </div>
                            <div className='bg-[#FAFAFA] border-l-4 border-[#8F8F8F] pl-8'>
                                <p className='text-sm text-[#8F8F8F]'>Adjustment</p>
                                <p className='text-base text-[#242424] flex justify-between items-center'>
                                    {infoSection.adjustment}
                                    <span className='text-xs text-[#22B947]'>to Receive</span>
                                </p>
                            </div>
                            <div className='space-y-2 pl-8'>
                                {infoSection.details.map((item, idx) => (
                                    <div key={idx} className='grid grid-cols-2'>
                                        <span className='text-sm text-[#8F8F8F]'>{item.label}</span>
                                        <span className='text-sm text-[#6B6B6B]'>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <SalesReturnTabs />
                    </div>

                    {/* Right section */}
                    <div className='flex-1 border bg-white'>{rightContent}</div>
                </div>
            </div >
            <MarkItemRecievedModal open={showRecievedModal} onOpenChange={setShowRecievedModal} />
            <DeleteCreditModal open={showDeleteCreditHeadsUp} onOpenChange={setShowDeleteCreditHeadsUp} />
            {createCreditNote}
            {recordPaymentModal}
            {makePaymentModal}
        </>
    )
}

export default ViewPageSkeleton
