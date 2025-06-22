"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import { GridFilterModel, GridValidRowModel } from "@mui/x-data-grid";
import { Share2 } from "lucide-react";
import { IoMdShare } from "react-icons/io";
import { PiDownload } from "react-icons/pi";
import { TbDownload } from "react-icons/tb";
import { GenericDataGrid } from "../GenericDataGrid";
import { AppColumn } from '@/types/inventory-types';
import { CrownIcon } from "@/assets/svgIcons/CustomIcons";
import { BsPrinter } from "react-icons/bs";
import Image from "next/image";
import EmptyFallback from "./EmptyFallback";

type ViewType = "party" | "stock" | "barcode";

const options: { title: string; value: ViewType }[] = [
	{ title: "Party Wise Report", value: "party" },
	{ title: "Stock Details", value: "stock" },
	{ title: "BAR Codes", value: "barcode" },
];

type PartyTableType = {
	id: string;
	partyName: string;
	topParty?: boolean;
	units: string;
	transactionType: string;
	docNumber: string;
	value: string;
};

type StockTableType = {
	id: string;
	date: string;
	transactionType: string;
	units: string;
	topParty?: boolean;
	docNumber?: string;
	closingStock: string;
};

interface ViewSummarySwitchProps {}
const ViewSummarySwitch: FC<ViewSummarySwitchProps> = ({}) => {
	const [selectedView, setSelectedView] = useState<ViewType>("party");

	return (
		<div className="space-y-4">
			{/* options */}
			<div
				style={{
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
				}}
				className="flex px-6"
			>
				{options.map((option, i) => (
					<Button
						key={i}
						className={cn(
							"h-[44px] text-base shadow-none border-0 border-b-2 rounded-none px-5 py-4 font-normal",
							option.value === selectedView
								? "border-b-brand text-brand hover:text-brand"
								: "border-transparent text-[#474747] hover:text-[#474747]"
						)}
						variant={"ghost"}
						onClick={() => setSelectedView(option.value)}
					>
						{option.title}
					</Button>
				))}
			</div>

			{/* Rendering */}
			<div className="px-6">
				{selectedView === "party" && <PartyWise />}
				{selectedView === "stock" && <StockWise />}
				{selectedView === "barcode" && <BarCode />}
			</div>
		</div>
	);
};

export default ViewSummarySwitch;

