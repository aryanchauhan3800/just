"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { GenericDataGrid } from "@/components/GenericDataGrid";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineCalendar } from "react-icons/ai";
import FilterSidebar from "@/components/inventory/FilterSidebar";
import { ChevronDown, ChevronRight } from "lucide-react";
import EmptyTableFallback from "@/components/inventory/EmptyFallback";
import {
	SortIcon,
	TrashIcon,
	UserFillIcon,
} from "@/assets/svgIcons/CustomIcons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { RupeeIcon } from "@/assets/svgIcons/CustomIcons";
import { Checkbox } from "../ui/checkbox";
import { AppColumn } from "@/types/inventory-types";
import Image from "next/image";
import income_in_bank from "@/assets/pngs/income-in-bank.png";
import income_in_cash from "@/assets/pngs/income-in-cash.png";
import income_in_upi from "@/assets/pngs/income-in-upi.png";
import income_in_cheque from "@/assets/pngs/income-in-cheque.png";
import PartyFilterModal from "./PartyFilterModal";

type PaymentMode = "cash" | "upi" | "cheque" | "bank transfer" | "split";

export type IncomeTableType = {
	id: string;
	invoiceNumber: string;
	partyName: string;
	bankAccount: string;
	incomeOn: string;
	incomeAmount: string;
	incomeMode: PaymentMode;
};

const MockTableData: IncomeTableType[] = [
	{
		incomeAmount: "40,000",
		incomeOn: "20-jan-2025",
		id: "1",
		incomeMode: "cash",
		bankAccount: "HDFC",
		invoiceNumber: "INV-1120",
		partyName: "Samay",
	},
	{
		incomeAmount: "20,000",
		bankAccount: "HDFC",
		invoiceNumber: "INV-11a0",
		partyName: "ramesh",
		incomeOn: "02-jan-2025",
		id: "2",
		incomeMode: "cheque",
	},
	{
		incomeAmount: "20,000",
		bankAccount: "HDFC",
		invoiceNumber: "INV-11a0",
		partyName: "ramesh",
		incomeOn: "02-jan-2025",
		id: "3",
		incomeMode: "cheque",
	},
	{
		incomeAmount: "20,000",
		bankAccount: "HDFC",
		invoiceNumber: "INV-11a0",
		partyName: "ramesh",
		incomeOn: "02-jan-2025",
		id: "4",
		incomeMode: "cheque",
	},
	{
		incomeAmount: "20,000",
		bankAccount: "HDFC",
		invoiceNumber: "INV-11a0",
		partyName: "ramesh",
		incomeOn: "02-jan-2025",
		id: "5",
		incomeMode: "cheque",
	},
];

