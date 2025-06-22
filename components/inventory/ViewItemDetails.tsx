"use client";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { Calendar, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TbEdit } from "react-icons/tb";
import SmallCarousel from "./SmallCarousel";
import {
	BookIcon,
	CashIcon,
	CrownIcon,
	PackageIcon,
	PercentBoxIcon,
	PercentIcon,
	RupeeIcon,
	UsersOutlineIcon,
	CircleCheckIcon,
	DoubleUpArrowsIcon,
} from "@/assets/svgIcons/CustomIcons";
import { InfoBox } from "./ViewItemSidebar";
import { CiBoxes } from "react-icons/ci";
import ViewSummarySwitch from "./ViewSummarySwitch";
import { PiWarehouse } from "react-icons/pi";

interface ViewItemDetailsProps {}

const ViewItemDetails: FC<ViewItemDetailsProps> = ({}) => {
	return (
		<div className="flex flex-col justify-between h-full overflow-hidden">
			{/* header */}
			<div className="flex justify-between items-center min-h-[64px] px-5 bg-white border-b border-[#E8E8E8]">
				<div className="flex gap-x-5 items-center">
					<Link
						href={"/inventory"}
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "icon",
							}),
							"text-[#474747] rounded-full"
						)}
					>
						<ChevronLeft className="text-[#8f8f8f] size-6" />
					</Link>

					<h2 className="text-xl text-[#474747]">Item Details</h2>
				</div>
				<div className="flex gap-x-2 items-center">
					<Link
						href={"/inventory/create-item"}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"text-[#474747] text-base"
						)}
					>
						<Plus className="size-4 text-[#8f8f8f]" /> Record Stock
						entry
					</Link>
					<Link
						href={"/inventory/edit-item/id"}
						className={cn(buttonVariants(), "text-base")}
					>
						<TbEdit className="size-4" /> Edit Item details
					</Link>
				</div>
			</div>
			<div className="flex flex-1 overflow-hidden">
				{/* left section */}
				<div
					style={{ direction: "rtl" }}
					className="flex-1 max-w-[480px] overflow-y-scroll"
				>
					<div
						className="border-x border-[#E8E8E8]"
						style={{ direction: "ltr" }}
					>
						{/* carousel */}
						<div className="p-6 pr-0 bg-white border-b max-w-full max-h-fit">
							<SmallCarousel
								images={[
									{ src: "/karosauda.png" },
									{ src: "/asdd" },
									{ src: "/asdd" },
									{ src: "/asdd" },
									{ src: "/asdd" },
								]}
							/>
						</div>
						{/* basic details */}
						<div className="flex p-6 flex-col bg-white border-b border-[#E8E8E8]">
							{/* name, type, unit etc */}
							<div className="flex items-center gap-x-3">
								<span className="size-12 rounded-md bg-danger text-white flex justify-center items-center">
									B
								</span>
								<div className="flex flex-col">
									<span className="text-[22px] text-[#242424]">
										Britannia Choco Chip Cookies
									</span>
									<div className="flex gap-x-2 items-center">
										<span className="text-[#8F8F8F] text-sm">
											Item - PCKS
										</span>
										<span className="bg-warning text-white text-xs px-2 py-1 rounded-full flex gap-x-1 items-center">
											<CrownIcon /> Top Selling
										</span>
									</div>
								</div>
							</div>
							{/* conditional render: added on / last billed */}
							<span className="my-5 bg-[#fafafa] px-2 py-1 text-sm rounded w-fit text-[#474747]">
								<span className="text-[#8F8F8F] text-xs">
									Added on -
								</span>{" "}
								12 Apr, 2024
							</span>
							{/* <span className="my-5 bg-[#fafafa] px-2 py-1 rounded w-fit text-[#474747]">
								<span className="text-[#8F8F8F]">
									Last billed -
								</span>{" "}
								4 days ago
							</span> */}
							{/* description */}
							<p className="text-[#8F8F8F]">
								This is a demo description of the item entered
								by the user. this description can be visible in
								the invoice, and definitely should be shown in
								the online store that we are building
							</p>
						</div>
						{/* pricing breakdown */}
						<div className="flex flex-col">
							<h3 className="text-lg text-[#474747] px-3 flex items-center h-[62px] border-b border-[#E8E8E8]">
								Pricing Breakdown
							</h3>
							<div className="flex flex-col p-6 pb-10 bg-white border-b border-[#E8E8E8] text-[#8f8f8f] text-sm gap-y-5">
								{/* Selling Price per Unit */}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										<span className="center size-6 p-1 rounded-full bg-[#fafafa] mr-1">
											<CashIcon className="size-4" />
										</span>
										Selling Price per Unit :
									</div>
									<div className="flex-1 flex items-center uppercase text-[#242424]">
										₹ 8000
									</div>
								</div>
								{/* Cost Price */}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										<span className="center size-6 p-1 rounded-full bg-[#fafafa] mr-1">
											<CashIcon className="size-4" />
										</span>
										Cost Price :
									</div>
									<div className="flex-1 flex items-center text-[#242424]">
										₹ 600
									</div>
								</div>
								{/* GST Slab */}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										<PercentBoxIcon className="size-6 p-1 text-[#8f8f8f] rounded-full bg-[#fafafa]" />
										GST Slab :
									</div>
									<div className="flex-1 flex items-center uppercase text-[#242424]">
										10 %
									</div>
								</div>
								{/* Discount on each */}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										<PercentIcon className="size-6 p-1 text-[#8f8f8f] rounded-full bg-[#fafafa]" />
										Discount on each :
									</div>
									<div className="flex-1 flex items-center uppercase text-[#242424]">
										12 %
									</div>
								</div>
							</div>
						</div>
						{/* item  details */}
						<div className="flex flex-col p-6 pb-10 bg-white border-b border-[#E8E8E8] text-[#8f8f8f] text-sm gap-y-5">
							{/* batch and warehouse */}
							<div className="flex flex-col">
								{/* batch */}
								<div className="flex items-center h-12 px-2 bg-[#fafafa] border-b border-b-[#E8E8E8] border-l-4 border-l-[#8f8f8f]">
									<div className="flex-1 flex items-center">
										<PackageIcon className="size-4 mr-1" />
										Batch :
									</div>
									<div className="flex-1 flex items-center text-[#242424] font-semibold">
										BT-00012
									</div>
								</div>
								{/* warehouse */}
								<div className="flex items-center h-12 px-2 bg-[#fafafa] border-l-4 border-[#8f8f8f]">
									<div className="flex-1 flex items-center">
										<PiWarehouse className="size-3 mr-2" />
										Warehouse :
									</div>
									<div className="flex-1 flex items-center text-[#242424] font-semibold">
										Delhi
									</div>
								</div>
							</div>
							{/* product type */}
							<div className="flex items-center">
								<div className="flex-1 flex items-center">
									<RupeeIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
									Product Type :
								</div>
								<div className="flex-1 flex items-center uppercase text-[#242424]">
									item
								</div>
							</div>
							{/* hsn code */}
							<div className="flex items-center">
								<div className="flex-1 flex items-center">
									<BookIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
									HSN Code :
								</div>
								<div className="flex-1 flex items-center text-[#242424]">
									45896
								</div>
							</div>
							{/* vendor */}
							<div className="flex items-center">
								<div className="flex-1 flex items-center">
									<UsersOutlineIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />{" "}
									Vendor :
								</div>
								<div className="flex-1 flex items-center text-[#6B6B6B]">
									<span className="bg-danger mr-2 size-8 flex justify-center items-center text-xs rounded-full text-white font-semibold">
										SS
									</span>
									Shyam Shubh
								</div>
							</div>
							{/* unit */}
							<div className="flex items-center">
								<div className="flex-1 flex items-center">
									<PackageIcon className="size-6 p-1 rounded-full bg-[#fafafa] mr-1" />
									Unit :
								</div>
								<div className="flex-1 flex items-center uppercase text-[#242424]">
									pcks
								</div>
							</div>
						</div>
						{/* Quality Assurance */}
						<div className="flex flex-col">
							<h3 className="text-lg text-[#474747] px-3 flex items-center h-[62px] border-b border-[#E8E8E8]">
								Quality Assurance
							</h3>
							<div className="flex flex-col p-5 pb-10 bg-white border-b border-[#E8E8E8] text-[#8f8f8f] text-sm gap-y-5">
								{/* Manufactured*/}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										<span className="mr-1 flex justify-center items-center p-1 rounded-full bg-[#fafafa] text-[#8f8f8f]">
											<Calendar className="size-4" />
										</span>
										Manufactured :
									</div>
									<div className="flex-1 flex items-center text-[#242424]">
										24 Jan 2025
									</div>
								</div>
								{/* expiry date */}
								<div className="flex items-center h-12 px-2 bg-danger/10 border-l-4 border-danger">
									<div className="flex-1 flex items-center">
										<Calendar className="size-4 mr-1" />
										Expiry Date :
									</div>
									<div className="flex-1 flex items-center text-[#242424]">
										25 Mar 2026
									</div>
								</div>
								{/*Perish Period*/}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										Perish Period
									</div>
									<div className="flex-1 flex items-center text-[#242424]">
										1 Year from Purchase
									</div>
								</div>
								{/* Product Warranty */}
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										Product Warranty
									</div>
									<div className="flex-1 flex items-center text-[#242424]">
										1 Year from Sales
									</div>
								</div>
							</div>
						</div>
						{/* Online Store */}
						{/* <div className="flex flex-col">
							<h3 className="text-lg text-[#474747] px-3 flex items-center h-[62px] border-b border-[#E8E8E8]">
								Online Store
							</h3>
							<div className="flex flex-col p-5 pb-10 bg-white border-b border-[#E8E8E8] text-[#8f8f8f] text-sm gap-y-5">
								<div className="flex items-center">
									<div className="flex-1 flex items-center">
										Online Store Availability
									</div>
									<div className="flex-1 flex items-center gap-x-3">
										<span className="px-2 py-1 bg-danger/10 text-danger text-xs rounded">
											Not in Store
										</span>
										<Link
											href={"#"}
											className={cn(
												buttonVariants({
													variant: "ghost",
												}),
												"text-brand hover:text-brand font-bold"
											)}
										>
											Set Up
											<ChevronRight className="size-5 stroke-2 -ml-2" />
										</Link>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
				{/* right section */}
				<div className="flex-1 flex-col flex bg-white overflow-hidden">
					{/* heading */}
					<h2 className="text-[#474747] text-[22px] min-h-[66px] px-6 flex items-center border-b border-[#E8E8E8]">
						Item Summary
					</h2>
					<div className="overflow-y-auto flex-1">
						<div className="flex flex-col flex-1 border-r border-[#E8E8E8]">
							{/* info boxes */}
							<div className="flex gap-x-4 my-6 px-6">
								<InfoBox
									IconNode={
										<CircleCheckIcon className="size-4" />
									}
									color="success"
									className="bg-[#fafafa] rounded-l"
									title="Sold till date"
									value="40"
								/>
								<InfoBox
									IconNode={
										<CircleCheckIcon className="size-4" />
									}
									color="success"
									className="bg-brand/5"
									title="Sold this month"
									value="12"
								/>
								<InfoBox
									IconNode={<CiBoxes className="size-4" />}
									color="[#242424]"
									className="bg-warning/10"
									title="In Stock"
									value="120"
								/>
								<InfoBox
									IconNode={
										<DoubleUpArrowsIcon
											className="size-4 -rotate-45"
											viewBox="0 0 20 20"
										/>
									}
									color="success"
									className="bg-success/10 rounded-r"
									title="Estimated Margin"
									value="₹ 80,000.00"
								/>
							</div>
							{/* table etc */}
							<ViewSummarySwitch />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewItemDetails;
