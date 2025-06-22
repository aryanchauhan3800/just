"use client";

import React, { useEffect, useState } from 'react'
import SkeletonCard from '../SkeletonCard';
import InfoCard from '../inventory/InfoCard';
import { useGetQuotationAttributes } from '@/hooks/useQuotation';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { RiDiscountPercentLine, RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { BsBoxSeam } from 'react-icons/bs';

const QuotationCards = () => {


  // modified state to pass into Infocards
  const [cards, setCards] = useState([]);

  // Import mutation hook here and remove these values
  const { mutate, data, isPending } = useGetQuotationAttributes();


  // run mutate on component load
  useEffect(() => {

    mutate();

  }, [mutate]);



  // this is to modify the data and store in state
  useEffect(() => {

    if (!data || !data?.averagePaidTime) return;

    const cardValues = [

      {
        title: "Total Quote Value",
        TitleIcon: FaIndianRupeeSign,
        titleColor: "#22B947",
        value: data.totalInvoice.value,
        FooterIcon: (data.totalInvoice.change < 0 && data.totalInvoice.changePercentage < 0) ? BiSolidDownArrow : BiSolidUpArrow,
        footerIconText: data.totalInvoice.changePercentage + "%",
        footerText: (data.totalInvoice.change < 0 && data.totalInvoice.changePercentage < 0) ? "less than last month" : "higher than last month",
      },
      {
        title: "Due in next 30 days",
        TitleIcon: RiMoneyRupeeCircleLine,
        titleColor: "#FAAD14",
        value: data.totalDue.value,
        FooterIcon: (data.totalDue.change < 0 && data.totalDue.changePercentage < 0) ? BiSolidDownArrow : BiSolidUpArrow,
        footerIconText: data.totalDue.changePercentage + "%",
        footerText: (data.totalDue.change < 0 && data.totalDue.changePercentage < 0) ? "less than last week" : "higher than last week",
      },
      {
        title: "Average time to convert",
        TitleIcon: BsBoxSeam,
        titleColor: "#D400FF",
        value: data.averagePaidTime.value,
        FooterIcon: (data.averagePaidTime.change < 0 && data.averagePaidTime.changePercentage < 0) ? BiSolidDownArrow : BiSolidUpArrow,
        footerIconText: data.averagePaidTime.changePercentage + "%",
        footerText: (data.averagePaidTime.change < 0 && data.averagePaidTime.changePercentage < 0) ? "less than last week" : "higher than last week",
      },
      {
        title: "Potential Margin",
        TitleIcon: RiDiscountPercentLine,
        titleColor: "#F5222D",
        value: data.overduePayment.value,
        FooterIcon: (data.overduePayment.change < 0 && data.overduePayment.changePercentage < 0) ? BiSolidDownArrow : BiSolidUpArrow,
        footerIconText: data.overduePayment.changePercentage + "%",
        footerText: (data.overduePayment.change < 0 && data.overduePayment.changePercentage < 0) ? "less than last week" : "higher than last week",
      }
    ];

    setCards(cardValues);

  }, [data]);



  return (
    <div className="flex-1 h-full grid grid-cols-4 gap-x-5 items-end">

      {(isPending || !cards.length)
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : cards.map((card, idx) => <InfoCard key={idx} {...card} />)
      }

    </div>
  )
}

export default QuotationCards;