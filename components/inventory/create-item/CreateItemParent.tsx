"use client";

import { Button } from "@/components/ui/button";
import { CreateItemFormType } from "@/types/inventory-types";
import { useFormik } from "formik";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FC, useState } from "react";
import * as Yup from "yup";
import { CustomModal } from "../SuccessPopUp";
import { useRouter } from "next/navigation";
import BasicDetailsComponent from "./BasicDetailsComponent";
import PricingComponent from "./PricingComponent";
import StockComponent from "./StockComponent";
import QualityComponent from "./QualityComponent";

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

	perishableItem: Yup.boolean().default(false),
	perishableExpiryDate: Yup.string().when(
		"perishableItem",
		(_perishableItem, schema) =>
			schema.concat(
				Yup.string().required("Perishable expiry date required")
			)
	),

	isProductWarranty: Yup.boolean().default(false),
	warrantyExpiryDate: Yup.string().when(
		"isProductWarranty",
		(_isProductWarranty, schema) =>
			schema.concat(
				Yup.string().required("Warranty expiry date required")
			)
	),

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
			isPartOfPrice: true,
		},
	},

	selling: {
		price: 0,
		finalPrice: 0,
		packaging: {
			price: 0,
			isIncludedInPrice: true,
		},
	},

	tax: "",
	vendorId: "",
	categoryId: "",
	unitId: "",
	stock: 0,
	hsn: "",
	discountType: "PERCENTAGE",
	discountValue: 0,

	openingStock: {
		date: new Date().toISOString(),
		stock: 0,
	},
	manufactureDate: "",

	perishableItem: false,
	perishableExpiryDate: "",

	isProductWarranty: false,
	warrantyExpiryDate: "",

	isTopSelling: false,

	warehouses: [],
};

const CreateItemParent: FC = () => {
	const router = useRouter();
	const [openSuccess, setOpenSuccess] = useState(false);
	const [dontShowAgain, setDontShowAgain] = useState(false);
	const [position, setPosition] = useState<number>(1);

	const formik = useFormik<CreateItemFormType>({
		initialValues,
		validationSchema: createItemSchema,
		onSubmit(values) {
			console.log(values);
			
		},
	});

	const isItem = formik.values.type === "PRODUCT";

	const maxItemPosition = 4;
	const maxServicePosition = 3;

	const moveForward = () => {
		const max = isItem ? maxItemPosition : maxServicePosition;

		if (position < max) {
			setPosition((prev) => prev + 1);
		}
	};

	const moveBackward = () => {
		if (position > 1) {
			setPosition((prev) => prev - 1);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				formik.handleSubmit(e);
				console.log(formik.values);
			}}
			className="flex relative flex-col h-full overflow-hidden w-full bg-brand/[2%]"
		>
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
							Add New {isItem ? "item" : "service"}
						</span>
						<span className="text-[#242424]">
							{position} /{" "}
							{isItem ? maxItemPosition : maxServicePosition}
						</span>
					</div>
					<div className="flex h-5 gap-x-5 flex-1 justify-between items-center">
						{Array.from(
							{
								length: isItem
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
						<BasicDetailsComponent formik={formik} />
					)}
					{position === 2 && <PricingComponent formik={formik} />}
					{position === 3 && (
						<>
							{isItem ? (
								<StockComponent formik={formik} />
							) : (
								<QualityComponent formik={formik} />
							)}
						</>
					)}
					{position === 4 && <QualityComponent formik={formik} />}
				</div>
			</div>
			{/* footer */}
			<div
				style={{
					boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)",
				}}
				className="flex px-10 py-4 border-t bg-white mt-auto border-[#E8E8E8] justify-between items-center"
			>
				{position === 1 ? (
					<Button
						type="button"
						variant={"outline"}
						onClick={() => router.push("/inventory")}
					>
						Cancel
					</Button>
				) : (
					<Button
						type="button"
						variant={"outline"}
						onClick={moveBackward}
					>
						<ChevronLeft /> Back
					</Button>
				)}
				{(isItem && position < maxItemPosition) ||
				(!isItem && position < maxServicePosition) ? (
					<Button type="button" onClick={moveForward}>
						Next <ChevronRight />
					</Button>
				) : (
					<div>
						<Button
							type="submit"
							onClick={() => {
								formik.submitForm();
								setOpenSuccess(true);
							}}
						>
							Save
						</Button>

						<CustomModal
							open={openSuccess}
							setOpen={setOpenSuccess}
							showImage
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
		</form>
	);
};

export default CreateItemParent;