const IncomeTable: FC = () => {
	const router = useRouter();
	const [search, setSearch] = useState<string>("");
	const [tableData, setTableData] =
		useState<IncomeTableType[]>(MockTableData);
	const [loading, setLoading] = useState<boolean>(false);
	const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
	const [sortItems, setSortItems] = useState<string[]>([]);
	const [filterItems, setFilterItems] = useState<string[]>([]);
	const [showFilterByParty, setShowFilterByParty] = useState<boolean>(false);

	const columns: AppColumn<IncomeTableType>[] = [
		{
			field: "invoiceNumber",
			headerName: "Invoice Number",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div className="flex-1 text-brand text-sm">
									{row.invoiceNumber}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="!w-[300px] ml-40">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() =>
										router.push(
											`/income/view-income/${row.id}`
										)
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View Income
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 flex-1">
										<TrashIcon className="size-6 text-danger" />
										Delete Income
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
		{
			field: "partyName",
			headerName: "Party Name",
			hideSortIcons: true,
			minWidth: 240,
			maxWidth: 240,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center text-sm">
							<span className="text-white bg-danger size-8 rounded-full center">
								{row.partyName.at(0)}
							</span>
							<span className="text-[#474747]">
								{row.partyName}
							</span>
						</div>
					</div>
				);
			},
		},
		{
			field: "bankAccount",
			headerName: "Crediting Bank Account",
			hideSortIcons: true,
			minWidth: 200,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] font-semibold text-sm",
		},
		{
			field: "incomeMode",
			headerName: "Mode",
			hideSortIcons: true,
			minWidth: 210,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "incomeOn",
			headerName: "Income on",
			hideSortIcons: true,
			minWidth: 140,
			maxWidth: 140,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm capitalize",
		},
		{
			field: "incomeAmount",
			headerName: "Income Amount",
			hideSortIcons: true,
			minWidth: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "id",
			headerName: "",
			minWidth: 60,
			width: 60,
			maxWidth: 60,
			hideSortIcons: true,
			headerClassName: "",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant={"outline"}
									className="rounded-full size-10 bg-transparent text-[#B3B3B3] hover:text-[#B3B3B3]"
								>
									<BsThreeDotsVertical className="size-6" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="!w-[300px] -ml-60">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() =>
										router.push(
											`/income/view-income/${row.id}`
										)
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View Income
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 flex-1">
										<TrashIcon className="size-6 text-danger" />
										Delete Income
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	const parties = [
		{ id: "1", name: "Ashok Srivastav" },
		{ id: "2", name: "Akansha Mishra" },
		{ id: "3", name: "Prabir Joshi" },
		{ id: "4", name: "Balwant Singh Joshi" },
		{ id: "5", name: "Tejas Singh" },
		{ id: "6", name: "Tapas Singh" },
	];

	const applyPartyFilter = () => { };

	return (
		<div className="flex-1 h-fit flex flex-col bg-white m-5 rounded p-5">
			{/* filter sidebars */}
			<FilterSidebar
				applyFilters={() => { }}
				isOpen={showFilterSidebar}
				onClose={() => setShowFilterSidebar(false)}
			>
				{/* by party */}
				<PartyFilterModal
					onSubmit={(parties) => console.log(parties)}
					parties={parties}
					trigger={
						<div
							onClick={() => setShowFilterByParty(true)}
							className="!h-14 w-full flex items-center select-none justify-between cursor-pointer bg-white mb-5 border-b px-5"
						>
							<div className="flex items-center gap-x-3 text-heading-light">
								<UserFillIcon className="size-6 text-light-100" />
								<span>Filter Party wise Income</span>
							</div>
							<ChevronRight className="size-5 text-light-100" />
						</div>
					}
				/>
				{/* Income Mode wise */}
				<div className="flex flex-col bg-white text-[#474747]">
					<span className="py-3 px-5 border-b">
						Filter Income Mode wise
					</span>
					{[
						{
							name: "Show Income in Cash",
							image: income_in_cash,
						},
						{
							name: "Show Income in Cheque",
							image: income_in_cheque,
						},
						{
							name: "Show Income in UPI",
							image: income_in_upi,
						},
						{
							name: "Show Income in Bank Transfer",
							image: income_in_bank,
						},
						{
							name: "Show Income in Split",
						},
					].map((filterItem, i) => (
						<div
							key={i}
							className="flex gap-x-2 text-sm py-3 px-5 items-center border-b"
						>
							<Checkbox />
							{filterItem.image && (
								<Image
									alt={filterItem.name}
									src={filterItem.image}
									className="!size-10 rounded-full"
								/>
							)}
							<span>{filterItem.name}</span>
						</div>
					))}
				</div>
				{/* Filter Income wise */}
				<details
					open
					className="w-full bg-white group my-5 text-[#474747]"
				>
					{/* Accordion Header */}
					<summary className="flex justify-between items-center px-5 h-[56px] cursor-pointer list-none">
						<span className="flex items-center gap-x-2">
							<RupeeIcon className="size-6 text-[#8F8F8F]" />{" "}
							Filter Income wise
						</span>
						<ChevronDown className="size-5 group-open:rotate-180 transition-transform duration-200" />
					</summary>

					{/* Radio Options */}
					<div className="border-b px-4">
						{[
							{ label: "Show all", value: "opt1" },
							{ label: "Value less than ₹ 4,999", value: "opt2" },
							{
								label: "Value from ₹ 5,000 - ₹ 14,999",
								value: "opt3",
							},
							{
								label: "Value more than ₹ 15,000",
								value: "opt4",
							},
						].map((opt) => (
							<label
								key={opt.value}
								className="flex h-[60px] px-3 items-center justify-between cursor-pointer"
							>
								{opt.label}
								<Input
									type="radio"
									name="dropdown-radio"
									className="size-4"
									value={opt.value}
								/>
							</label>
						))}
					</div>
				</details>
				{/* Show Income in */}
				<details
					open
					className="w-full bg-white group my-5 text-[#474747]"
				>
					{/* Accordion Header */}
					<summary className="flex justify-between items-center px-5 h-[56px] cursor-pointer list-none">
						<span>Show Income in</span>
						<ChevronDown className="size-5 group-open:rotate-180 transition-transform duration-200" />
					</summary>

					{/* Radio Options */}
					<div className="border-b px-4">
						{[
							{
								description: "16 Apr, 2025 - 22 Apr, 2025",
								label: "Within 7 days",
								value: "opt1",
							},
							{
								description: "01 Apr, 2025 - 30 Apr, 2025",
								label: "This month",
								value: "opt2",
							},
							{
								description: "01 Jan, 2025 - 30 Jun, 2025",
								label: "This Quarter (3 months)",
								value: "opt3",
							},
							{
								description: "01 Apr, 2025 - 31 Mar, 2026",
								label: "Current Fiscal Year",
								value: "opt4",
							},
						].map((opt) => (
							<label
								key={opt.value}
								className="flex h-[60px] items-center justify-between px-3 cursor-pointer"
							>
								<span className="flex flex-col">
									<span>{opt.label}</span>
									<span className="text-sm text-[#8F8F8F]">
										{opt.description}
									</span>
								</span>
								<Input
									type="radio"
									name="dropdown-radio"
									className="size-4"
									value={opt.value}
								/>
							</label>
						))}
						<div className="pl-3 pr-1.5 py-3 flex items-center justify-between">
							Set custom <ChevronRight className="text-brand" />
						</div>
					</div>
				</details>
			</FilterSidebar>
			{/* search bar with filter and sort */}
			<div className="flex justify-between w-full mb-5">
				{/* search input */}
				<div className="flex items-center rounded-full ring-1 bg-white hover:ring-2 ring-gray-300 min-w-[360px] max-w-[360px] px-3 py-2 h-12 max-h-12">
					<FiSearch className="size-4 text-[#B3B3B3]" />
					<Input
						disabled={tableData.length < 1}
						placeholder="Search by Party name..."
						className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg placeholder:italic"
					/>
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3">
					{/* filter toggle */}
					<Button
						variant={"outline"}
						size={"lg"}
						disabled={tableData.length < 1}
						className={`text-brand hover:text-brand ${filterItems.length > 0 ? "border-brand" : ""
							}`}
						onClick={() => setShowFilterSidebar(true)}
					>
						<LuFilter />
						Filter
					</Button>
					{/* sorting dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant={"outline"}
								size={"lg"}
								disabled={tableData.length < 1}
								className={`relative ${sortItems.length > 0
										? "text-brand hover:text-brand border-brand/50 drop-shadow-brand/30 drop-shadow-lg"
										: ""
									}`}
							>
								{sortItems.length > 0 && (
									<div className="size-4 bg-brand absolute -top-2 text-xs -left-2 text-white flex justify-center items-center rounded-full">
										{sortItems.length}
									</div>
								)}
								<SortIcon className="size-4" /> Sort
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[300px] -ml-52">
							<DropdownMenuLabel>
								Sort Inventory
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{/* recent to old */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0`}
									onClick={() => { }}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Income - Oldest to Recent
								</Button>
							</DropdownMenuItem>
							{/* old to recent */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0`}
									onClick={() => { }}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Income - Recent to Oldest
								</Button>
							</DropdownMenuItem>
							{/* high to low */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0`}
									onClick={() => { }}
								>
									<RupeeIcon className="size-4" /> Income
									Amount - High to low
								</Button>
							</DropdownMenuItem>
							{/* low to high */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0`}
									onClick={() => { }}
								>
									<RupeeIcon className="size-4" /> Income
									Amount - Low to High
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				{tableData.length > 0 ? (
					<GenericDataGrid<IncomeTableType>
						columns={columns}
						rows={tableData}
						getRowId={(row) => row.id}
						rowHeight={52}
						customRowCount={7}
						loading={loading}
						page={1}
						pageSize={10}
						rowCount={10}
						onPageChange={(page) => console.log(page)}
						onPageSizeChange={(pageSize) => console.log(pageSize)}
					/>
				) : (
					<EmptyTableFallback
						text="No Income Recorded yet"
						linkText="Record Income"
						url="/income"
					/>
				)}
			</div>
		</div>
	);
};

export default IncomeTable;
