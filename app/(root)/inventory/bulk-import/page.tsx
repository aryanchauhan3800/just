"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import GenericHandson, {
	ErrorModal,
	handsonToJson,
} from "@/components/GenericHandson";
import Handsontable from "handsontable";
import { PackageIcon } from "@/assets/svgIcons/CustomIcons";
import { AiOutlineCheck } from "react-icons/ai";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import BulkImportImage from "@/components/BulkImportImage";
import AddCustomerDrawer from "@/components/invoice-components/AddCustomerDrawer";

const instructions = [
	"- Remove sample items (milk, wallpaper etc.) and directly start adding your item details",
	"- Do not edit or rename column names (Item name, description etc.)",
	"- Do not delete any columns",
];

const columnHeaders = [
	"Item Name *",
	"HSN / SAC *",
	"Type *",
	"Units *",
	"Selling Price *",
	"Cost / Purchase Price *",
	"GST % *",
	"Discount Type",
	"Discount Amount",
	"Stock QTY *",
	"Low Alert QTY",
	"Manufacturing Date *",
	"Expiry Date",
	"Expiry Period from Manufacture",
	"Warranty from Sale",
	"Description",
];

type InventoryItem = {
	"Item Name *": string;
	"HSN / SAC *": string;
	"Type *": "item" | "service";
	"Units *": string;
	"Selling Price *": number;
	"Cost / Purchase Price *": number;
	"GST % *": string;
	"Discount Type"?: "amount" | "percentage" | "none";
	"Discount Amount"?: string;
	"Stock QTY *": number;
	"Low Alert QTY"?: number;
	"Manufacturing Date *": string;
	"Expiry Date"?: string;
	"Expiry Period from Manufacture"?: string;
	"Warranty from Sale"?: string;
	warehouse?: string;
	vendor?: string;
	Description?: string;
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const router = useRouter();
	const [showAddVendor, setShowAddVendor] = useState<boolean>(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
	const [openAddItemModal, setOpenAddItemModal] = useState<boolean>(false);
	const [sheetData, setSheetData] = useState<Handsontable.CellValue[][]>(
		() => {
			return [
				...instructions.map((i) => [i]),
				columnHeaders,
				[
					"Cream Biscuits",
					"1234",
					"item",
					"PCS",
					45,
					25,
					5,
					null,
					null,
					5,
					null,
					"10-05-2024",
				],
				[
					"Cream Biscuits",
					"1234",
					"item",
					"PCS",
					45,
					25,
					5,
					null,
					null,
					5,
					null,
					"10-05-2024",
				],
				[
					"Cream Biscuits",
					"1234",
					"item",
					"PCS",
					45,
					25,
					5,
					null,
					null,
					5,
					null,
					"10-05-2024",
				],
			];
		}
	);
	const columns = columnHeaders.map((header) => {
		switch (header) {
			case "Type *":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["product", "service"],
					strict: true,
				};
			case "Units *":
				return {
					type: "dropdown",
					source: [
						"Piece",
						"Box",
						"Packet",
						"Kg",
						"Gram",
						"Quintal",
						"Tonne",
						"Litre",
						"Millilitre",
						"Dozen",
						"Meter",
						"Centimeter",
						"Inch",
						"Feet",
						"Yard",
						"Square Feet",
						"Square Meter",
						"Cubic Meter",
						"Hour",
						"Day",
						"Month",
						"Year",
						"Service",
						"Set",
						"Pair",
						"Bundle",
						"Roll",
						"Carton",
						"Bottle",
						"Can",
						"Tablet",
						"Strip",
						"Sachet",
						"Spoon",
						"Drop",
						"Packet",
						"Unit",
						"Kilowatt Hour",
						"Megawatt",
						"Person",
						"Team",
						"Load",
						"Job",
						"Project",
						"Application",
						"Trip",
						"Booking",
						"Subscription",
					],
				};
			case "GST % *":
				return {
					type: "dropdown",
					allowInvalid: false,
					strict: true,
					source: ["0%", "5%", "12%", "18%", "28%"],
				};
			case "Discount Type":
				return {
					type: "dropdown",
					allowInvalid: false,
					source: ["percentage", "fixed", "none"],
				};
			case "Selling Price *":
			case "Cost / Purchase Price *":
			case "Discount Value":
			case "Stock QTY *":
			case "Low Alert QTY":
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
		const data = handsonToJson(sheetData, instructions) as InventoryItem[];
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
				const value = row[field as keyof InventoryItem];
				return value === null || value === undefined || value === "";
			})
		);

		const missingFields = new Set<string>();
		requiredErrors.forEach((fields) => {
			fields.forEach((field) => {
				return missingFields.add(
					`${field.replace(" *", "")} is required`
				);
			});
		});

		const priceOverlapError = data.filter(
			(row) =>
				row["Selling Price *"] !== null &&
				row["Cost / Purchase Price *"] !== null &&
				row["Selling Price *"] < row["Cost / Purchase Price *"]
		);

		if (missingFields.size > 0) {
			setErrors((prev) => {
				return [...prev, ...missingFields];
			});
		}

		if (priceOverlapError.length > 0) {
			setErrors((prev) => {
				return [`Cost Price can't be more than Selling Price`, ...prev];
			});
		}

		if (missingFields.size < 1 && priceOverlapError.length < 1) {
			setErrors([]);
			setOpenAddItemModal(true);
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
						Bulk Import items
					</h2>
				</div>
				<Button onClick={handleNextStep}>
					Next <ChevronRight />
				</Button>
			</div>
			{/* body */}
			<div className="px-10 py-6 overflow-y-auto gap-y-6 flex-1 flex-col flex">
				<BulkImportImage description="Enter the Details of the items & import together" />
				<div className=" flex-1 -mr-4">
					<GenericHandson
						className="z-10"
						data={sheetData}
						colWidths={200}
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
				open={openErrorModal}
				onOpenChange={setOpenErrorModal}
			/>
			<AddItemModal
				openVendor={() => setShowAddVendor(true)}
				open={openAddItemModal}
				onOpenChange={setOpenAddItemModal}
				data={handsonToJson(sheetData, instructions) as InventoryItem[]}
			/>
			<AddCustomerDrawer
				title="New Vendor"
				open={showAddVendor}
				onOpenChange={setShowAddVendor}
			/>
		</div>
	);
};

