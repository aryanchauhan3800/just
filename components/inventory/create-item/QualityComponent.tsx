"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CreateItemFormType } from "@/types/inventory-types";
import { FormikProps } from "formik";
import Image from "next/image";
import { FC } from "react";
import medal from "@/assets/svgs/medal.svg";

interface QualityComponentProps {
	formik: FormikProps<CreateItemFormType>;
}

const QualityComponent: FC<QualityComponentProps> = ({ formik }) => {
	const isItem = formik.values.type === "PRODUCT";
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
				{isItem && (
					<div className="flex gap-x-2">
						<Input
							type="checkbox"
							checked={formik.values.perishableItem}
							onChange={formik.handleChange}
							id="perishableItem"
							className="size-4 mt-1"
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
										disabled={!formik.values.perishableItem}
										value={
											formik.values.perishableExpiryDate
										}
										onValueChange={(value) =>
											formik.setFieldValue(
												"perishableExpiryDate",
												value
											)
										}
									>
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
					<Input
						type="checkbox"
						checked={formik.values.isProductWarranty}
						onChange={formik.handleChange}
						id="isProductWarranty"
						className="size-4 mt-1"
					/>
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base">
							{isItem
								? "Set Product Warranty"
								: "Set Service Warranty/Maintenance"}
						</h3>
						<p className="text-[#6B6B6B] text-sm">
							Warranty will be set upon Sales date
						</p>

						<div className="flex flex-1 mt-5">
							<span className="min-w-40 text-sm font-medium">
								{isItem ? "Warranty" : "Select"} Period :
							</span>
							<div className="flex flex-1 items-center ring ring-[#D6D6D6] rounded">
								<Input
									name="warrantyExpiryDate"
									value={formik.values.warrantyExpiryDate}
									onChange={formik.handleChange}
									placeholder="Enter Warranty Period"
									disabled={!formik.values.isProductWarranty}
									className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
								/>
								<Select
									disabled={!formik.values.isProductWarranty}
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
					<Input
						type="checkbox"
						checked={formik.values.isTopSelling}
						onChange={formik.handleChange}
						name="isTopSelling"
						className="size-4 mt-1"
					/>
					<div className="flex flex-col flex-1">
						<h3 className="text-[#242424] font-semibold text-base flex gap-x-2">
							Mark {isItem ? "item" : "service"} as{" "}
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
							a “Top Selling” {isItem ? "Product" : "Service"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QualityComponent;
