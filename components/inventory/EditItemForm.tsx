"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	CalendarIcon,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Info,
	Search,
	X,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import {
	CashIcon,
	PackageIcon,
	TransferIcon,
	TrashIcon,
} from "@/assets/svgIcons/CustomIcons";
import Image from "next/image";
import items from "@/assets/svgs/inventory-items.svg";
import service from "@/assets/svgs/inventory-service.svg";
import online_store_big from "@/assets/svgs/online-store-big.svg";
import { PiUploadSimpleBold, PiWarehouse } from "react-icons/pi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UnitSelect from "./UnitSelect";
import { InventoryUnit } from "./ItemForm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import medal from "@/assets/svgs/medal.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { TbEdit } from "react-icons/tb";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import BatchProcess from "./BatchProcessing";
import { AiOutlineCheck } from "react-icons/ai";
import { Checkbox } from "../ui/checkbox";

type ValidSectionType = "basic" | "pricing" | "stock" | "quality" | "store";

const sections: { title: string; value: ValidSectionType }[] = [
	{ title: "Basics", value: "basic" },
	{ title: "Pricing & Tax", value: "pricing" },
	{ title: "Stock, Inventory & BAR Code", value: "stock" },
	{ title: "Quality Assurance", value: "quality" },
	{ title: "Online Store", value: "store" },
];

type WarehouseType = {
	id: string;
	name: string;
	address: string;
	batchName: string;
	quantity?: string;
	lowStockAlert?: string;
};

interface EditItemFormProps {}