export default page;

const AddItemModal: FC<{
	data: InventoryItem[];
	open: boolean;
	onOpenChange: (val: boolean) => void;
	openVendor: () => void;
}> = ({ open, onOpenChange, data, openVendor }) => {
	const [tableData, setTableData] = useState<InventoryItem[]>(
		data.map((row) => {
			return { ...row, checked: false };
		})
	);
	const modalRef = useRef<HTMLDivElement>(null);

	const close = () => onOpenChange(false);

	const selectWarehouse = (warehouse: string, row: InventoryItem) => {
		setTableData((prev) =>
			prev.map((rowItem) =>
				row === rowItem ? { ...rowItem, warehouse } : rowItem
			)
		);
	};
	const selectVendor = (vendor: string, row: InventoryItem) => {
		setTableData((prev) =>
			prev.map((rowItem) =>
				row === rowItem ? { ...rowItem, vendor } : rowItem
			)
		);
	};

	const isAllSelected =
		tableData.filter((row) => !row.warehouse || !row.vendor).length < 1;

	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
			<div
				ref={modalRef}
				className="bg-white rounded-md shadow-sm flex flex-col justify-between"
				style={{ height: "95vh", width: "1000px" }}
			>
				{/* header */}
				<div className="border-b !h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
					<span className="flex items-center gap-x-3">
						<PackageIcon className="text-[#8f8f8f] size-6" /> Adding
						Items in Bulk
					</span>
					<Button
						variant={"outline"}
						size={"icon"}
						className="rounded-full"
						onClick={close}
					>
						<X />
					</Button>
				</div>
				{/* description */}
				<div className="px-6 py-4 flex flex-col text-base text-[#6B6B6B]">
					<span className="font-semibold text-[#474747] text-lg">
						Creating {data.length} batches
					</span>
					<span>Assign Vendors and Warehouses to items</span>
				</div>
				{/* body */}
				<div className="flex flex-1 flex-col gap-y-4 mx-6 overflow-y-auto">
					<Table className="border">
						<TableHeader>
							<TableRow className="h-[50px] bg-white hover:bg-white border-b text-[#6B6B6B] font-normal text-sm">
								<TableHead className="!max-w-[40px] flex-1 text-[#6B6B6B] font-normal text-sm">
									<Checkbox
										checked={isAllSelected}
										onCheckedChange={() => {}}
									/>
								</TableHead>
								<TableHead className="flex-1 border-r !w-[240px] text-[#6B6B6B] font-normal text-sm">
									Item
								</TableHead>
								<TableHead className="!w-[100px] text-[#6B6B6B] font-normal text-sm">
									HSN code
								</TableHead>
								<TableHead className="!min-w-[60px] !max-w-[100px] text-[#6B6B6B] font-normal text-sm">
									Stock
								</TableHead>
								<TableHead className="text-[#6B6B6B] !w-[247px] font-normal text-sm">
									Storage Warehouse
								</TableHead>
								<TableHead className="text-[#6B6B6B] !w-[247px] font-normal text-sm">
									Vendor
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{tableData.map((row, i) => {
								return (
									<TableRow
										key={i}
										className={cn(
											!!row.warehouse && !!row.vendor
												? "bg-brand/5 hover:bg-brand/5"
												: "bg-white hover:bg-white"
										)}
									>
										{/* checkbox */}
										<TableCell className="">
											<Checkbox
												checked={
													!!row.warehouse &&
													!!row.vendor
												}
												onCheckedChange={() => {}}
											/>
										</TableCell>
										{/* item col */}
										<TableCell className="flex gap-x-2 items-center h-[56px] px-4 py-2">
											<span className="min-h-9 min-w-9 bg-success text-white rounded-[8px] center">
												{(row["Item Name *"] as string)
													.trim()
													.at(0)}
											</span>
											<div className="flex flex-col justify-center">
												<span className="!text-base text-[#474747] font-semibold">
													{row["Item Name *"]}
												</span>
												<div className="flex items-center !text-sm -mt-1 text-[#6B6B6B]">
													₹{" "}
													<span className="text-[#242424]">
														{row["Selling Price *"]}
													</span>{" "}
													/ {row["Units *"]}
												</div>
											</div>
										</TableCell>
										{/* hsn */}
										<TableCell>
											{row["HSN / SAC *"]}
										</TableCell>
										{/* stock */}
										<TableCell>
											{row["Stock QTY *"]}
										</TableCell>
										{/* warehouse */}
										<TableCell>
											<Select
												value={row.warehouse}
												onValueChange={(
													value: string
												) =>
													selectWarehouse(value, row)
												}
											>
												<SelectTrigger className="placeholder:text-[#B3B3B3] w-full">
													<SelectValue placeholder="Select warehouse" />
												</SelectTrigger>
												<SelectContent>
													{[
														"Ramgarh",
														"Pune",
														"Delhi",
														"Gujrat",
													].map((option, i) => (
														<SelectItem
															key={i}
															value={option}
														>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</TableCell>
										{/* vendor */}
										<TableCell className="flex items-center justify-between gap-x-2">
											<Select
												value={row.vendor}
												onValueChange={(
													value: string
												) => selectVendor(value, row)}
											>
												<SelectTrigger className="placeholder:text-[#B3B3B3] flex-1">
													<SelectValue placeholder="Select vendor" />
												</SelectTrigger>
												<SelectContent>
													{[
														"Ram Pal",
														"Shyam Singh",
														"Rajse Rao",
														"Gujrati Babu",
													].map((option, i) => (
														<SelectItem
															key={i}
															value={option}
														>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<Button
												onClick={openVendor}
												variant={"outline"}
												size={"icon"}
												className="text-brand bg-transparent hover:text-brand"
											>
												<Plus />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
				{/* footer */}
				<div className="px-6 flex items-center border-t !h-[72px]">
					<Button variant="ghost" onClick={close}>
						Close
					</Button>
					<Button className="ml-auto">
						<AiOutlineCheck strokeWidth={50} className="-mr-1" />
						Add Items to Inventory
					</Button>
				</div>
			</div>
		</div>
	);
};
