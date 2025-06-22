


// interface ItemData {
//   name?: string;
//   type?: string;
//   description?: string;
//   selling?: { finalPrice?: number };
//   purchase?: { finalPrice?: number };
//   stock?: number;
//   sold?: number;
//   tax?: { taxRate?: number };
//   discountValue?: number;
//   hsn?: string;
//   unitId?: string;
//   vendorId?: string;
//   warehouses?: string[];
//   images?: Array<{ url: string }>;
//   createdAt?: string;
//   openingStock?: { date?: string };
//   qualityAssurance?: { isTopSelling?: boolean };
//   status?: string;
//   lowStockThreshold?: number;
// }

// interface BatchData {
//   batchId?: string;
//   expiryDate?: string;
//   warehouse?: { _id?: string };
//   items?: Array<{
//     name?: string;
//     type?: string;
//     selling?: { finalPrice?: number };
//     purchase?: { finalPrice?: number };
//     quantity?: number;
//     sold?: number;
//     discountValue?: number;
//   }>;
//   images?: Array<{ url: string }>;
//   createdAt?: string;
//   status?: string;
//   lowStockThreshold?: number;
// }

// interface ViewItemSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   currentSelectedItemId: string;
//   currentSelectedType: "item" | "batch";
// }


// use types later


"use client"; 

import { Calendar, ChevronRight, Plus, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { TbEdit } from "react-icons/tb";
import ViewItemCarousel from "./ViewItemCarousel";
import { PiDownloadSimpleBold, PiWarehouse } from "react-icons/pi";
import {
  CrownIcon,
  DoubleDownArrowsIcon,
  DoubleUpArrowsIcon,
  CircleCheckIcon,
  PercentBoxIcon,
  PercentIcon,
  PackageIcon,
  UsersOutlineIcon,
  RupeeIcon,
  BookIcon,
  UserFillIcon,
} from "@/assets/svgIcons/CustomIcons";
import { FC, ReactNode, useEffect } from "react";
import { CiBoxes } from "react-icons/ci";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSingleBatchData, useSingleItemData } from "@/hooks/useInventory";
import { format } from "date-fns";