function PartyWise() {
	const [search, setSearch] = useState<string>("");
	const [tableRows, setTableRows] = useState<PartyTableType[]>([
		{
			docNumber: "DOC-001",
			id: "1",
			partyName: "Shyam Lal",
			transactionType: "something",
			units: "-56",
			value: "45000",
			topParty: true,
		},
		{
			docNumber: "DOC-002",
			id: "2",
			partyName: "Ram Lal",
			transactionType: "something",
			units: "+56",
			value: "450",
		},
		{
			docNumber: "DOC-003",
			id: "3",
			partyName: "Lakhan Singh",
			transactionType: "something",
			units: "-6",
			value: "4150",
			topParty: true,
		},
		{
			docNumber: "DOC-003",
			id: "3a",
			partyName: "Lakhan Singh",
			transactionType: "something",
			units: "-6",
			value: "4150",
		},
		{
			docNumber: "DOC-003",
			id: "3aa",
			partyName: "Lakhan Singh",
			transactionType: "something",
			units: "-6",
			value: "4150",
		},
		{
			docNumber: "DOC-003",
			id: "312",
			partyName: "Lakhan Singh",
			transactionType: "something",
			units: "-6",
			value: "4150",
		},
	]);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [],
	});
	const columns: AppColumn<PartyTableType>[] = [
		{
			field: "partyName",
			headerName: "Party Name",
			hideSortIcons: true,
			minWidth: 240,
			flex: 1.5,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center">
							<span className="size-8 text-xs rounded-full pt-1 bg-danger text-white flex justify-center items-center">
								{row.partyName
									.split(" ")
									.at(0)
									?.at(0)
									?.toUpperCase()}
								{row.partyName
									.split(" ")
									.at(1)
									?.at(0)
									?.toUpperCase()}
							</span>
							<span className="text-sm text-brand">
								{row.partyName}
							</span>
							{row.topParty && (
								<CrownIcon className="bg-warning size-5 p-0.5 rounded-full" />
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "units",
			headerName: "Unit(s)",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "transactionType",
			headerName: "Transaction Type",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "docNumber",
			headerName: "Doc Number",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-brand text-sm",
		},
        {
			field: "value",
			headerName: "Value (₹)",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
	];
	return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
				{/* search input */}
				<div className="flex items-center rounded-full ring-1 ring-gray-300 w-[40%] px-3 py-2 h-12">
					<FiSearch className="size-4 text-[#B3B3B3]" />
					<Input
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							setSearch(value);
							setFilterModel({
								items: value
									? [
											{
												field: "partyName",
												operator: "contains",
												value,
											},
									  ]
									: [],
							});
						}}
						placeholder="Search by Party name..."
						className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg"
					/>
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				<GenericDataGrid<PartyTableType>
					columns={columns}
					getRowId={(row) => row.id}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
					page={1}
						pageSize={10}
						rowCount={10}
						onPageChange={(page) => console.log(page)}
						onPageSizeChange={(pageSize) => console.log(pageSize)}
				/>
			</div>
		</div>
	);
}
function StockWise() {
	const [search, setSearch] = useState<string>("");
	const [tableRows, setTableRows] = useState<StockTableType[]>([
		{
			docNumber: "DOC-001",
			id: "1",
			transactionType: "something",
			units: "-56",
			topParty: true,
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
		{
			docNumber: "DOC-002",
			id: "2",
			transactionType: "something",
			units: "+56",
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
		{
			id: "3",
			transactionType: "something",
			units: "-6",
			topParty: true,
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
		{
			docNumber: "DOC-005",
			id: "3a",
			transactionType: "something",
			units: "-6",
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
		{
			docNumber: "DOC-006",
			id: "3aa",
			transactionType: "something",
			units: "-6",
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
		{
			docNumber: "DOC-007",
			id: "312",
			transactionType: "something",
			units: "-6",
			closingStock: "45 PCKS",
			date: "12-02-2025",
		},
	]);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [],
	});
	const columns: AppColumn<StockTableType>[] = [
		{
			field: "date",
			headerName: "Date",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "transactionType",
			headerName: "Transaction Type",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "units",
			headerName: "Unit(s)",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "docNumber",
			headerName: "Doc Number",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-brand text-sm",
		},
		{
			field: "closingStock",
			headerName: "Closing Stock",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
	];
	return (
		<div className="flex flex-col gap-y-6">
			<div className="flex justify-between items-center">
				{/* search input */}
				<div className="flex items-center rounded-full ring-1 ring-gray-300 w-[40%] px-3 py-2 h-12">
					<FiSearch className="size-4 text-[#B3B3B3]" />
					<Input
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							setSearch(value);
							setFilterModel({
								items: value
									? [
											{
												field: "docNumber",
												operator: "contains",
												value,
											},
									  ]
									: [],
							});
						}}
						placeholder="Search by Document no..."
						className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg"
					/>
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3">
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<IoMdShare />
						Share
					</Button>
					<Button
						variant={"outline"}
						className="text-[#474747] text-base"
					>
						<TbDownload />
						Download Report
					</Button>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				<GenericDataGrid<StockTableType>
					columns={columns}
					getRowId={(row) => row.id}
					rows={tableRows}
					customRowCount={6}
					filterModel={filterModel}
					onFilterModelChange={setFilterModel}
					page={1}
						pageSize={10}
						rowCount={10}
						onPageChange={(page) => console.log(page)}
						onPageSizeChange={(pageSize) => console.log(pageSize)}
				/>
			</div>
		</div>
	);
}
function BarCode() {
	const [barcodes, setBarcodes] = useState<string[]>([
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
		"/barcode.png",
	]);
	return (
		<div className="flex flex-col gap-y-6 mb-5">
			{/* options */}
			<div className="flex justify-end gap-x-3 pt-1 items-center">
				<Button
					variant={"outline"}
					className="text-[#474747] text-base"
				>
					<IoMdShare />
					Share
				</Button>
				<Button
					variant={"outline"}
					className="text-[#474747] text-base"
				>
					<BsPrinter className="scale-x-[-1]" />
					Print
				</Button>
				<Button
					variant={"outline"}
					className="text-[#474747] text-base"
				>
					<TbDownload />
					Download
				</Button>
			</div>
			{/* barcodes */}
			{barcodes.length > 0 ? (
				<div className="mx-auto min-w-[595px] max-w-[595px] rounded-md bg-[#FDFFF2] p-5 ring ring-[#E8E8E8] shadow-md flex flex-col gap-y-7">
					<div className="items-center flex flex-col">
						<h3 className="text-black text-base font-medium">
							Batch : BT-0001
						</h3>
						<span className="text-xs">
							MFD : 24/04/2024 - EXP : 25/05/2025 - Vendor : Vijay
						</span>
					</div>
					<div className="grid grid-cols-3 gap-6 px-10">
						{barcodes.map((url, i) => (
							<Image
								key={i}
								alt={`barcode ${i}`}
								src={url}
								width={400}
								height={200}
								className="max-w-[156px] mx-auto h-[60px] rounded-md"
							/>
						))}
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center">
					<EmptyFallback
						text="No BAR Codes Generated"
						linkText="Generate BAR Code"
						url="/inventory"
					/>
				</div>
			)}
		</div>
	);
}
