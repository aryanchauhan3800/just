"use client";

import { useGetAttributes } from '@/hooks/useInventory';
import React, { useEffect, useState } from 'react';
import { TbTriangleFilled,TbTriangleInvertedFilled  } from "react-icons/tb";
import { CiBoxes } from 'react-icons/ci';
import { IoIosInformationCircleOutline, IoIosStarOutline } from 'react-icons/io';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import InfoCard from './InfoCard';
import SkeletonCard from '../SkeletonCard';



const InventoryInfoCard = () => {

  // Mutation functions
  const { mutate, data, isPending } = useGetAttributes();

  // Cards State
  const [cards, setCards] = useState([]);


  // calling mutation function
  useEffect(() => {
    mutate();
  }, [mutate]);



  useEffect(() => {

    if (!data || !data?.totalItem) return;

    const cardValues = [
      {
        title: "Total Items/Services",
        TitleIcon: CiBoxes,
        titleColor: "#22B947",
        value: data.totalItem.value,
        FooterIcon: (data.totalItem.change < 0 && data.totalItem.changeInPercentage < 0) ? TbTriangleFilled : TbTriangleInvertedFilled,
        footerIconText: data.totalItem.changeInPercentage + "%",
        footerText: (data.totalItem.change < 0 && data.totalItem.changeInPercentage < 0) ? "less than last year" : "higher than last year",
      },
      {
        title: "Value of Inventory",
        TitleIcon: RiMoneyRupeeCircleLine,
        titleColor: "#FAAD14",
        value: data.inventoryValue.value,
        FooterIcon: (data.inventoryValue.change < 0 && data.inventoryValue.changeInPercentage < 0) ? TbTriangleFilled : TbTriangleInvertedFilled,
        footerIconText: data.inventoryValue.changeInPercentage + "%",
        footerText: (data.inventoryValue.change < 0 && data.inventoryValue.changeInPercentage < 0) ? "less than last year" : "higher than last year",
      },
      {
        title: "Low Stock Alert",
        TitleIcon: IoIosInformationCircleOutline,
        titleColor: "#FAAD14",
        value: data.lowStockAlert.value,
        FooterIcon: (data.lowStockAlert.change < 0 &&  data.lowStockAlert.changeInPercentage < 0) ? TbTriangleFilled : TbTriangleInvertedFilled,
        footerIconText: data.lowStockAlert.changeInPercentage + "%",
        footerText: (data.lowStockAlert.change < 0 && data.lowStockAlert.changeInPercentage < 0) ? "less than last year" : "higher than last year",
      },
      {
        title: "Potential Margin",
        TitleIcon: IoIosStarOutline,
        titleColor: "#D400FF",
        value: data.potentialMargin.value,
        FooterIcon: (data.potentialMargin.change < 0 && data.potentialMargin.changeInPercentage < 0) ? TbTriangleFilled : TbTriangleInvertedFilled,
        footerIconText: data.potentialMargin.changeInPercentage + "%",
        footerText: (data.potentialMargin.change < 0 && data.potentialMargin.changeInPercentage < 0) ? "less than last year" : "higher than last year",
      }
    ];

    setCards(cardValues);
  }, [data]);



  return (
    <div className="flex-1 h-full grid grid-cols-4 gap-x-5 items-end">
      {isPending || !cards.length
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : cards.map(
          (card, idx) => <InfoCard key={idx} {...card} />
        )
      }
    </div>
  );
};

export default InventoryInfoCard;
