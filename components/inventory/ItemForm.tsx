"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Plus,
	Search,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import items from "@/assets/svgs/inventory-items.svg";
import service from "@/assets/svgs/inventory-service.svg";
import medal from "@/assets/svgs/medal.svg";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { PiWarehouse } from "react-icons/pi";
import AddCustomerDrawer from "@/components/invoice-components/AddCustomerDrawer";
import BatchProcess from "@/components/inventory/BatchProcessing";
import InfoCard from "./InfoCard";
import { CashIcon } from "@/assets/svgIcons/CustomIcons";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import UnitSelect from "@/components/inventory/UnitSelect";
import { CustomModal } from "@/components/inventory/SuccessPopUp";
import { Checkbox } from "../ui/checkbox";
import { CreateItemFormType, InfoCardType, InventoryUnit } from "@/types/inventory-types";
import * as Yup from "yup";

const createItemSchema = Yup.object({
	type: Yup.string().oneOf(["PRODUCT", "SERVICE"]).required(),

	name: Yup.string().required("Name is required"),
	description: Yup.string(),

	purchase: Yup.object({
		price: Yup.number().required(),
		finalPrice: Yup.number().required(),
		raw: Yup.object({
			price: Yup.number(),
			isPartOfPrice: Yup.boolean(),
		}),
	}),

	selling: Yup.object({
		price: Yup.number().required(),
		finalPrice: Yup.number().required(),
		packaging: Yup.object({
			price: Yup.number(),
			isIncludedInPrice: Yup.boolean(),
		}),
	}),

	tax: Yup.string().required(),
	vendorId: Yup.string().required(),
	categoryId: Yup.string().required(),
	unitId: Yup.string().required(),
	stock: Yup.number().required(),
	hsn: Yup.string(),

	discountType: Yup.mixed<"PERCENTAGE" | "AMOUNT">(),
	discountValue: Yup.number(),

	openingStock: Yup.object({
		date: Yup.string().required(),
		stock: Yup.number().required(),
	}),

	manufactureDate: Yup.string().nullable(),

	perishableItem: Yup.boolean(),
	perishableExpiryDate: Yup.string().when("perishableItem", {
		is: true,
		then: Yup.string().required("Perishable expiry date required"),
		otherwise: Yup.string().nullable(),
	}),

	isProductWarranty: Yup.boolean(),
	warrantyExpiryDate: Yup.string().when("isProductWarranty", {
		is: true,
		then: Yup.string().required("Warranty expiry date required"),
		otherwise: Yup.string().nullable(),
	}),

	isTopSelling: Yup.boolean(),

	warehouses: Yup.array(
		Yup.object({
			warehouseId: Yup.string().required(),
			quantity: Yup.number().required(),
			lowStockThreshold: Yup.number().required(),
			batchId: Yup.string().required(),
			idSequence: Yup.number().nullable(),
			expiryDate: Yup.string().nullable(),
			isExpired: Yup.boolean().nullable(),
		})
	),
});

const initialValues: CreateItemFormType = {
	type: "PRODUCT",
	name: "",
	description: "",

	purchase: {
		price: 0,
		finalPrice: 0,
		raw: {
			price: 0,
			isPartOfPrice: false,
		},
	},

	selling: {
		price: 0,
		finalPrice: 0,
		packaging: {
			price: 0,
			isIncludedInPrice: false,
		},
	},

	tax: "",
	vendorId: "",
	categoryId: "",
	unitId: "",
	stock: 0,
	hsn: "",
	discountType: undefined,
	discountValue: undefined,

	openingStock: {
		date: new Date().toISOString(),
		stock: 0,
	},
	manufactureDate: undefined,

	perishableItem: false,
	perishableExpiryDate: undefined,

	isProductWarranty: false,
	warrantyExpiryDate: undefined,

	isTopSelling: false,

	warehouses: [],
};



type ItemDataType = "item" | "service";

