import { StripItem } from '@/types/dashboardAndInvoiceTypes';
import { CircleAlert } from 'lucide-react';
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import React from 'react'

const InfoStrip = ({ items }: { items: StripItem[] }) => {
    return (
        <div className="w-full flex flex-row gap-8">
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.title} className="w-full">
                        <div className={`flex flex-col border-l-3 pl-2 ${item.color}`}>

                            <div className="flex flex-row justify-between pr-4">
                                <div className="flex flex-row items-center gap-1">
                                    <span>
                                        <Icon className="w-4 h-4 text-gray-500" />
                                    </span>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                            <span className="text-gray-500">{item.all ? "All" : ""}</span>
                        </div>

                        <div className="flex flex-row justify-between items-center px-4 mt-2">
                            <span className="text-xl">₹ {item.value}</span>
                            {item.alert && (<span className='text-gray-500'><CircleAlert className="w-4 h-4" /></span>)}
                        </div>
                        <div className='flex flex-row items-center gap-1 px-4'>
                            {
                                item?.isUpwardTred && (
                                    <>
                                    <span className='flex items-center text-xs text-green-500'><BsCaretUpFill /> {item.percentage}%</span>
                                    <span className='text-xs text-[#8F8F8F]'>more than last week</span>
                                    </>
                                )
                            }
                             {
                                item?.isDownwardTred && (
                                    <>
                                    <span className='flex items-center text-xs text-red-500'><BsCaretDownFill /> {item.percentage}%</span>
                                    <span className='text-xs text-red-500'>less than last week</span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default InfoStrip