const EditItemForm: FC<EditItemFormProps> = ({}) => {
	const [currentSection, setCurrentSection] =
		useState<ValidSectionType>("basic");
	const router = useRouter();

	const [showRemoveStockDialog, setShowRemoveStockDialog] =
		useState<boolean>(false);

	const [selectedUnit, setSelectedUnit] = useState<string>("");
	const ItemUnitsArray: InventoryUnit[] = [
		{ name: "Kilograms", unit: "KG", initial: true },
		{ name: "Jar", unit: "JAR", initial: true },
		{ name: "Packets", unit: "PCKTS", initial: true },
		{ name: "Boxes", unit: "BOX", initial: true },
		{ name: "Grams", unit: "GMS", initial: true },
		{ name: "Litres", unit: "LTR", initial: true },
		{ name: "Metre", unit: "MTR", initial: true },
		{ name: "Tin", unit: "TIN", initial: true },
		{ name: "Bag", unit: "BAG", initial: true },
		{ name: "Cans", unit: "CAN", initial: true },
		{ name: "Pairs", unit: "PAIR", initial: true },
		{ name: "Strips", unit: "STRIP", initial: true },
		{ name: "Numbers", unit: "NOS", initial: true },
	];
	const ServiceUnitsArray: InventoryUnit[] = [
		{ name: "Hours", unit: "HRS", initial: true },
		{ name: "Days", unit: "DAY", initial: true },
		{ name: "Call", unit: "CALL", initial: true },
		{ name: "Task", unit: "TASK", initial: true },
		{ name: "Kilometer", unit: "KM", initial: true },
		{ name: "Square Foot", unit: "SFT", initial: true },
		{ name: "Shift", unit: "SHIFT", initial: true },
		{ name: "Installation", unit: "INSTALL", initial: true },
	];

	const [currencyType, setCurrencyType] = useState<"percentage" | "rupees">(
		"percentage"
	);
	const [selectedGST, setSelectedGST] = useState<{
		heading: string;
		percentage: string;
	}>({ heading: "", percentage: "" });
	const gstArray: {
		heading: string;
		description?: string;
		percentage: string;
	}[] = [
		{
			heading: "Essential Food Items",
			percentage: "0",
			description: "Milk, bread, wheat",
		},
		{
			heading: "Packed Food",
			percentage: "5",
			description: "Branded Rice, Biscuits etc",
		},
		{
			heading: "Pharmaceuticals",
			percentage: "5",
			description: "Medicines & Supplies",
		},
		{
			heading: "FMCG item",
			percentage: "18",
			description: "Soap, Toothpaste",
		},
		{ heading: "Cosmetics", percentage: "18", description: "Decoratives" },
		{
			heading: "Luxury Items",
			percentage: "28",
			description: "ACs, Refrigerators",
		},
		{ heading: "Restaurant Food (non-AC) ", percentage: "5" },
		{ heading: "Mobile Phones", percentage: "12" },
		{ heading: "Textiles (below ₹1000 per piece)", percentage: "5" },
	];
	const handleSelect = (heading: string, percentage: string) => {
		setSelectedGST({ heading, percentage });
	};
	const selectedGSTLabel =
		selectedGST.heading && selectedGST.percentage
			? `${selectedGST.heading} - ${selectedGST.percentage}%`
			: "Select GST Slab";
	const selectedTDSLabel =
		selectedGST.heading && selectedGST.percentage
			? `${selectedGST.heading} - ${selectedGST.percentage}%`
			: "Select TDS Slab";

	const [markedAsPerishable, setMarkedAsPerishable] =
		useState<boolean>(false);
	const [warranty, setwarranty] = useState<boolean>(false);

	const timeToExpire: string[] = ["7 Days", "14 Days", "21 Days", "30 Days"];

	const [asOfDate, setAsOfDate] = useState<Date>();

	const [warehouses, setWarehouses] = useState<WarehouseType[]>([
		{
			id: "1",
			name: "Raigarh",
			address: "123 Havildar Street, opp Ordinance",
			batchName: "BT-1002",
			quantity: "23",
			lowStockAlert: "5",
		},
		{
			id: "2",
			name: "Pratapgarh",
			address: "42-7 Bleeker Street, Mahavir Singh Colony",
			batchName: "BT-0001",
			quantity: "56",
			lowStockAlert: "10",
		},
		{
			id: "3",
			name: "Zamin Zilla",
			address: "42 Mall Road, opp Netaji bose lane",
			batchName: "BT-2356",
			quantity: "12",
			lowStockAlert: "2",
		},
	]);
	const [showWarehouseDialog, setShowWarehouseDialog] =
		useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setCurrentSection(entry.target.id as ValidSectionType);
					}
				});
			},
			{ threshold: 0.6 }
		);

		const sectionElements = document.querySelectorAll("section[id]");
		sectionElements.forEach((el) => observer.observe(el));

		return () => sectionElements.forEach((el) => observer.unobserve(el));
	}, []);
	return (
		<div className="flex flex-col justify-between overflow-hidden h-full w-full">
			{/* header */}
			<div className="flex justify-between items-center min-h-[64px] px-5 bg-white border-b border-[#E8E8E8]">
				<div className="flex gap-x-5 items-center">
					<Button
						onClick={() => router.back()}
						variant={"outline"}
						size={"icon"}
						className="text-[#474747] rounded-full"
					>
						<ChevronLeft className="text-[#8f8f8f] size-6" />
					</Button>

					<h2 className="text-xl text-[#474747]">
						Edit Item Details
					</h2>
				</div>
				<div className="flex gap-x-2 items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant={"outline"}
								className="rounded-full size-10 bg-transparent text-[#B3B3B3] hover:text-[#B3B3B3]"
							>
								<BsThreeDotsVertical className="size-6" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[300px] -ml-60">
							<DropdownMenuLabel className="text-lg text-[#6B6B6B] font-normal">
								Action
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() =>
									setTimeout(() => {
										setShowRemoveStockDialog(true);
									}, 200)
								}
							>
								<div className="flex items-center text-base gap-x-2 py-1 flex-1 text-danger">
									<TrashIcon className="size-6 text-danger" />{" "}
									Remove Product from All
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{/* body */}
			<div className="flex flex-1 max-h-[70vh] w-full">
				{/* sidebar */}
				<div className="center flex-col min-w-[280px] max-w-[280px] max-h-full flex-1 bg-white border-r border-[#E8E8E8]">
					{sections.map((section, i) => (
						<Button
							key={i}
							className={cn(
								"justify-between h-[38px] w-full",
								currentSection === section.value
									? "text-brand hover:text-brand"
									: "text-[#8F8F8F] hover:text-[#8F8F8F]"
							)}
							variant={"ghost"}
							size={"sm"}
							onClick={() => {
								document
									.getElementById(section.value)
									?.scrollIntoView({
										behavior: "smooth",
									});
							}}
						>
							{section.title}
							<ChevronRight />
						</Button>
					))}
				</div>
				{/* Form */}
				<div className="flex-1 max-h-full overflow-y-auto space-y-6 pr-[15%] min-w-[831px] bg-brand/[2%]">
					{/* basic details */}
					<section className="flex flex-col m-6 gap-y-6" id="basic">
						{/* header */}
						<div className="flex w-full justify-between">
							<div className="flex flex-col flex-1">
								<span className="text-lg text-[#474747]">
									Type
								</span>
								<span className="text-sm text-[#6B6B6B]">
									This is a...
								</span>
							</div>
							<div className="flex-1">
								<div
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "lg",
										}),
										"w-full border border-brand/30 hover:bg-white shadow shadow-brand/10"
									)}
								>
									<Image
										alt="items"
										src={items}
										className="size-6"
									/>
									Items
								</div>
							</div>
						</div>
						{/* body */}
						<div className="p-10 bg-white rounded flex flex-col">
							<h2 className="text-lg text-[#474747] border-l-4 border-l-brand pl-4">
								Basic Details
							</h2>
							{/* images */}
							{/* conditionally render and change size of images based on itemType */}
							<div className="gap-2 my-7 flex">
								{/* square image 1 */}
								<div className="size-[220px] p-2 bg-white">
									<div className="h-full w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
										<PiUploadSimpleBold className="size-5 text-brand" />
										<div className="flex gap-1 items-center">
											<span className="text-[#6B6B6B]">
												Upload Photo
											</span>
											<span className="text-brand font-medium text-base">
												Click here
											</span>
										</div>
									</div>
								</div>
								{/* square image 2 */}
								<div className="size-[220px] p-2 bg-white">
									<div className="h-full w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
										<PiUploadSimpleBold className="size-5 text-brand" />
										<div className="flex gap-1 items-center">
											<span className="text-[#6B6B6B]">
												Upload Photo
											</span>
											<span className="text-brand font-medium text-base">
												Click here
											</span>
										</div>
									</div>
								</div>
								{/* two long images */}
								<div className="flex flex-1 flex-col gap-3">
									<div className="flex-1 p-2 bg-white">
										<div className="h-full w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
											<PiUploadSimpleBold className="size-5 text-brand" />
											<div className="flex gap-1 items-center">
												<span className="text-[#6B6B6B]">
													Upload Photo
												</span>
												<span className="text-brand font-medium text-base">
													Click here
												</span>
											</div>
										</div>
									</div>
									<div className="flex-1 p-2 bg-white">
										<div className="h-full w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
											<PiUploadSimpleBold className="size-5 text-brand" />
											<div className="flex gap-1 items-center">
												<span className="text-[#6B6B6B]">
													Upload Photo
												</span>
												<span className="text-brand font-medium text-base">
													Click here
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* item name */}
							<div className="flex flex-1 mb-5">
								<span className="min-w-40 font-semibold">
									<span className="text-danger capitalize">
										* Item Name
									</span>{" "}
									:
								</span>
								<Input
									className="bg-white placeholder:text-[#B3B3B3]"
									placeholder={
										"Eg. Britannia Marie"
										// itemType === "item"
										// 	? "Eg. Britannia Marie"
										// 	: "Eg. computer Repair & Maintenance"
									}
								/>
							</div>
							{/* item description */}
							<div className="flex flex-1 mb-14">
								<span className="min-w-40 font-semibold text-[#000000D9]">
									Description :
								</span>
								<Textarea
									className="min-h-24 bg-white placeholder:text-[#B3B3B3]"
									placeholder="Start writing a description"
								/>
							</div>
							<div className="flex flex-1 pb-6 gap-x-10">
								{/* unit */}
								<div className="flex flex-1">
									<span className="min-w-40 text-[#000000D9] font-semibold">
										<span className="text-danger">*</span>{" "}
										Unit
									</span>
									<div className="flex-1 items-center flex gap-x-4">
										<UnitSelect
											className="w-full"
											unitType={"item"}
											value={selectedUnit}
											onChange={(val) =>
												setSelectedUnit(val)
											}
											initialUnits={ItemUnitsArray}
										/>
										{/* {itemType === "item" && (
											<UnitSelect
												unitType={itemType}
												value={selectedUnit}
												onChange={(val) =>
													setSelectedUnit(val)
												}
												initialUnits={ItemUnitsArray}
											/>
										)} */}
										{/* {itemType === "service" && (
											<UnitSelect
												unitType={itemType}
												value={selectedUnit}
												onChange={(val) =>
													setSelectedUnit(val)
												}
												initialUnits={ServiceUnitsArray}
											/>
										)} */}
									</div>
								</div>
								{/* hsn/sac code */}
								<div className="flex flex-1">
									<span className="min-w-40 text-[#000000D9] font-semibold">
										HSN Code
										{/* {itemType === "item" ? "HSN" : "SAC"}{" "} */}
									</span>
									<div className="flex-1 items-center flex gap-x-4">
										<div className="flex-1 relative">
											<Input
												className="pr-10 bg-white placeholder:text-[#B3B3B3]"
												placeholder="Enter HSN Code"
											/>
											<Button
												variant={"ghost"}
												size={"icon"}
												className="absolute top-0 hover:text-brand right-0"
											>
												<Search className="size-4 text-[#8F8F8F]" />
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* pricing and tax */}
					<section
						className="p-10 m-6 bg-white rounded flex flex-col"
						id="pricing"
					>
						<div className="flex gap-x-6">
							<h2 className="text-lg text-[#474747] h-fit border-l-4 border-l-brand pl-4 flex flex-col min-w-[40%] max-w-[40%]">
								<CashIcon className="size-5" />
								Pricing & Tax
								<span className="text-sm text-[#6B6B6B]">
									Add the Pricing and Tax related details of
									the item or service
								</span>
							</h2>
							<div className="flex gap-y-6 text-sm flex-1 flex-col pb-6">
								{/* selling price */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40 max-w-40 font-semibold">
										<span className="text-danger flex gap-x-1">
											<span>*</span>
											<span>
												Selling Price per Unit (MRP)
											</span>
										</span>
										<span className="pr-6">:</span>
									</span>
									<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
										<Input
											placeholder="₹ Enter Selling Price"
											className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
										/>
										<Select defaultValue={"With Tax"}>
											<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{[
													"With Tax",
													"Without Tax",
												].map((option, i) => (
													<SelectItem
														key={i}
														className="flex-1"
														value={option}
													>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								{/* purchase price */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40">
										<span className="flex text-danger gap-x-1">
											<span>*</span>
											<span className="max-w-[119px] font-semibold">
												Purchase/Cost Price
												{/* {itemType === "item"
										? "Purchase/Cost Price"
										: "Cost of Service"} */}
											</span>
										</span>
										<span className="pr-6">:</span>
									</span>
									<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
										<Input
											placeholder={
												"₹ Enter Purchase/Cost Price"
												// itemType === "item"
												// 	? "₹ Enter Purchase/Cost Price"
												// 	: "₹ Enter Expenses"
											}
											className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
										/>
										<Select defaultValue={"With Tax"}>
											<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{[
													"With Tax",
													"Without Tax",
												].map((option, i) => (
													<SelectItem
														key={i}
														className="flex-1"
														value={option}
													>
														{option}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								{/* gst slab */}
								<div className="flex flex-1">
									<span className="min-w-40 font-semibold">
										<span className="text-danger">
											* GST Slab
										</span>{" "}
										:
									</span>
									<div className="flex-1 items-center flex gap-x-4">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													className={`flex-1 relative justify-between shadow-none px-3 text-left hover:bg-white text-sm font-normal ${
														selectedGSTLabel.startsWith(
															"Select"
														)
															? "text-[#B3B3B3] hover:text-[#B3B3B3]"
															: ""
													}`}
												>
													{selectedGSTLabel}
													<div className="size-[38.5px] rounded-r hover:bg-gray-200 justify-center items-center flex bg-[#fafafa] absolute top-0 right-0 ">
														<ChevronDown />
													</div>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="flex-1 min-w-[521px]">
												{gstArray.map((option, i) => (
													<DropdownMenuItem
														key={i}
														onClick={() =>
															handleSelect(
																option.heading,
																option.percentage
															)
														}
													>
														<div className="flex flex-col">
															<span className="text-sm font-medium text-[#474747]">
																{option.heading}{" "}
																-{" "}
																{
																	option.percentage
																}
																%
															</span>
															{option.description && (
																<span className="text-xs text-muted-foreground">
																	{
																		option.description
																	}
																</span>
															)}
														</div>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
								{/* discount in each */}
								<div className="flex flex-1">
									<span className="min-w-40 font-semibold">
										Discount{" "}
										{/* {itemType === "item" ? "in each" : ""} */}
									</span>
									<div className="flex-1 items-center flex gap-x-6">
										<RadioGroup
											value={currencyType}
											onValueChange={(value) =>
												setCurrencyType(
													value as
														| "percentage"
														| "rupees"
												)
											}
											className="flex space-x-3 text-[#6B6B6B]"
										>
											{/* Percentage Option */}
											<Label className="flex items-center space-x-1">
												<span className="text-base">
													%
												</span>
												<RadioGroupItem value="percentage" />
											</Label>

											{/* Rupees Option */}
											<Label className="flex items-center space-x-1">
												<span className="text-base">
													₹
												</span>
												<RadioGroupItem value="rupees" />
											</Label>
										</RadioGroup>
										<Input className="bg-white rounded shadow-none border-[#D6D6D6]" />
									</div>
								</div>
								{/* tds slab ; conditionally render in service only; create a new state & array for this data and value*/}
								<div className="flex flex-1">
									<span className="min-w-40 font-semibold">
										TDS Slab :
									</span>
									<div className="flex-1 items-center flex gap-x-4">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													className={`flex-1 relative justify-between shadow-none px-3 text-left hover:bg-white text-sm font-normal ${
														selectedTDSLabel.startsWith(
															"Select"
														)
															? "text-[#B3B3B3] hover:text-[#B3B3B3]"
															: ""
													}`}
												>
													{selectedTDSLabel}
													<div className="size-[38.5px] rounded-r hover:bg-gray-200 justify-center items-center flex bg-[#fafafa] absolute top-0 right-0 ">
														<ChevronDown />
													</div>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="flex-1 min-w-[521px]">
												{gstArray.map((option, i) => (
													<DropdownMenuItem
														key={i}
														onClick={() =>
															handleSelect(
																option.heading,
																option.percentage
															)
														}
													>
														<div className="flex flex-col">
															<span className="text-sm font-medium text-[#474747]">
																{option.heading}{" "}
																-{" "}
																{
																	option.percentage
																}
																%
															</span>
															{option.description && (
																<span className="text-xs text-muted-foreground">
																	{
																		option.description
																	}
																</span>
															)}
														</div>
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</div>
						</div>
						{/* don't render this in service */}
						<div className="flex gap-x-6">
							<h3 className="text-lg text-[#474747] pt-10 h-fit min-w-[40%] max-w-[40%]">
								Pricing Breakdown
							</h3>
							<div className="flex gap-y-6 text-sm border-t pt-10 flex-1 flex-col pb-6">
								{/* packaging cost */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40 font-semibold">
										<span>Packaging Cost</span>
										<span className="pr-6">:</span>
									</span>
									<Input
										placeholder="₹ Enter Packaging Cost"
										className="flex-1 bg-white placeholder:text-[#B3B3B3]"
									/>
								</div>
								{/* raw material cost */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40 font-semibold">
										<span>Raw Material Cost</span>
										<span className="pr-6">:</span>
									</span>
									<Input
										placeholder="₹ Enter Raw Material Cost"
										className="flex-1 bg-white placeholder:text-[#B3B3B3]"
									/>
								</div>
							</div>
						</div>
					</section>

					{/* warehouse stock; don't render this in service */}
					<section
						className="p-10 m-6 bg-white rounded flex flex-col"
						id="stock"
					>
						<div className="flex gap-x-6">
							<h2 className="text-lg text-[#474747] h-fit border-l-4 border-l-brand pl-4 flex flex-col min-w-[40%] max-w-[40%]">
								<PackageIcon className="size-5 text-[#8f8f8f]" />
								Stock, Inventory & BAR Code
								<span className="text-sm text-[#6B6B6B]">
									Set how many units are in stock and in which
									warehouses
								</span>
							</h2>
							<div className="flex gap-y-6 text-sm flex-1 flex-col pb-6 border-b">
								{/* opening stock */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40 font-semibold">
										<span>
											<span className="text-danger">
												*
											</span>{" "}
											Opening Stock
										</span>
										<span className="pr-6">:</span>
									</span>
									<Input
										placeholder="₹ Enter Cost Price"
										className="flex-1 bg-white shadow-none border border-[#D6D6D6] rounded placeholder:text-[#B3B3B3]"
									/>
								</div>
								{/* as of date */}
								<div className="flex flex-1">
									<span className="flex justify-between items-center min-w-40 font-semibold">
										<span>
											<span className="text-danger">
												*
											</span>{" "}
											as of
										</span>
										<span className="pr-6">:</span>
									</span>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"max-w-[200px] flex-1 justify-between text-left font-normal",
													!asOfDate
														? "text-[#B3B3B3]"
														: "text-[#242424]"
												)}
											>
												{asOfDate ? (
													format(
														asOfDate,
														"yyyy-MM-dd"
													)
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="text-[#00000040] size-4" />
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={asOfDate}
												onSelect={setAsOfDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>
						<div className="flex gap-x-6 mt-10">
							<div className="h-fit min-w-[40%] max-w-[40%] flex flex-col">
								<h1 className="text-lg text-[#474747] flex">
									Warehouse
									<span className="center bg-brand/10 text-brand rounded-full size-6 text-sm pb-0.5 ml-2 font-semibold">
										3
									</span>
								</h1>
								<span className="text-sm text-[#6B6B6B]">
									Current Stock in Warehouse(s)
								</span>
							</div>
							<div className="flex gap-y-10 text-sm flex-1 flex-col pb-6">
								{warehouses.map((warehouse, i) => (
									<div key={i} className="flex gap-x-3">
										<div className="p-4 h-fit rounded-lg bg-[#fafafa] text-[#8F8F8F] flex items-center justify-center">
											<PiWarehouse className="size-4 h-fit" />
										</div>
										<div className="flex flex-col gap-y-4 text-sm">
											<div className="flex gap-x-4">
												<div className="flex flex-col flex-1">
													<div className="font-medium text-lg text-[#242424]">
														{warehouse.name}
													</div>
													<div className="text-[#6B6B6B] max-w-[120px] truncate">
														{warehouse.address}
													</div>
												</div>
												<Input
													readOnly
													value={warehouse.quantity}
												/>
											</div>
											<div className="flex gap-x-4">
												<div className="min-w-[120px] text-[#8F8F8F]">
													Batch Number :
												</div>
												<div className="flex-1">
													{warehouse.batchName}
												</div>
											</div>
											<div className="flex gap-x-4">
												<div className="min-w-[120px] text-[#8F8F8F]">
													Low Stock Alert :
												</div>
												<div className="flex-1">
													{warehouse.lowStockAlert}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<Button
								className="text-brand hover:text-brand"
								variant={"ghost"}
								onClick={() => setShowWarehouseDialog(true)}
							>
								<TbEdit /> Edit
							</Button>
						</div>
					</section>

					{/* quality assurance */}
					<section
						className="p-10 m-6 bg-white flex flex-1 rounded"
						id="quality"
					>
						<h2 className="text-lg min-w-[320px] h-fit text-[#474747] border-l-4 border-l-brand pl-4">
							Quality Assurance
						</h2>
						<div className="flex flex-col gap-y-6 flex-1">
							{/* mark as perishable */}
							<div className="flex gap-x-2">
								<Checkbox
									checked={markedAsPerishable}
									onClick={() =>
										setMarkedAsPerishable((prev) => !prev)
									}
								/>
								<div className="flex flex-col flex-1">
									<h3 className="text-[#242424] font-semibold text-base">
										Mark as Perishable Item
									</h3>
									<p className="text-[#6B6B6B] text-sm">
										Expiry date will be applied from date of
										purchase
									</p>

									<div className="flex flex-1 mt-5">
										<span className="min-w-40 text-sm font-medium">
											Expire time :
										</span>
										<div className="flex-1 items-center flex gap-x-4">
											<Select
												disabled={!markedAsPerishable}
											>
												<SelectTrigger className="flex-1 bg-white rounded shadow-none placeholder:text-[#B3B3B3] border-[#D6D6D6]">
													<SelectValue placeholder="Select time to expire" />
												</SelectTrigger>

												<SelectContent>
													{timeToExpire.map(
														(option, i) => (
															<SelectItem
																key={i}
																value={option}
															>
																{option}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
							</div>
							{/* set product warranty */}
							<div className="flex gap-x-2">
								<Checkbox
									checked={warranty}
									onClick={() => setwarranty((prev) => !prev)}
								/>
								<div className="flex flex-col flex-1">
									<h3 className="text-[#242424] font-semibold text-base">
										{/* {itemType === "item"
								? "Set Product Warranty"
								: "Set Service Warranty/Maintenance"} */}
										Set Product Warranty
									</h3>
									<p className="text-[#6B6B6B] text-sm">
										Warranty will be set upon Sales date
									</p>

									<div className="flex flex-1 mt-5">
										<span className="min-w-40 text-sm font-medium">
											{/* {itemType === "item" ? "Warranty" : "Select"}{" "} */}
											Warranty Period :
										</span>
										<div className="flex flex-1 items-center ring ring-[#D6D6D6] rounded">
											<Input
												placeholder="Enter Warranty Period"
												disabled={!warranty}
												className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
											/>
											<Select
												disabled={!warranty}
												defaultValue={"Yrs"}
											>
												<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{["Yrs", "Mon"].map(
														(option, i) => (
															<SelectItem
																key={i}
																className="flex-1"
																value={option}
															>
																{option}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
							</div>
							{/* top selling */}
							<div className="flex gap-x-2">
								<Checkbox />
								<div className="flex flex-col flex-1">
									<h3 className="text-[#242424] font-semibold text-base flex gap-x-2">
										{/* Mark {itemType} as{" "} */}
										Mark Product as{" "}
										<span className="px-2 bg-[#FAAD14] text-white flex gap-x-1 items-center rounded-full text-xs font-normal">
											<Image
												alt="medal icon"
												src={medal}
												className="size-3"
											/>{" "}
											Top Selling
										</span>
									</h3>
									<p className="text-[#6B6B6B] text-sm">
										You will be promptly notified about any
										updates from a “Top Selling” Product
										{/* {itemType === "item" ? "Product" : "Service"} */}
									</p>
								</div>
							</div>
						</div>
					</section>

					<hr className="mx-6 pb-5" />

					{/* online shop */}
					<section className="relative m-6 h-fit flex-1" id="store">
						<Link href={"#"} className="flex-1">
							<Image
								alt="Online store"
								src={online_store_big}
								width={1000}
								height={400}
								className="min-h-fit min-w-full"
							/>
						</Link>
					</section>
				</div>
			</div>
			{/* footer */}
			<div
				style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
				className="flex h-[72px] px-6 border-t bg-white mt-auto border-[#E8E8E8] justify-between items-center"
			>
				<Button variant={"outline"} onClick={() => router.back()}>
					Cancel
				</Button>

				<Button onClick={() => router.back()}>
					<AiOutlineCheck strokeWidth={50} className="-mr-1" /> Update
					Changes
				</Button>
			</div>
			{/* remove stock dialog */}
			<RemoveStockDialog
				onOpenChange={setShowRemoveStockDialog}
				open={showRemoveStockDialog}
				runFx={async (data: any) => {
					console.log(data);
				}}
			/>
			{/* warehouse dialog */}
			<WarehouseDialog
				warehouses={warehouses}
				open={showWarehouseDialog}
				onOpenChange={setShowWarehouseDialog}
			/>
		</div>
	);
};

export default EditItemForm;

type SwitchOption = "spoiled" | "expired" | "closing";
const optionData: {
	title: string;
	description: string;
	value: SwitchOption;
}[] = [
	{
		value: "spoiled",
		title: "Product got Spoiled",
		description:
			"The items were damaged due to lack of care, or environmental hazard",
	},
	{
		value: "closing",
		title: "Closing Warehouse",
		description: "We are closing the warehouse for now",
	},
	{
		value: "expired",
		title: "Items Expired",
		description: "The items surpassed expiry date and are no longer useful",
	},
];

const RemoveStockDialog: FC<{
	open: boolean;
	onOpenChange: (value: boolean) => void;
	runFx: (data: any) => Promise<void>;
}> = ({ onOpenChange, open, runFx }) => {
	const [reason, setReason] = useState<SwitchOption | undefined>(undefined);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const handleSwitch = (option: SwitchOption) => {
		if (option === reason) {
			setReason(undefined);
			return;
		}
		setReason(option);
	};
	const handleRemove = async () => {
		await runFx(reason);
		onOpenChange(false);
		return true;
	};

	return (
		<>
			<ConfirmationDialog
				open={showConfirmation}
				onOpenChange={setShowConfirmation}
				acceptBtnFx={handleRemove}
				description="Are you sure you want to remove the Stock"
				acceptText={"Yes, Remove Stock"}
				acceptBtnClass="bg-danger hover:bg-danger"
				cancelText="Keep it"
			/>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="p-0 rounded-none min-w-[640px]">
					<DialogHeader>
						<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
							<span className="flex items-center gap-x-3">
								<Info className="text-warning" /> Remove Stock
							</span>
							<DialogClose asChild>
								<Button
									variant={"outline"}
									size={"icon"}
									className="rounded-full"
								>
									<X />
								</Button>
							</DialogClose>
						</DialogTitle>
						<DialogDescription className="px-6 pt-4 flex flex-col space-y-4 text-base">
							<span className="text-[#474747]">
								Removing a Stock would mark as a Loss in
								Reporting.
							</span>
							<span className="text-[#6B6B6B]">
								Please mention why you want to remove your Stock
							</span>
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4 px-6 pb-4">
						{optionData.map((option, i) => (
							<div key={i} className="flex gap-x-4">
								<Checkbox
									className="mt-1"
									checked={reason === option.value}
									onClick={() => handleSwitch(option.value)}
								/>
								<div className="flex flex-col">
									<h3 className="text-[#242424] font-semibold text-base">
										{option.title}
									</h3>
									<p className="text-sm text-[#6B6B6B]">
										{option.description}
									</p>
								</div>
							</div>
						))}
					</div>
					<DialogFooter className="px-6 py-4 border-t">
						<DialogClose asChild>
							<Button variant="ghost">Cancel</Button>
						</DialogClose>
						<Button
							className="bg-danger ml-auto hover:bg-danger"
							onClick={() => {
								if (!reason) {
									toast.error("Select a reason");
									return;
								}
								setShowConfirmation(true);
							}}
						>
							Remove Stock
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const WarehouseDialog: FC<{
	open: boolean;
	onOpenChange: (value: boolean) => void;
	warehouses: WarehouseType[];
}> = ({ onOpenChange, open, warehouses }) => {
	const handleUpdate = () => {
		onOpenChange(false);
	};
	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="p-0 rounded-none min-w-[640px] max-h-[75vh] bg-[#fafafa]">
					<DialogHeader className="bg-white">
						<DialogTitle className="border-b h-[88px] max-h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
							<span className="flex items-center gap-x-3">
								<PiWarehouse className="text-[#8f8f8f]" />{" "}
								Warehouse Stock & Inventory
							</span>
							<DialogClose asChild>
								<Button
									variant={"outline"}
									size={"icon"}
									className="rounded-full"
								>
									<X />
								</Button>
							</DialogClose>
						</DialogTitle>
					</DialogHeader>
					<div className="px-6 py-4 overflow-y-auto max-h-[60vh] -my-4">
						<div className="flex flex-col gap-y-5">
							{warehouses.map((warehouse, i) => (
								<WareHouseItem
									warehouse={warehouse}
									key={i}
									warehouses={warehouses}
								/>
							))}
						</div>
					</div>
					<DialogFooter className="px-6 py-4 border-t bg-white">
						<DialogClose asChild>
							<Button variant="ghost">Cancel</Button>
						</DialogClose>
						<Button className="ml-auto" onClick={handleUpdate}>
							Update
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const WareHouseItem: FC<{
	warehouse: WarehouseType;
	warehouses: WarehouseType[];
}> = ({ warehouse, warehouses }) => {
	const [showRemoveStock, setshowRemoveStock] = useState<boolean>(false);
	const [showTransfer, setShowTransfer] = useState<boolean>(false);

	return (
		<div className="flex gap-x-3 bg-white rounded p-6 ring ring-[#E8E8E8]">
			{/* icon */}
			<div className="p-4 h-fit rounded-md bg-[#fafafa] text-[#8F8F8F] flex items-center justify-center">
				<PiWarehouse className="size-4 h-fit" />
			</div>
			{/* warehouse name and address */}
			<div className="flex flex-col flex-1">
				<div className="font-medium text-lg text-[#242424]">
					{warehouse.name}
				</div>
				<div className="text-[#6B6B6B] text-sm">
					{warehouse.address}
				</div>
				<div className="space-y-4 mt-3 flex gap-x-5">
					<div className="flex max-w-[40%] min-w-[40%] flex-col gap-y-4">
						{/* batch name */}
						<div className="flex-1">
							<Label className="text-sm mb-1">Batch Name :</Label>
							<div className="relative">
								<span className="absolute top-[1px] right-[1px]">
									<BatchProcess />
								</span>
								<Input
									className="placeholder:text-[#B3B3B3] pr-10"
									placeholder="BT-00001"
									value={warehouse.batchName}
									readOnly
								/>
							</div>
						</div>
						{/* low stock alert */}
						<div className="flex-1 flex flex-col mb-1">
							<Label className="text-sm">
								<span className="text-danger">*</span> Low Stock
								Alert :
							</Label>
							<Input
								className="placeholder:text-[#B3B3B3]"
								placeholder="Enter Number"
								type="number"
								value={warehouse.lowStockAlert}
								onChange={(e) =>
									(warehouse.lowStockAlert = e.target.value)
								}
							/>
						</div>
					</div>
					{/* how many in warehouse */}
					<div className="flex-1">
						<Label className="text-sm mb-1">
							<span className="text-danger">*</span> How many in
							this warehouse :
						</Label>
						<Input
							className="placeholder:text-[#B3B3B3]"
							type="number"
							placeholder="Enter Number"
							value={warehouse.quantity}
							readOnly
						/>
					</div>
				</div>
				<div className="w-full flex">
					<div className="center flex-1">
						<Button
							variant={"ghost"}
							className="text-brand hover:text-brand"
							onClick={() => setShowTransfer(true)}
						>
							<TransferIcon />
							Transfer Stock
						</Button>
					</div>
					<div className="center flex-1">
						<Button
							variant={"ghost"}
							className="text-danger hover:text-danger"
							onClick={() => setshowRemoveStock(true)}
						>
							<TrashIcon /> Remove Stock
						</Button>
					</div>
				</div>
			</div>
			{/* remove stock */}
			<RemoveStockDialog
				open={showRemoveStock}
				onOpenChange={setshowRemoveStock}
				runFx={async (data: any) => {
					console.log(data);
				}}
			/>
			<TransferStockDialog
				open={showTransfer}
				onOpenChange={setShowTransfer}
				runFx={async (data: any) => {
					console.log(data);
				}}
				warehouses={warehouses}
			/>
		</div>
	);
};

export const ConfirmationDialog: FC<{
	open: boolean;
	description: ReactNode;
	onOpenChange: (val: boolean) => void;
	acceptBtnFx: () => Promise<boolean>;
	cancelText?: string;
	acceptText?: String;
	cancelBtnClass?: string;
	acceptBtnClass?: string;
}> = ({
	acceptBtnFx,
	acceptText = "Accept",
	cancelText = "Cancel",
	description,
	onOpenChange,
	open,
	acceptBtnClass,
	cancelBtnClass,
}) => {
	const handleAccept = async () => {
		const success = await acceptBtnFx();
		onOpenChange(false);
		if (success) {
			toast.success("success");
		} else {
			toast.error("error");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="p-0 rounded-md min-w-[419px] max-w-[419px]">
				<DialogHeader>
					<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
						<span className="flex items-center gap-x-3">
							<Info className="text-brand" /> Head's up
						</span>
						<DialogClose asChild>
							<Button
								variant={"ghost"}
								size={"icon"}
								className="rounded-full"
							>
								<X />
							</Button>
						</DialogClose>
					</DialogTitle>
					<DialogDescription className="px-6 pt-4 text-base text-[#6B6B6B]">
						{description}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="px-6 py-4 border-t">
					<DialogClose asChild>
						<Button variant="ghost" className={cancelBtnClass}>
							{cancelText}
						</Button>
					</DialogClose>
					<Button
						className={cn(acceptBtnClass, "ml-auto")}
						onClick={handleAccept}
					>
						{acceptText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const TransferStockDialog: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
	runFx: (data: any) => Promise<void>;
	warehouses: WarehouseType[];
}> = ({ onOpenChange, open, runFx, warehouses }) => {
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const handleUpdate = async () => {
		await runFx(open);
		onOpenChange(false);
		return true;
	};
	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="p-0 rounded-none min-w-[439px] max-w-[439px]">
					<DialogHeader>
						<DialogTitle className="border-b h-[68px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
							Transfer Stock to
						</DialogTitle>
						<div className="max-h-[200px] flex flex-col overflow-y-auto">
							{warehouses.map((wh, i) => (
								<Button
									key={i}
									variant={"ghost"}
									size={"lg"}
									className="justify-start h-[64px] text-start !text-[#8F8F8F]"
									onClick={() => setShowConfirmation(true)}
								>
									<PiWarehouse className="size-12 p-4 bg-[#fafafa] rounded-md" />
									<span className="flex flex-col">
										<span className="text-lg text-[#474747]">
											{wh.name}
										</span>
										<span className="max-w-full truncate">
											{wh.address}
										</span>
									</span>
								</Button>
							))}
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			{/* confirmation dialog */}
			<ConfirmationDialog
				acceptBtnFx={handleUpdate}
				description={
					<span className="flex flex-col">
						<span>
							Are you sure you want to transfer the Stock to
						</span>
						<span>
							<span className="text-[#474747] font-semibold">
								Pratapgarh
							</span>{" "}
							?
						</span>
					</span>
				}
				onOpenChange={setShowConfirmation}
				open={showConfirmation}
				acceptText={"Yes Transfer"}
			/>
		</>
	);
};
