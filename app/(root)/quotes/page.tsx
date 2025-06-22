"use client";


import QuotationCards from '@/components/quotation/QuotationCards';
import QuotationTable from '@/components/quotation/QuotationTable';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { FaPlus } from 'react-icons/fa';

const Quotes = () => {


  return (
    <div className="flex-1 h-full space-y-5">

      {/* heading and info cards */}
      <div className="flex-1 flex flex-col h-[200px] bg-white m-5 rounded p-5">


        {/* heading with btns */}
        <div className="flex justify-between h-10 items-center">

          <h2 className="text-2xl font-medium text-[#474747]">
            Quotation
          </h2>

          <div className="flex gap-x-4 items-center">

            <Link
              href={"/inventory/create-item"}
              className={buttonVariants()} >
              <FaPlus className="size-4" /> New Quotation
            </Link>

          </div>

        </div>


        {/* Quotation cards */}
        <QuotationCards />


      </div>


    <QuotationTable />


    </div>
  )
}

export default Quotes;