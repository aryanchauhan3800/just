import { StripItem1 } from '@/types/dashboardAndInvoiceTypes';
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CustomerInfoStrip = ({ items }: { items: StripItem1[] }) => {
  return (
    <div className="w-full flex flex-row gap-8 mt-6">
      {items.map((item) => {
        const Icon = item.icon;
        const profit = parseFloat(item.profit);
        const isPositive = profit > 0;
        const isZero = profit === 0;
        const isNegative = profit < 0;

        return (
          <div key={item.title} className="w-full">
            <div className={`flex flex-col border-l-2 pl-2 h-4 ${item.color} pb-5`}>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-0">
                  <span>
                    <Icon className="w-4 h-4 text-gray-500 mr-1" />
                  </span>
                  <span className="whitespace-nowrap">{item.title}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between px-3 mt-2 pt-4">
              <span className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                ₹ {item.value}
              </span>

              <span
                className={`text-sm flex items-center mt-1 ${
                  isPositive
                    ? 'text-green-600'
                    : isNegative
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                <span className="mr-1">
                  {isNegative ? (
                    <FaArrowDown className="w-3 h-3 text-red-600" />
                  ) : (
                    <FaArrowUp className="w-3 h-3 text-green-600" />
                  )}
                </span>
                <span>
                  {Math.abs(profit)}%{' '}
                 
                </span>
                <span className='ml-1'>{item.profitTitle}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerInfoStrip;