export default function ViewItemSidebar({
  isOpen,
  onClose,
  currentSelectedItemId,
  currentSelectedType
}: {
  isOpen: boolean;
  onClose: () => void;
  currentSelectedItemId: string;
  currentSelectedType: "item" | "batch";
}) {


  const router = useRouter();

  // Item Mutation
  const { refetch: itemRefetch, data: itemData, isLoading: itemLoading } = useSingleItemData(currentSelectedItemId);

  // Batch Mutation
  const { data: batchData, isLoading: batchLoading, refetch: batchRefetch } = useSingleBatchData(currentSelectedItemId);

  // Fetching the data on Load
  useEffect(() => {
    if (currentSelectedType === "item") {
      itemRefetch();
    } else {
      batchRefetch();
    }
  }, [currentSelectedItemId, currentSelectedType, batchRefetch, itemRefetch]);

  // Helper functions to get data based on type
  const getCurrentData = () => {
    return currentSelectedType === "item" ? itemData : batchData;
  };

  const isLoading = () => {
    return currentSelectedType === "item" ? itemLoading : batchLoading;
  };

  const getItemName = () => {
    if (currentSelectedType === "item") {
      return itemData?.name || "N/A";
    }
    return batchData?.items?.[0]?.name || "N/A";
  };

  const getItemType = () => {
    if (currentSelectedType === "item") {
      return itemData?.type || "N/A";
    }
    return batchData?.items?.[0]?.type || "N/A";
  };

  const getDescription = () => {
    return itemData?.description || "No description available";
  };

  const getSellingPrice = () => {
    if (currentSelectedType === "item") {
      return `₹ ${itemData?.selling?.finalPrice?.toLocaleString() || '0.00'}`;
    }
    return `₹ ${batchData?.items?.[0]?.selling?.finalPrice?.toLocaleString() || '0.00'}`;
  };

  const getCostPrice = () => {
    if (currentSelectedType === "item") {
      return `₹ ${itemData?.purchase?.finalPrice?.toLocaleString() || '0.00'}`;
    }
    return `₹ ${batchData?.items?.[0]?.purchase?.finalPrice?.toLocaleString() || '0.00'}`;
  };

  const getStock = () => {
    if (currentSelectedType === "item") {
      return itemData?.stock?.toString() || "0";
    }
    return batchData?.items?.[0]?.quantity?.toString() || "0";
  };

  const getSoldCount = () => {
    if (currentSelectedType === "item") {
      return itemData?.sold?.toString() || "0";
    }
    return batchData?.items?.[0]?.sold?.toString() || "0";
  };

  const getGSTRate = () => {
    if (currentSelectedType === "item") {
      return `${itemData?.tax?.taxRate || 0}%`;
    }
    return "N/A"; // Batch doesn't have direct tax info
  };

  const getDiscountValue = () => {
    if (currentSelectedType === "item") {
      return `${itemData?.discountValue || 0}%`;
    }
    return `${batchData?.items?.[0]?.discountValue || 0}%`;
  };

  const getHSNCode = () => {
    return itemData?.hsn || "N/A";
  };

  const getBatchId = () => {
    return batchData?.batchId || "N/A";
  };

  const getCreatedDate = () => {
    const data = getCurrentData();
    if (data?.createdAt) {
      return format(data.createdAt,'dd MMM, yyyy')
    }
    return "N/A";
  };

  const getExpiryDate = () => {
    if (batchData?.expiryDate) {
      return format(batchData.expiryDate,'dd MMM, yyyy')
    }
    return "N/A";
  };

  const getManufacturedDate = () => {
    if (itemData?.openingStock?.date) {
      return format(itemData.openingStock.date,'dd MMM, yyyy')
    }
    return "N/A";
  };

  const getNameInitial = () => {
    const name = getItemName();
    return name.charAt(0).toUpperCase();
  };

  const getIsTopSelling = () => {
    return itemData?.qualityAssurance?.isTopSelling || false;
  };

  if (isLoading()) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />
        )}
        <div className={`fixed right-0 top-0 flex flex-col justify-center items-center h-screen rounded-l-md w-[1000px] bg-white transform transition-transform duration-300 z-[51] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="text-lg">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 flex flex-col justify-between h-screen rounded-l-md w-[1000px] bg-white transform transition-transform duration-300 z-[51] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* header */}
        <div className="flex justify-between items-center min-h-[68px] max-h-[68px] px-4 border-b">
          <h2 className="text-2xl text-[#474747] flex items-center gap-x-1 font-semibold">
            {currentSelectedType === "item" ? "Item Details" : "Batch Details"}
          </h2>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={onClose}
            className="rounded-full"
          >
            <X className="size-6 text-[#6B6B6B]" />
          </Button>
        </div>
        {/* body */}
        <div className="bg-[#BBBBBB]/10 flex-1 flex overflow-hidden">
          {/* carousel */}
          <div className="max-w-[48%] flex-1">
            <ViewItemCarousel images={Array.from({length:5}).map((_,i)=>{return {src:`/abc.png`,alt:`image ${i}`}})}/>
          </div>
          {/* details */}
          <div className="max-w-[52%] flex-1 flex flex-col border-l border-l-[#E8E8E8] overflow-y-scroll">
            {/* action btns */}
            <div className="flex justify-end border-b items-center h-[72px] p-5">
              <Link
                href={`/inventory/edit-item/${currentSelectedItemId}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-none shadow-none"
                )}
              >
                <TbEdit className="text-[#8F8F8F]" />
                Edit
              </Link>
              <span className="h-9 w-0.5 bg-[#E8E8E8]" />
              <Button
                className="border-none shadow-none"
                variant={"outline"}
              >
                <PiDownloadSimpleBold className="text-[#8F8F8F]" />
                Record Stock Entry
              </Button>
              {/* conditional option for services */}
              {getItemType() === "SERVICE" && (
                <Button
                  className="border-none shadow-none"
                  variant={"outline"}
                >
                  <TbEdit className="text-[#8F8F8F]" />
                  Edit Service Details
                </Button>
              )}
            </div>
            <div className="flex-1 flex flex-col h-full">
              {/* first segment */}
              <div className="flex p-5 flex-col bg-white border-b">
                {/* name, type, unit etc */}
                <div className="flex items-center gap-x-3">
                  <span className="size-12 rounded-md bg-danger text-white flex justify-center items-center">
                    {getNameInitial()}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[22px] text-[#242424]">
                      {getItemName()}
                    </span>
                    <div className="flex gap-x-2 items-center">
                      <span className="text-[#8F8F8F] text-sm">
                        {getItemType()} - {itemData?.unitId || "N/A"}
                      </span>
                      {getIsTopSelling() && (
                        <span className="bg-warning text-white text-xs px-2 py-1 rounded-full flex gap-x-1 items-center">
                          <CrownIcon /> Top Selling
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* conditional render: added on / last billed */}
                <span className="my-5 bg-[#fafafa] px-2 py-1 text-sm rounded w-fit text-[#474747]">
                  <span className="text-[#8F8F8F] text-xs">
                    Added on -
                  </span>{" "}
                  {getCreatedDate()}
                </span>
                {/* description */}
                <p className="text-[#8F8F8F]">
                  {getDescription()}
                </p>
              </div>
              {/* second segment */}
              <div className="flex p-5 flex-col gap-4 bg-white border-b">
                {/* selling and cost price */}
                <div className="flex h-fit flex-1 items-center gap-x-4">
                  <InfoBox
                    IconNode={
                      <DoubleUpArrowsIcon className="size-4" />
                    }
                    color="success"
                    className="bg-success/10 rounded-l"
                    title="Selling Price (MRP)"
                    value={getSellingPrice()}
                  />
                  <InfoBox
                    IconNode={
                      <DoubleDownArrowsIcon className="size-4" />
                    }
                    color="danger"
                    className="bg-danger/10 rounded-r"
                    title="Cost Price per Unit"
                    value={getCostPrice()}
                  />
                </div>
                {/* sold till date etc */}
                <div className="flex h-fit flex-1 pb-5 items-center gap-x-4">
                  <InfoBox
                    IconNode={
                      <CircleCheckIcon className="size-4" />
                    }
                    color="success"
                    className="bg-[#fafafa] rounded-l"
                    title="Sold till date"
                    value={getSoldCount()}
                  />
                  <InfoBox
                    IconNode={
                      <CircleCheckIcon className="size-4" />
                    }
                    color="success"
                    className="bg-brand/5"
                    title="Sold this month"
                    value="0" // This would need additional API data
                  />
                  <InfoBox
                    IconNode={
                      <CiBoxes className="size-4" />
                    }
                    color="[#242424]"
                    className="bg-warning/10 rounded-r"
                    title="In Stock"
                    value={getStock()}
                  />
                </div>
                {/* gst slab & discount */}
                <div className="flex flex-col gap-y-5 flex-1 h-fit px-5 text-sm">
                  {/* gst */}
                  <div className="flex items-center">
                    <div className="flex-1 gap-x-1 flex items-center">
                      <PercentBoxIcon className="size-6 p-1 text-[#8f8f8f] rounded-full bg-[#fafafa]" />
                      GST Slab :
                    </div>
                    <div className="flex-1 flex items-center uppercase text-[#242424]">
                      {getGSTRate()}
                    </div>
                  </div>
                  {/* discount */}
                  <div className="flex items-center">
                    <div className="flex-1 gap-x-1 flex items-center">
                      <PercentIcon className="size-6 p-1 rounded-full bg-[#fafafa] text-[#8f8f8f]" />
                      Discount on each :
                    </div>
                    <div className="flex-1 flex items-center text-[#242424]">
                      {getDiscountValue()}
                    </div>
                  </div>
                  {/* tds - if available */}
                  <div className="flex items-center">
                    <div className="flex-1 gap-x-1 flex items-center">
                      <PercentBoxIcon className="size-6 p-1 text-[#8f8f8f] rounded-full bg-[#fafafa]" />
                      TDS :
                    </div>
                    <div className="flex-1 flex items-center uppercase text-[#242424]">
                      N/A
                    </div>
                  </div>
                </div>
              </div>
              {/* third segment */}
              <div className="p-5 bg-white border-b">
                <div className="flex flex-col max-w-[90%] mx-auto text-[#8f8f8f] text-sm gap-y-5">
                  {/* batch - only show for batch type or if item has batch info */}
                  {(currentSelectedType === "batch" || getBatchId() !== "N/A") && (
                    <div className="flex items-center h-12 px-2 bg-[#fafafa] border-l-4 border-[#8f8f8f]">
                      <div className="flex-1 flex items-center">
                        <PackageIcon className="size-4 mr-1" />
                        Batch :
                      </div>
                      <div className="flex-1 flex items-center text-[#242424] font-semibold">
                        {getBatchId()}
                      </div>
                    </div>
                  )}
                  {/* vendor - if available */}
                  {itemData?.vendorId && (
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center">
                        <UsersOutlineIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />{" "}
                        Vendor :
                      </div>
                      <div className="flex-1 flex items-center text-[#6B6B6B]">
                        <span className="bg-danger mr-2 size-8 flex justify-center items-center text-xs rounded-full text-white font-semibold">
                          V
                        </span>
                        {itemData.vendorId}
                      </div>
                    </div>
                  )}
                  {/* type */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <RupeeIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      Type :
                    </div>
                    <div className="flex-1 flex items-center uppercase text-[#242424]">
                      {getItemType()}
                    </div>
                  </div>
                  {/* hsn code */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <BookIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      HSN Code :
                    </div>
                    <div className="flex-1 flex items-center text-[#242424]">
                      {getHSNCode()}
                    </div>
                  </div>
                  {/* unit */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <PackageIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      Unit :
                    </div>
                    <div className="flex-1 flex items-center uppercase text-[#242424]">
                      {itemData?.unitId || "N/A"}
                    </div>
                  </div>
                  {/* warehouse */}
                  {(itemData?.warehouses?.length > 0 || batchData?.warehouse) && (
                    <div className="flex items-center h-12 px-2 mt-5 bg-[#fafafa] border-l-4 border-[#8f8f8f]">
                      <div className="flex-1 flex items-center">
                        <PiWarehouse className="size-3 mr-1" />
                        Warehouse :
                      </div>
                      <div className="flex-1 flex items-center text-[#242424] font-semibold">
                        {batchData?.warehouse?.name || itemData?.warehouses?.[0] || "N/A"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* fourth segment */}
              <div className="p-5 bg-white text-[#8f8f8f] text-sm border-b">
                <div className="flex w-[90%] mx-auto flex-col gap-y-5">
                  {/* manufactured */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <Calendar className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      Manufactured :
                    </div>
                    <div className="flex-1 flex items-center text-[#242424]">
                      {getManufacturedDate()}
                    </div>
                  </div>
                  {/* expiry date */}
                  {getExpiryDate() !== "N/A" && (
                    <div className="flex items-center h-12 px-2 bg-danger/10 border-l-4 border-danger">
                      <div className="flex-1 flex items-center">
                        <Calendar className="size-4 mr-1" />
                        Expiry Date :
                      </div>
                      <div className="flex-1 flex items-center text-[#242424]">
                        {getExpiryDate()}
                      </div>
                    </div>
                  )}
                  {/* Status */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <CircleCheckIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      Status :
                    </div>
                    <div className="flex-1 flex items-center text-[#242424]">
                      {getCurrentData()?.status || "N/A"}
                    </div>
                  </div>
                  {/* Low Stock Threshold */}
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <PackageIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
                      Low Stock Alert :
                    </div>
                    <div className="flex-1 flex items-center text-[#242424]">
                      {getCurrentData()?.lowStockThreshold || 0}
                    </div>
                  </div>
                </div>
              </div>
              {/* fifth segment */}
              <div className="text-[#8f8f8f]">
                <div className="p-5 m-5 bg-white rounded-md flex flex-col shadow gap-y-4">
                  <div className="flex gap-x-2 items-center">
                    <UsersOutlineIcon className="size-4" />{" "}
                    <span className="text-heading-light text-xl">
                      Party Wise Report
                    </span>
                  </div>
                  <p className="ml-5 text-sm">
                    Click to View Party wise reports of this
                    product
                  </p>
                  <Link
                    href={"/inventory"}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "text-brand hover:text-brand w-fit ml-5 text-base font-bold"
                    )}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <div
          style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
          className="px-4 min-h-[64px] flex justify-between items-center"
        >
          <Button
            variant={"outline"}
            onClick={() => {
              onClose();
              router.push(`/inventory/view-details/${currentSelectedItemId}`);
            }}
          >
            View full details <ChevronRight />
          </Button>
          <Button variant={"ghost"} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export const InfoBox: FC<{
  className?: string;
  title: string;
  value: string;
  IconNode: ReactNode;
  color: string;
  shouldDark?: boolean;
}> = ({ IconNode, className, color, title, value, shouldDark }) => {
  return (
    <div
      className={cn("h-[68px] flex-1 flex flex-col p-2 gap-2", className)}
    >
      <div className="flex items-center gap-x-1.5 text-[#8F8F8F]">
        {IconNode}
        <span className="text-sm text-[#242424]">{title}</span>
      </div>
      <div className={cn("text-xl ml-3", `text-${color}`)}>{value}</div>
    </div>
  );
};