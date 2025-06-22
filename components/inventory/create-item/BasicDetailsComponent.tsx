"use client";

import AddCustomerDrawer from "@/components/invoice-components/AddCustomerDrawer";
import { Button } from "@/components/ui/button";
import { CreateItemFormType, InventoryUnit } from "@/types/inventory-types";
import { FC, useState } from "react";
import { FormikProps } from "formik";
import { Check, Plus, Search } from "lucide-react";
import Image from "next/image";
import items from "@/assets/svgs/inventory-items.svg";
import service from "@/assets/svgs/inventory-service.svg";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import UnitSelect from "../UnitSelect";
import { Label } from "@/components/ui/label";

interface BasicDetailsComponentProps {
	formik: FormikProps<CreateItemFormType>;
}

const BasicDetailsComponent: FC<BasicDetailsComponentProps> = ({ formik }) => {
	const [addVendor, setAddVendor] = useState<boolean>(false);
	const ItemUnitsArray: InventoryUnit[] = [
		{ id: "12345679", name: "Kilograms", unit: "KG", initial: true },
		{ id: "12345789", name: "Jar", unit: "JAR", initial: true },
		{ id: "12356789", name: "Packets", unit: "PCKTS", initial: true },
		{ id: "13456789", name: "Boxes", unit: "BOX", initial: true },
		{ id: "16789", name: "Grams", unit: "GMS", initial: true },
		{ id: "12345789", name: "Litres", unit: "LTR", initial: true },
		{ id: "56789", name: "Metre", unit: "MTR", initial: true },
		{ id: "1256789", name: "Tin", unit: "TIN", initial: true },
		{ id: "12349", name: "Bag", unit: "BAG", initial: true },
		{ id: "123", name: "Cans", unit: "CAN", initial: true },
		{ id: "123789", name: "Pairs", unit: "PAIR", initial: true },
		{ id: "123789", name: "Strips", unit: "STRIP", initial: true },
		{ id: "3456", name: "Numbers", unit: "NOS", initial: true },
	];
	const ServiceUnitsArray: InventoryUnit[] = [
		{ id: "7861230", name: "Hours", unit: "HRS", initial: true },
		{ id: "7894230", name: "Days", unit: "DAY", initial: true },
		{ id: "78961230", name: "Call", unit: "CALL", initial: true },
		{ id: "7894561230", name: "Task", unit: "TASK", initial: true },
		{ id: "781230", name: "Kilometer", unit: "KM", initial: true },
		{ id: "1230", name: "Square Foot", unit: "SFT", initial: true },
		{ id: "781230", name: "Shift", unit: "SHIFT", initial: true },
		{ id: "61230", name: "Installation", unit: "INSTALL", initial: true },
	];

	const [selectedUnit, setSelectedUnit] = useState<string>("");

	const isItem = formik.values.type === "PRODUCT";

	const changeItemType = (value: typeof formik.values.type) => {
		formik.setFieldValue("type", value);
	};
	return (
		<div className="flex flex-col">
			{/* heading and switch option */}
			<div className="space-y-5 border-b">
				<h2 className="text-2xl text-[#474747] font-medium">
					You are adding a...
				</h2>
				<div className="flex w-full mb-4 gap-3 items-center">
					<Button
						onClick={() => changeItemType("PRODUCT")}
						variant={"outline"}
						size={"lg"}
						type="button"
						className={`flex-1 relative ${
							isItem ? "border-brand" : ""
						}`}
					>
						{isItem && (
							<div className="absolute top-1 right-2 rounded-full bg-brand p-0.5 text-white">
								<Check className="size-3" />
							</div>
						)}
						<Image alt="items" src={items} className="size-6" />{" "}
						Items
					</Button>
					<Button
						onClick={() => changeItemType("SERVICE")}
						variant={"outline"}
						size={"lg"}
						type="button"
						className={`flex-1 relative ${
							!isItem ? "border-brand" : ""
						}`}
					>
						{!isItem && (
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
						<div className="flex-1 h-[240px] p-2 bg-white">
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
					<div className="min-w-40 flex items-center gap-x-1 text-danger">
						<span>*</span>
						<Label className="text-heading-dark">
							{isItem ? "item" : "service"} name
						</Label>
					</div>
					<Input
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="bg-white placeholder:text-[#B3B3B3]"
						placeholder={
							isItem
								? "Eg. Britannia Marie"
								: "Eg. computer Repair & Maintenance"
						}
					/>
				</div>
				{/* item description */}
				<div className="flex flex-1">
					<div className="min-w-40">
						<Label className="text-heading-dark">Description</Label>
					</div>
					<Textarea
						value={formik.values.description}
						onChange={formik.handleChange}
						name="description"
						className="min-h-24 bg-white placeholder:text-[#B3B3B3] resize-none focus-visible:ring-0"
						placeholder="Start writing a description"
					/>
				</div>
				{/* vendor */}
				{isItem && (
					<div className="flex flex-1">
						<div className="min-w-40 h-fit flex items-center gap-x-1">
							<span className="text-danger">*</span>
							<Label className="text-heading-dark">Vendor</Label>
						</div>
						<div className="space-y-2 flex-1">
							<div className="flex-1 items-center flex gap-x-4">
								<Select
									value={formik.values.vendorId}
									onValueChange={(value) =>
										formik.setFieldValue("vendorId", value)
									}
								>
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
									type="button"
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
				<div className="min-w-40 flex items-center gap-x-1">
					<span className="text-danger">*</span> <Label className="text-heading-dark">Unit</Label>
				</div>
				<div className="flex-1 items-center flex gap-x-4">
					{isItem && (
						<UnitSelect
							unitType={"item"}
							value={selectedUnit}
							onChange={(val) => setSelectedUnit(val)}
							initialUnits={ItemUnitsArray}
							formik={formik}
						/>
					)}
					{!isItem && (
						<UnitSelect
							unitType={"service"}
							value={selectedUnit}
							onChange={(val) => setSelectedUnit(val)}
							initialUnits={ServiceUnitsArray}
							formik={formik}
						/>
					)}
				</div>
			</div>
			{/* hsn/sac code */}
			<div className="flex flex-1 mt-10 mb-5">
				<span className="min-w-40">
					<Label className="text-heading-dark">
						{isItem ? "HSN" : "SAC"} Code
					</Label>
				</span>
				<div className="flex-1 items-center flex gap-x-4">
					<div className="w-1/2 h-11 relative">
						<Input
							value={formik.values.hsn}
							name="hsn"
							onChange={formik.handleChange}
							className="pr-10 bg-white placeholder:text-[#B3B3B3]"
							placeholder="Enter HSN Code"
						/>
						<Button
							variant={"ghost"}
							size={"icon"}
							className="absolute size-9 bg-[#fafafa] top-0 hover:text-brand right-0"
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

export default BasicDetailsComponent;
