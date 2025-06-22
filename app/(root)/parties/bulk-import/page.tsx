"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
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
	"Customer Name*",
	"Party Type*",
	"Business Type*",
	"Customer Contact*",
	"Email",
	"GSTIN*",
	"PAN*",
	"Address Line*",
	"City*",
	"State*",
	"Country*",
	"PIN*",
	"Balance*",
	"Balance Type*",
];

type PartyItem = {
	"Customer Name*": string;
	"Party Type*": string;
	"Business Type*": string;
	"Customer Contact*": string;
	Email: string;
	"GSTIN*": string;
	"PAN*": string;
	"Address Line*": string;
	"City*": string;
	"State*": string;
	"Country*": string;
	"PIN*": number;
	"Balance*": number;
	"Balance Type*": string;
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const router = useRouter();
	const [errors, setErrors] = useState<string[]>([]);
	const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
	const [sheetData, setSheetData] = useState<Handsontable.CellValue[][]>(
		() => {
			return [
				...instructions.map((i) => [i]),
				columnHeaders,
				[
					"Shiro",
					"Vendor",
					"Wholesale",
					"+45 678 900",
					"abc@dfg.jkl",
					"ABC348484TYU",
					"Pan number",
					"address here",
					"Mehrauli",
					"Delhi",
					"India",
					123456,
					45000,
					"I Pay",
				],
			];
		}
	);
	const columns = columnHeaders.map((header) => {
		switch (header) {
			case "Party Type*":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["Customer", "Vendor", "Both"],
					strict: true,
				};

			case "Balance Type*":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["I Pay", "I Receive", "Both"],
					strict: true,
				};
			case "Country*":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["India", "USA", "France"],
					strict: true,
				};
			case "State*":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["Delhi", "Punjab", "Detroit"],
					strict: true,
				};

			case "PIN*":
			case "Balance*":
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
		const data = handsonToJson(sheetData, instructions) as PartyItem[];
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
				const value = row[field as keyof PartyItem];
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
						Bulk Addition of Parties
					</h2>
				</div>
				<Button onClick={handleNextStep}>Save</Button>
			</div>
			{/* body */}
			<div className="px-10 py-6 overflow-y-auto gap-y-6 flex-1 flex-col flex">
				<BulkImportImage description="Enter the details of Parties in bulk" />
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
