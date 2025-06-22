import { CompanyDetailStripInfo } from '@/types/dashboardAndInvoiceTypes';
import { CircleAlert } from 'lucide-react';
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import React from 'react';

const BusinessInfoStrip = ({ items }: { items: CompanyDetailStripInfo[] }) => {
    return (
        <div className="w-full flex flex-row gap-8">
            {items.map((item) => {
                const Icon = item.icon;
                const isNegative = item.growth < 0;

                return (
                    <div key={item.title} className="w-full">
                        <div className={`flex flex-col border-l-2  pl-2 ${item.color}`}>
                            <div className="flex flex-row justify-between pr-4">
                                <div className="flex flex-row items-center gap-1">
                                    <span>
                                        <Icon className="w-3 h-5 text-gray-500" />
                                    </span>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between items-center px-4 mt-2">
                            <span className="text-xl">{item.value}</span>
                            <span className='text-gray-500'><CircleAlert className="w-4 h-4" /></span>
                        </div>

                        <div className='flex flex-row items-center gap-1 px-4'>
                            <span className={`flex items-center text-xs ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
                                {isNegative ? <BsCaretDownFill /> : <BsCaretUpFill />}
                                {Math.abs(item.growth)}%
                            </span>
                            <span className='text-xs text-[#8F8F8F]'>
                                {isNegative ? 'less than last year' : 'growth than last year'}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default BusinessInfoStrip;