const ItemForm: FC = () => {
	const router = useRouter();
	const [itemType, setItemType] = useState<ItemDataType>("item");
	const [openSuccess, setOpenSuccess] = useState(false);
	const [dontShowAgain, setDontShowAgain] = useState(false);
	const [position, setPosition] = useState<number>(1);
	const maxItemPosition = 4;
	const maxServicePosition = 3;

	const moveForward = () => {
		if (itemType === "item") {
			if (position < maxItemPosition) {
				setPosition((prev) => prev + 1);
			}
		} else {
			if (position < maxServicePosition) {
				setPosition((prev) => prev + 1);
			}
		}
	};
	const moveBackward = () => {
		if (position > 1) {
			setPosition((prev) => prev - 1);
		}
	};

	const toggleItemType = (type: ItemDataType) => {
		setItemType((prev) => {
			if (prev === type) {
				return prev;
			} else {
				return type;
			}
		});
	};

	return (
		<div className="flex relative flex-col h-full w-full bg-brand/[2%]">
			{/* header */}
			<div className="max-h-[66px] flex flex-1 px-7 items-center justify-between sticky -top-5 z-40 py-2 bg-white border-b border-[#E8E8E8]">
				<Button
					variant={"outline"}
					size={"icon"}
					disabled={position === 1}
					className="rounded-full"
					onClick={moveBackward}
				>
					<ChevronLeft className="size-5" />
				</Button>
				<div className="flex flex-1 max-w-[70%] flex-col space-y-2">
					<div className="flex flex-1 justify-between items-center">
						<span className="text-[#474747] capitalize">
							Add New {itemType}
						</span>
						<span className="text-[#242424]">
							{position} /{" "}
							{itemType === "item"
								? maxItemPosition
								: maxServicePosition}
						</span>
					</div>
					<div className="flex h-5 gap-x-5 flex-1 justify-between items-center">
						{Array.from(
							{
								length:
									itemType === "item"
										? maxItemPosition
										: maxServicePosition,
							},
							(_, i) => i + 1
						).map((pos) => (
							<span
								key={pos}
								className={`h-2 rounded-full flex-1 transition-colors duration-300 ${
									pos <= position
										? "bg-brand"
										: "bg-[#E8E8E8]"
								}`}
							/>
						))}
					</div>
				</div>
				<Button
					variant={"outline"}
					size={"icon"}
					className="rounded-full"
					onClick={() => router.push("/inventory")}
				>
					<X className="size-5 text-[#8F8F8F]" />
				</Button>
			</div>
			{/* body */}
			<div className="overflow-y-auto flex-1">
				<div className="flex-1 min-h-[400px] max-w-[717px] min-w-[717px] mx-auto py-5">
					{position === 1 && (
						<BasicDetailsComponent
							itemType={itemType}
							toggleItemType={toggleItemType}
						/>
					)}
					{position === 2 && <PricingComponent itemType={itemType} />}
					{position === 3 && (
						<>
							{itemType === "item" ? (
								<StockComponent />
							) : (
								<QualityComponent itemType={itemType} />
							)}
						</>
					)}
					{position === 4 && <QualityComponent itemType={itemType} />}
				</div>
			</div>
			{/* footer */}
			<div
				style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
				className="flex px-10 py-4 border-t bg-white mt-auto border-[#E8E8E8] justify-between items-center"
			>
				{position === 1 ? (
					<Button
						variant={"outline"}
						onClick={() => router.push("/inventory")}
					>
						Cancel
					</Button>
				) : (
					<Button variant={"outline"} onClick={moveBackward}>
						<ChevronLeft /> Back
					</Button>
				)}
				{(itemType === "item" && position < maxItemPosition) ||
				(itemType === "service" && position < maxServicePosition) ? (
					<Button onClick={moveForward}>
						Next <ChevronRight />
					</Button>
				) : (
					<div>
						<Button onClick={() => setOpenSuccess(true)}>
							Save
						</Button>

						<CustomModal
							open={openSuccess}
							setOpen={setOpenSuccess}
							// showImage
							// imageUrl={store}
							message="Item added successfully"
							showAgain={dontShowAgain}
							setShowAgain={setDontShowAgain}
							onClose={() => {
								router.push("/inventory");
								// if (dontShowAgain) {
								// 	localStorage.setItem(
								// 		"hideSuccessModal",
								// 		"true"
								// 	);
								// }
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ItemForm;

const BasicDetailsComponent: FC<{
	itemType: ItemDataType;
	toggleItemType: (type: ItemDataType) => void;
}> = ({ itemType, toggleItemType }) => {
	const [addVendor, setAddVendor] = useState<boolean>(false);
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
	return (
		<div className="flex flex-col">
			{/* heading and switch option */}
			<div className="space-y-5 border-b">
				<h2 className="text-2xl text-[#474747] font-medium">
					You are adding a...
				</h2>
				<div className="flex w-full mb-4 gap-3 items-center">
					<Button
						onClick={() => toggleItemType("item")}
						variant={"outline"}
						size={"lg"}
						className={`flex-1 relative ${
							itemType === "item" ? "border-brand" : ""
						}`}
					>
						{itemType === "item" && (
							<div className="absolute top-1 right-2 rounded-full bg-brand p-0.5 text-white">
								<Check className="size-3" />
							</div>
						)}
						<Image alt="items" src={items} className="size-6" />{" "}
						Items
					</Button>
					<Button
						onClick={() => toggleItemType("service")}
						variant={"outline"}
						size={"lg"}
						className={`flex-1 relative ${
							itemType === "service" ? "border-brand" : ""
						}`}
					>
						{itemType === "service" && (
							<div className="absolute top-1 right-2 rounded-full bg-brand p-0.5 text-white">
								<Check className="size-3" />
							</div>
						)}
						<Image alt="service" src={service} className="size-6" />
						Service
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-y-5 mt-5 text-sm">
				{/* image uploads */}
				<div className="flex flex-col">
					<span className="font-medium mb-2">Party Logo :</span>
					{/* images */}
					<div className="gap-2 flex">
						{/* square image */}
						<div className="size-[240px] p-2 bg-white">
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
						<div className="flex flex-1 flex-col gap-2">
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
				</div>
				{/* item name */}
				<div className="flex flex-1">
					<span className="text-danger min-w-40 capitalize">
						* {itemType} Name
					</span>
					<Input
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							itemType === "item"
								? "Eg. Britannia Marie"
								: "Eg. computer Repair & Maintenance"
						}
					/>
				</div>
				{/* item description */}
				<div className="flex flex-1">
					<span className="min-w-40">Description</span>
					<Textarea
						className="min-h-24 bg-white placeholder:text-[#B3B3B3]"
						placeholder="Start writing a description"
					/>
				</div>
				{/* vendor */}
				{itemType === "item" && (
					<div className="flex flex-1">
						<span className="min-w-40">
							<span className="text-danger">*</span> Vendor
						</span>
						<div className="space-y-2 flex-1">
							<div className="flex-1 items-center flex gap-x-4">
								<Select>
									<SelectTrigger className="w-1/2 bg-white placeholder:text-[#B3B3B3]">
										<SelectValue placeholder="Select vendor" />
									</SelectTrigger>
									<SelectContent>
										{["ram", "shyam", "bhole", "chole"].map(
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
								<Button
									onClick={() => setAddVendor(true)}
									variant={"outline"}
									size={"icon"}
								>
									<Plus className="size-5 text-brand" />
								</Button>
							</div>
							<div className="flex items-center gap-x-2">
								<Checkbox className="size-4" />
								<span className="text-[#242424]">
									I don't remember the Vendor
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* unit */}
			<div className="flex flex-1 mt-10">
				<span className="min-w-40">
					<span className="text-danger">*</span> Unit
				</span>
				<div className="flex-1 items-center flex gap-x-4">
					{itemType === "item" && (
						<UnitSelect
							unitType={itemType}
							value={selectedUnit}
							onChange={(val) => setSelectedUnit(val)}
							initialUnits={ItemUnitsArray}
						/>
					)}
					{itemType === "service" && (
						<UnitSelect
							unitType={itemType}
							value={selectedUnit}
							onChange={(val) => setSelectedUnit(val)}
							initialUnits={ServiceUnitsArray}
						/>
					)}
				</div>
			</div>
			{/* hsn/sac code */}
			<div className="flex flex-1 mt-10 mb-5">
				<span className="min-w-40">
					<span className="text-danger"></span>{" "}
					{itemType === "item" ? "HSN" : "SAC"} Code
				</span>
				<div className="flex-1 items-center flex gap-x-4">
					<div className="w-1/2 relative">
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
			<AddCustomerDrawer
				title="New Vendor"
				open={addVendor}
				onOpenChange={setAddVendor}
			/>
		</div>
	);
};

const PricingComponent: FC<{
	itemType: ItemDataType;
}> = ({ itemType }) => {
	const mockData: InfoCardType[] = [
		{
			title: "Final Selling Price",
			titleColor: "#22b947",
			TitleIcon: CashIcon,
			value: "₹ 48000",
		},
		{
			title: "Final Cost Price",
			titleColor: "#faad14",
			TitleIcon: RiMoneyRupeeCircleLine,
			value: "₹ 20000",
		},
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

	const selectedLabel =
		selectedGST.heading && selectedGST.percentage
			? `${selectedGST.heading} - ${selectedGST.percentage}%`
			: "Select GST Slab";

	return (
		<div className="">
			<h2 className="text-2xl text-[#474747] font-medium">
				Enter the Pricing and Tax of Item
			</h2>
			<div className="my-8 flex flex-1 gap-x-5 items-center pr-20">
				{mockData.map((data, i) => (
					<div
						key={i}
						className="rounded-md flex-1 ring ring-[#E8E8E8]"
					>
						<InfoCard
							isRounded
							title={data.title}
							TitleIcon={data.TitleIcon}
							titleColor={data.titleColor}
							value={data.value}
						/>
					</div>
				))}
			</div>
			<div className="flex flex-col text-sm my-8 pr-20 gap-y-5">
				<div className="flex gap-y-6 flex-col">
					{/* purchase price */}
					<div className="flex flex-1">
						<span className="flex justify-between items-center min-w-40">
							<span className="flex text-danger gap-x-1">
								<span>*</span>
								<span className="max-w-[119px] font-semibold">
									{itemType === "item"
										? "Purchase/Cost Price"
										: "Cost of Service"}
								</span>
							</span>
							<span className="pr-6">:</span>
						</span>
						<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
							<Input
								placeholder={
									itemType === "item"
										? "₹ Enter Purchase/Cost Price"
										: "₹ Enter Expenses"
								}
								className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
							/>
							<Select defaultValue={"With Tax"}>
								<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{["With Tax", "Without Tax"].map(
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
					{/* raw material cost */}
					{itemType === "item" && (
						<div className="flex flex-1">
							<span className="flex justify-between items-center min-w-40">
								<span>Raw Material Cost</span>
								<span className="pr-6">:</span>
							</span>
							<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
								<Input
									placeholder="₹ Enter Raw Material Cost"
									className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
								/>
								<Select defaultValue={"part of Purchase Price"}>
									<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[
											"part of Purchase Price",
											"not part of Purchase Price",
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
					)}
					{/* gst slab */}
					<div className="flex flex-1">
						<span className="min-w-40">
							<span className="text-danger">*</span> GST Slab :
						</span>
						<div className="flex-1 items-center flex gap-x-4 max-w-[320px]">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className={`flex-1 relative justify-between shadow-none px-3 text-left hover:bg-white text-sm font-normal ${
											selectedLabel.startsWith("Select")
												? "text-[#B3B3B3] hover:text-[#B3B3B3]"
												: ""
										}`}
									>
										{selectedLabel}
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
													{option.heading} -{" "}
													{option.percentage}%
												</span>
												{option.description && (
													<span className="text-xs text-muted-foreground">
														{option.description}
													</span>
												)}
											</div>
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<hr className="w-1/3 mx-auto" />
					{/* selling price */}
					<div className="flex flex-1">
						<span className="flex justify-between items-center min-w-40 max-w-40">
							<span className="text-danger flex gap-x-1">
								<span>*</span>
								<span>Selling Price per Unit (MRP)</span>
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
									{["With Tax", "Without Tax"].map(
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
					{/* packaging cost */}
					{itemType === "item" && (
						<div className="flex flex-1">
							<span className="flex justify-between items-center min-w-40">
								<span>Packaging Cost</span>
								<span className="pr-6">:</span>
							</span>
							<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
								<Input
									placeholder="₹ Enter Packaging Cost"
									className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
								/>
								<Select
									defaultValue={"Included in Selling Price"}
								>
									<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[
											"Included in Selling Price",
											"Not included in Selling Price",
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
					)}
					{/* discount in each */}
					<div className="flex flex-1">
						<span className="min-w-40">
							Discount {itemType === "item" ? "in each" : ""}
						</span>
						<div className="flex-1 items-center flex gap-x-6">
							<RadioGroup
								value={currencyType}
								onValueChange={(value) =>
									setCurrencyType(
										value as "percentage" | "rupees"
									)
								}
								className="flex space-x-3 text-[#6B6B6B]"
							>
								{/* Percentage Option */}
								<Label className="flex items-center space-x-1">
									<span className="text-base">%</span>
									<RadioGroupItem value="percentage" />
								</Label>

								{/* Rupees Option */}
								<Label className="flex items-center space-x-1">
									<span className="text-base">₹</span>
									<RadioGroupItem value="rupees" />
								</Label>
							</RadioGroup>
							<Input className="bg-white rounded shadow-none border-[#D6D6D6]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



const StockComponent: FC = () => {
	const [asOfDate, setAsOfDate] = useState<Date>();
	const [warehouses, setWarehouses] = useState<Warehouse[]>([
		{
			id: 1,
			name: "Raigarh",
			address: "123 Havildar Street, opp Ordinance",
			isSelected: false,
			batchName: "",
			quantity: "",
			lowStockAlert: "",
		},
		{
			id: 2,
			name: "Pratapgarh",
			address: "42-7 Bleeker Street, Mahavir Singh Colony",
			isSelected: true,
			batchName: "BT-000001",
			quantity: "",
			lowStockAlert: "",
		},
		{
			id: 3,
			name: "Zamin Zilla",
			address: "42 Mall Road, opp Netaji bose lane",
			isSelected: false,
			batchName: "",
			quantity: "",
			lowStockAlert: "",
		},
	]);

	const toggleWarehouse = (id: number) => {
		setWarehouses((prev) =>
			prev.map((w) =>
				w.id === id ? { ...w, isSelected: !w.isSelected } : w
			)
		);
	};

	const updateWarehouse = (
		id: number,
		field: keyof Warehouse,
		value: string
	) => {
		setWarehouses((prev) =>
			prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
		);
	};

	return (
		<div className="space-y-6">
			<h2 className="text-2xl text-[#474747] font-medium">
				Enter Stock & Inventory details
			</h2>
			<div className="flex flex-col gap-y-5 pr-20">
				{/* opening stock */}
				<div className="flex flex-1">
					<span className="flex justify-between items-center min-w-40">
						<span className="text-danger">* Opening Stock</span>
						<span className="pr-6">:</span>
					</span>
					<Input
						placeholder="₹ Enter Cost Price"
						className="flex-1 bg-white shadow-none border border-[#D6D6D6] rounded placeholder:text-[#B3B3B3]"
					/>
				</div>
				{/* as of date */}
				<div className="flex flex-1">
					<span className="flex justify-between items-center min-w-40">
						<span>
							<span className="text-danger">*</span> as of
						</span>
						<span className="pr-6">:</span>
					</span>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[200px] justify-between text-left font-normal",
									!asOfDate
										? "text-[#B3B3B3]"
										: "text-[#242424]"
								)}
							>
								{asOfDate ? (
									format(asOfDate, "yyyy-MM-dd")
								) : (
									<span>Pick a date</span>
								)}
								<CalendarIcon className="text-[#00000040] size-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={asOfDate}
								onSelect={setAsOfDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<hr />
				{/* warehouses */}
				<div className="flex justify-between items-center flex-1">
					<div className="flex flex-col">
						<div className="flex gap-x-3 items-center">
							<div className="flex items-center gap-x-1 text-[#474747] text-lg">
								<PiWarehouse className="text-[#8F8F8F] size-5" />{" "}
								Warehouses
							</div>
							<span className="text-brand text-sm px-2.5 py-1 bg-brand/5 rounded-full">
								3
							</span>
						</div>
						<p className="text-[#6B6B6B]">
							Divide the items in Stock among warehouses
						</p>
					</div>
					{/* btn */}
					<Button
						variant={"ghost"}
						className="text-brand hover:text-brand"
					>
						<Plus className="size-3" /> New Warehouse
					</Button>
				</div>
				{/* warehouses list */}
				<div className="flex flex-col gap-y-5">
					{warehouses.map((warehouse) => (
						<div key={warehouse.id} className="space-y-2">
							<div className="flex gap-x-5 items-start">
								{/* checkbox */}
								<Checkbox
									className="size-5"
									onClick={() =>
										toggleWarehouse(warehouse.id)
									}
									checked={warehouse.isSelected}
								/>
								<div
									className={`flex flex-1 flex-col p-4 rounded-md ${
										warehouse.isSelected
											? "bg-white ring ring-gray-200"
											: "bg-transparent"
									}`}
								>
									{/* checkbox, name & address */}
									<div className="flex gap-x-3">
										{/* icon */}
										<div className="p-4 h-fit rounded-md bg-[#fafafa] text-[#8F8F8F] flex items-center justify-center">
											<PiWarehouse className="size-4 h-fit" />
										</div>
										{/* warehouse name and address */}
										<div className="flex flex-col flex-1">
											<div className="font-medium text-xl text-[#242424]">
												{warehouse.name}
											</div>
											<div className="text-[#6B6B6B] text-sm">
												{warehouse.address}
											</div>
											{/* form */}
											{warehouse.isSelected && (
												<div className="space-y-4 mt-3 flex gap-x-5">
													<div className="flex max-w-[40%] min-w-[40%] flex-col gap-y-4">
														{/* batch name */}
														<div className="flex-1">
															<Label className="text-sm mb-1">
																Batch Name :
															</Label>
															<div className="relative">
																<span className="absolute top-[0.5px] right-[1px]">
																	<BatchProcess />
																</span>
																<Input
																	className="placeholder:text-[#B3B3B3] pr-10"
																	placeholder="BT-00001"
																	value={
																		warehouse.batchName
																	}
																	onChange={(
																		e
																	) =>
																		updateWarehouse(
																			warehouse.id,
																			"batchName",
																			e
																				.target
																				.value
																		)
																	}
																/>
															</div>
														</div>
														{/* low stock alert */}
														<div className="flex-1 flex flex-col mb-1">
															<Label className="text-sm">
																<span className="text-danger">
																	*
																</span>{" "}
																Low Stock Alert
																:
															</Label>
															<Input
																className="placeholder:text-[#B3B3B3]"
																placeholder="Enter Number"
																type="number"
																value={
																	warehouse.lowStockAlert
																}
																onChange={(e) =>
																	updateWarehouse(
																		warehouse.id,
																		"lowStockAlert",
																		e.target
																			.value
																	)
																}
															/>
														</div>
													</div>
													{/* how many in warehouse */}
													<div className="flex-1">
														<Label className="text-sm mb-1">
															<span className="text-danger">
																*
															</span>{" "}
															How many in this
															warehouse :
														</Label>
														<Input
															className="placeholder:text-[#B3B3B3]"
															type="number"
															placeholder="Enter Number"
															value={
																warehouse.quantity
															}
															onChange={(e) =>
																updateWarehouse(
																	warehouse.id,
																	"quantity",
																	e.target
																		.value
																)
															}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const QualityComponent: FC<{
	itemType: ItemDataType;
}> = ({ itemType }) => {
	const [markedAsPerishable, setMarkedAsPerishable] =
		useState<boolean>(false);
	const [warranty, setwarranty] = useState<boolean>(false);

	const timeToExpire: string[] = ["7 Days", "14 Days", "21 Days", "30 Days"];
	return (
		<div className="">
			{/* heading and skip btn */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl text-[#474747] font-medium">
						Quality Assurance
					</h2>
					<p className="text-[#6B6B6B]">
						Help us assist you in ensuring quality maintenance by
						notifications
					</p>
				</div>
				<Button
					variant={"ghost"}
					className="text-brand hover:text-brand"
				>
					Skip for Now
				</Button>
			</div>
			<div className="flex flex-col text-sm my-8 pr-20 gap-y-5">
				{/* mark as perishable */}
				{itemType === "item" && (
					<div className="flex gap-x-2">
						<Checkbox
							className="size-4 mt-1"
							checked={markedAsPerishable}
							onClick={() => setMarkedAsPerishable((o) => !o)}
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
									<Select disabled={!markedAsPerishable}>
										<SelectTrigger className="flex-1 bg-white rounded shadow-none placeholder:text-[#B3B3B3] border-[#D6D6D6]">
											<SelectValue placeholder="Select time to expire" />
										</SelectTrigger>

										<SelectContent>
											{timeToExpire.map((option, i) => (
												<SelectItem
													key={i}
													value={option}
												>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>
				)}
				{/* set product warranty */}
				<div className="flex gap-x-2">
					<Checkbox
						className="size-4 mt-1"
						checked={warranty}
						onClick={() => setwarranty((o) => !o)}
					/>
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base">
							{itemType === "item"
								? "Set Product Warranty"
								: "Set Service Warranty/Maintenance"}
						</h3>
						<p className="text-[#6B6B6B] text-sm">
							Warranty will be set upon Sales date
						</p>

						<div className="flex flex-1 mt-5">
							<span className="min-w-40 text-sm font-medium">
								{itemType === "item" ? "Warranty" : "Select"}{" "}
								Period :
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
										{["Yrs", "Mon"].map((option, i) => (
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
					</div>
				</div>
				{/* mark as top selling */}
				<div className="flex gap-x-2">
					<Checkbox className="size-4 mt-1" />
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base flex gap-x-2">
							Mark {itemType} as{" "}
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
							You will be promptly notified about any updates from
							a “Top Selling”{" "}
							{itemType === "item" ? "Product" : "Service"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const ServiceAvailabilityComponent: FC = () => {
	const [inStoreService, setInStoreService] = useState<boolean>(false);
	const [onLocationService, setOnLocationService] = useState<boolean>(false);

	const distanceArray: string[] = ["5", "10", "15", "20", "25", "30"];
	return (
		<div className="">
			{/* heading and skip btn */}
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl text-[#474747] font-medium">
						Service availability
					</h2>
					<p className="text-[#6B6B6B]">
						Set the reach of the service
					</p>
				</div>
				<Button
					variant={"ghost"}
					className="text-brand hover:text-brand"
				>
					Skip for Now
				</Button>
			</div>
			<div className="flex flex-col text-sm my-8 pr-20 gap-y-8">
				{/* Service available in-store */}
				<div className="flex gap-x-2">
					<span
						onClick={() => setInStoreService((prev) => !prev)}
						className={`size-4 mt-1 border-brand border rounded-xs ${
							inStoreService ? "bg-brand" : "bg-white"
						}`}
					>
						<Check className="size-4 text-white pr-[2px]" />
					</span>
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base">
							Service available in-store
						</h3>
						<p className="text-[#6B6B6B] text-sm">
							The service will only be available in your store or
							warehouse
						</p>
					</div>
				</div>
				{/* Service available In-Location */}
				<div className="flex gap-x-2">
					<span
						onClick={() => setOnLocationService((prev) => !prev)}
						className={`size-4 mt-1 border-brand border rounded-xs ${
							onLocationService ? "bg-brand" : "bg-white"
						}`}
					>
						<Check className="size-4 text-white pr-[2px]" />
					</span>
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base">
							Service available In-Location
						</h3>
						<p className="text-[#6B6B6B] text-sm">
							The service can be provided in Customer's location
						</p>

						<div className="flex flex-1 mt-5">
							<span className="min-w-40 text-sm font-medium">
								Range of service (km)
							</span>

							<Select disabled={!onLocationService}>
								<SelectTrigger className="border rounded flex-1 bg-white border-[#D6D6D6] text-sm text-[#6B6B6B]">
									<SelectValue placeholder="Select distance" />
								</SelectTrigger>
								<SelectContent>
									{distanceArray.map((option, i) => (
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
				</div>
			</div>
		</div>
	);
};
