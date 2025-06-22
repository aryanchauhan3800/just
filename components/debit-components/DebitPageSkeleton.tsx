'use client'

import React, { useState } from 'react'
import { IoShareSocial } from 'react-icons/io5'
import { Avatar } from '@mui/material'
import { GoDownload } from 'react-icons/go'
import { AiOutlineDelete } from 'react-icons/ai'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon } from 'lucide-react'
import PurchaseReturnTabs from '../purchase/purchase-return-components/PurchaseReturnTabs'

type DebitPageSkeletonProps = {
    title: string
    primaryAction?: React.ReactNode
    markItemAsReturned?: React.ReactNode
    secondaryAction?: React.ReactNode
    recordPaymentModal?: React.ReactNode
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

const DebitPageSkeleton = ({
    title,
    primaryAction,
    secondaryAction,
    recordPaymentModal,
    makePaymentModal,
    user,
    infoSection,
    rightContent,
}: DebitPageSkeletonProps) => {
    const [showDeleteCreditHeadsUp, setShowDeleteCreditHeadsUp] = useState(false)

    const handleDeleteCredit = () => {
        setShowDeleteCreditHeadsUp(true)
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col">
                {/* Header (non-scrollable) */}
                <div className='flex justify-between items-center border-b py-2 px-4 bg-white shrink-0'>
                    <h1 className='text-2xl text-[#474747]'>{title}</h1>
                    <div className='flex gap-4 items-center'>
                        <span className='py-1 pl-3 flex items-center gap-2 text-base text-[#474747]'>
                            <IoShareSocial /> Share
                        </span>
                        <span className='border-l py-1 pl-3 flex items-center gap-2 text-base text-[#474747]'>
                            <GoDownload />PDF
                        </span>
                        {
                            false ? secondaryAction : primaryAction
                        }
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVerticalIcon className='h-10 w-10 p-2 rounded-full bg-[#FFFFFF] border border-[#E8E8E8] hover:bg-gray-100' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='flex items-center gap-2'>
                                    <IoShareSocial />Share Purchase Return
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className='flex items-center gap-2 text-red-500'>
                                    <AiOutlineDelete />Cancel Purchase Return
                                </DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Scrollable content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left section (scrollable) */}
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
                        <PurchaseReturnTabs />
                    </div>

                    {/* Right section (scrollable) */}
                    <div className='flex-1 border bg-white overflow-y-auto'>
                        {rightContent}
                    </div>
                </div>
            </div>
            {recordPaymentModal}
            {makePaymentModal}
        </>
    )
}

export default DebitPageSkeleton