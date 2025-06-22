"use client";

import { CreateItemFormType, InfoCardType } from "@/types/inventory-types";
import { FormikProps } from "formik";
import { FC, useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import { CashIcon } from "@/assets/svgIcons/CustomIcons";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PricingComponentProps {
	formik: FormikProps<CreateItemFormType>;
}

const PricingComponent: FC<PricingComponentProps> = ({ formik }) => {
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

	const cardData: InfoCardType[] = [
		{
			title: "Final Selling Price",
			titleColor: "#22b947",
			TitleIcon: CashIcon,
			value: `₹ ${formik.values.selling.finalPrice}`,
		},
		{
			title: "Final Cost Price",
			titleColor: "#faad14",
			TitleIcon: RiMoneyRupeeCircleLine,
			value: `₹ ${formik.values.purchase.finalPrice}`,
		},
	];

	const isItem = formik.values.type === "PRODUCT";

	// compute final purchase price
	useEffect(() => {
		const { price, raw } = formik.values.purchase;
		const shouldAddRaw = raw?.isPartOfPrice === false;
		const newFinalPrice = price + (shouldAddRaw ? raw?.price : 0);

		formik.setFieldValue("purchase.finalPrice", newFinalPrice);
	}, [
		formik.values.purchase.price,
		formik.values.purchase.raw.price,
		formik.values.purchase.raw.isPartOfPrice,
	]);

	// compute final selling price
	useEffect(() => {
		const { price, packaging } = formik.values.selling;
		const shouldAddRaw = packaging?.isIncludedInPrice === false;
		const newFinalPrice = price + (shouldAddRaw ? packaging.price : 0);

		formik.setFieldValue("purchase.finalPrice", newFinalPrice);
	}, [
		formik.values.selling.price,
		formik.values.selling.packaging.price,
		formik.values.selling.packaging.isIncludedInPrice,
	]);

	return (
		<div className="">
			<h2 className="text-2xl text-[#474747] font-medium">
				Enter the Pricing and Tax of Item
			</h2>
			<div className="my-8 flex flex-1 gap-x-5 items-center pr-20">
				{cardData.map((data, i) => (
					<div
						key={i}
						className="rounded-md max-w-[48%] flex-1 ring ring-[#E8E8E8]"
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
									{isItem
										? "Purchase/Cost Price"
										: "Cost of Service"}
								</span>
							</span>
							<span className="pr-6">:</span>
						</span>
						<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
							<Input
								// {...formik.getFieldProps("purchase.price")}
								value={formik.values.purchase.price}
								type="number"
								onChange={(e) => {
									const value = e.target.value;
									formik.setFieldValue(
										"purchase.price",
										value
									);
								}}
								placeholder={
									isItem
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
					{isItem && (
						<div className="flex flex-1">
							<span className="flex justify-between items-center min-w-40">
								<span>Raw Material Cost</span>
								<span className="pr-6">:</span>
							</span>
							<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
								<Input
									value={formik.values.purchase.raw.price}
									type="number"
									onChange={(e) => {
										const value = e.target.value;
										formik.setFieldValue(
											"purchase.raw.price",
											value
										);
									}}
									placeholder="₹ Enter Raw Material Cost"
									className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
								/>
								<Select
									onValueChange={(val) => {
										if (
											val === "not part of Purchase Price"
										) {
											formik.setFieldValue(
												"purchase.raw.isPartOfPrice",
												false
											);
										} else {
											formik.setFieldValue(
												"purchase.raw.isPartOfPrice",
												true
											);
										}
									}}
									defaultValue={"part of Purchase Price"}
								>
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
					{isItem && (
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
							Discount {isItem ? "in each" : ""}
						</span>
						<div className="flex-1 items-center flex gap-x-6">
							<RadioGroup
								value={formik.values.discountType}
								onValueChange={formik.handleChange}
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
							<Input
								name="discountValue"
								type="number"
								value={formik.values.discountValue}
								onChange={formik.handleChange}
								className="bg-white rounded shadow-none border-[#D6D6D6]"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricingComponent;
