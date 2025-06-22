"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import GenericHandson, {
	ErrorModal,
	handsonToJson,
} from "@/components/GenericHandson";
import Handsontable from "handsontable";
import BulkImportImage from "@/components/BulkImportImage";
import { toast } from "sonner";

const instructions = [
	"- Do not edit or rename column names (Invoice Number, Customer Name, etc.)",
	"- Do not delete any columns",
];

const columnHeaders = [
	"Invoice Number*",
	"Customer Name*",
	"Customer Contact*",
	"Date created*",
	"Due Date*",
	"Invoice Amount*",
	"Amount Received*",
	"Payment Mode*",
	"Item types",
	"Items Sold",
];

type InvoiceItem = {
	"Invoice Number*": string;
	"Customer Name*": string;
	"Customer Contact*": string;
	"Date created*": string;
	"Due Date*": string;
	"Invoice Amount*": number;
	"Amount Received*": number;
	"Payment Mode*": string;
	"Item types": string;
	"Items Sold": string;
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const router = useRouter();
	const [errors, setErrors] = useState<string[]>([]);
	const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
	const [sheetData, setSheetData] = useState<Handsontable.CellValue[][]>(
		() => {
			return [...instructions.map((i) => [i]), columnHeaders];
		}
	);
	const columns = columnHeaders.map((header) => {
		switch (header) {
			case "Payment Mode*":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["cash", "bank", "upi"],
					strict: true,
				};

			case "Invoice Amount*":
			case "Amount Received*":
			case "Item types":
			case "Items Sold":
				return {
					editor: "numeric",
					validator: Handsontable.validators.NumericValidator,
					allowInvalid: false,
				};
			default:
				return {}; // plain text input
		}
	});

	const handleDataChange = (newData: typeof sheetData) => {
		setSheetData(newData);
		// console.log("📦 Data Changed:", newData);
	};

	const handleNextStep = () => {
		const data = handsonToJson(sheetData, instructions) as InvoiceItem[];
		if (data.length < 1) {
			setErrors(["No fields to upload"]);
			setOpenErrorModal(true);
			return;
		}

		const requiredFields = columnHeaders.filter((header) =>
			header.endsWith("*")
		);

		const requiredErrors = data.map((row) =>
			requiredFields.filter((field) => {
				const value = row[field as keyof InvoiceItem];
				return value === null || value === undefined || value === "";
			})
		);

		const missingFields = new Set<string>();
		requiredErrors.forEach((fields) => {
			fields.forEach((field) => {
				return missingFields.add(
					`${field.replace("*", "")} is required`
				);
			});
		});

		if (missingFields.size > 0) {
			setErrors((prev) => {
				return [...prev, ...missingFields];
			});
		}

		if (missingFields.size < 1) {
			// make API request here (better to create a request fx and call here and conditionally trigger toast)
			setErrors([]); // clearing existing errors just in case
			toast.success("all valid data");
		} else {
			setOpenErrorModal(true);
		}
	};

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
						Bulk Upload Invoice
					</h2>
				</div>
				<Button onClick={handleNextStep}>Save</Button>
			</div>
			{/* body */}
			<div className="px-10 py-6 overflow-y-auto gap-y-6 flex-1 flex-col flex">
				<BulkImportImage description="Enter the Details of invoices & upload together" />
				<div className=" flex-1 -mr-4">
					<GenericHandson
						className="z-10"
						data={sheetData}
						colWidths={160}
						instructions={instructions}
						onDataChange={handleDataChange}
						columns={columns}
					/>
				</div>
			</div>

			{/* modals */}
			<ErrorModal
				errors={errors}
				setErrors={setErrors}
				onOpenChange={setOpenErrorModal}
				open={openErrorModal}
			/>
		</div>
	);
};

export default page;
