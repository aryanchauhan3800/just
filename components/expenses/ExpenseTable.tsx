"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { GenericDataGrid } from "@/components/GenericDataGrid";
import { AppColumn } from '@/types/inventory-types';

import {
	GridFilterModel,
	GridFilterOperator,
	GridSortModel,
} from "@mui/x-data-grid";
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
import { ChevronDown } from "lucide-react";
import EmptyTableFallback from "@/components/inventory/EmptyFallback";
import { SortIcon, TrashIcon } from "@/assets/svgIcons/CustomIcons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { RupeeIcon } from "@/assets/svgIcons/CustomIcons";
import { Checkbox } from "../ui/checkbox";

type PaymentMode = "cash" | "upi" | "cheque" | "bank transfer";

export type ExpenseTableType = {
	id: string;
	expenseOn: string;
	expenseCategory: string[];
	party?: string;
	expenseAmount: string;
	mode: PaymentMode;
};

const parseCustomDate = (value: string): number => {
	const [day, monthStr, year] = value.split("-");
	const date = new Date(`${day} ${monthStr} ${year}`);
	return date.getTime();
};

const parseAmount = (value: string): number => {
	return parseFloat(value.replace(/,/g, "")); // "40,000" → 40000
};

const MockTableData: ExpenseTableType[] = [
	{
		expenseAmount: "40,000",
		expenseCategory: ["Personal Leisure", "Business Expense"],
		expenseOn: "20-jan-2025",
		id: "1",
		mode: "cash",
	},
	{
		expenseAmount: "20,000",
		expenseCategory: ["IT Expense"],
		expenseOn: "02-jan-2025",
		id: "2",
		mode: "cheque",
		party: "Karmi Rana",
	},
	{
		expenseAmount: "3,000",
		expenseCategory: ["Cafeteria Expense"],
		expenseOn: "01-jan-2025",
		id: "3",
		mode: "bank transfer",
	},
	{
		expenseAmount: "45,000",
		expenseCategory: ["Travelling Expense"],
		expenseOn: "20-Feb-2025",
		id: "12",
		mode: "bank transfer",
		party: "Riya (Sales Agent)",
	},
	{
		expenseAmount: "4,00,000",
		expenseCategory: ["Rent"],
		expenseOn: "20-Mar-2025",
		id: "15",
		mode: "bank transfer",
		party: "Himar Pvt. Ltd.",
	},
	{
		expenseAmount: "4,000",
		expenseCategory: ["Personal Leisure"],
		expenseOn: "25-jan-2025",
		id: "122",
		mode: "cash",
		party: "Ramesh Pehelwan",
	},
	{
		expenseAmount: "40,000",
		expenseCategory: ["Personal Leisure", "Business Expense"],
		expenseOn: "20-Jul-2025",
		id: "145",
		mode: "cash",
		party: "Suresh Pehelwan",
	},
];

const customAmountOperators: GridFilterOperator[] = [
	{
		label: "Greater than",
		value: "greaterThanAmount",
		getApplyFilterFn: (filterItem) => {
			if (!filterItem.value) return null;
			const target = parseFloat(filterItem.value);
			return (cellValue) => parseAmount(cellValue) > target;
		},
	},
	{
		label: "Less than",
		value: "lessThanAmount",
		getApplyFilterFn: (filterItem) => {
			if (!filterItem.value) return null;
			const target = parseFloat(filterItem.value);
			return (cellValue) => parseAmount(cellValue) < target;
		},
	},
	{
		label: "Between",
		value: "betweenAmount",
		getApplyFilterFn: (filterItem) => {
			if (
				!filterItem.value ||
				!Array.isArray(filterItem.value) ||
				filterItem.value.length !== 2
			)
				return null;

			const [min, max] = filterItem.value.map((v) => parseFloat(v));
			return (cellValue) => {
				const parsed = parseAmount(cellValue);
				return parsed >= min && parsed <= max;
			};
		},
		// InputComponent: CustomBetweenInputComponent, // optional custom input UI
	},
];

const ExpenseTable: FC = () => {
	const router = useRouter();
	const [search, setSearch] = useState<string>("");
	const [tableData, setTableData] =
		useState<ExpenseTableType[]>(MockTableData);
	const [loading, setLoading] = useState<boolean>(false);
	const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({
		items: [],
	});
	const [selectedFilters, setSelectedFilters] = useState<GridFilterModel>({
		items: [],
	});

	const handleFilter = (
		field: keyof ExpenseTableType,
		value: any,
		operator: string = "equals"
	) => {
		const isFieldApplied = selectedFilters.items.some(
			(item) => item.field === field
		);

		const isValueApplied = selectedFilters.items.some(
			(item) => item.field === field && item.value === value
		);

		if (!isFieldApplied) {
			setSelectedFilters((prev) => {
				return {
					items: [...prev.items, { field, value, operator }],
				};
			});
			return;
		}
		if (isFieldApplied && isValueApplied) {
			setSelectedFilters((prev) => {
				return {
					items: [
						...prev.items.filter((item) => item.field !== field),
					],
				};
			});
			return;
		}
		setSelectedFilters((prev) => {
			return {
				items: [
					...prev.items.filter((item) => item.field !== field),
					{ field, value, operator },
				],
			};
		});
	};

	const handleSorting = (field: string, sort: "asc" | "desc") => {
		setSortModel((prev) => {
			const isExisting =
				prev.filter(
					(item) => item.field === field && item.sort === sort
				).length > 0;

			if (isExisting) {
				return [];
			}

			return [{ field: field, sort: sort }];
		});
	};

	const columns: AppColumn<ExpenseTableType>[] = [
		{
			field: "expenseOn",
			headerName: "Expense on",
			hideSortIcons: true,
			minWidth: 140,
			width: 140,
			maxWidth: 140,
			cellClassName: "text-[#242424] text-sm",
			headerClassName: "text-[#6B6B6B] text-sm",
			sortComparator: (v1, v2) => {
				return parseCustomDate(v1) - parseCustomDate(v2);
			},
		},
		{
			field: "expenseCategory",
			headerName: "Expense Category",
			hideSortIcons: true,
			minWidth: 240,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center text-sm">
							<span className="text-[#242424]">
								{row.expenseCategory.at(0)}
							</span>
							{row.expenseCategory.length > 1 && (
								<div className="flex items-center gap-x-1 text-[#6B6B6B]">
									<span>-</span>
									<span className="size-6 text-xs rounded-full bg-brand/5 text-brand center">
										{row.expenseCategory.length - 1}
									</span>
									<span>more</span>
								</div>
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "party",
			headerName: "Party",
			hideSortIcons: true,
			minWidth: 240,
			width: 240,
			maxWidth: 240,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center">
							{row.party ? (
								<>
									<span className="size-8 text-base font-bold rounded-full bg-danger text-white flex justify-center items-center">
										{row.party.at(0)?.toUpperCase()}
									</span>
									<span className="text-[#242424] text-sm">
										{row.party}
									</span>
								</>
							) : (
								"- -"
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "expenseAmount",
			headerName: "Expense Amount",
			hideSortIcons: true,
			minWidth: 160,
			width: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
			sortComparator: (v1, v2) => {
				return parseAmount(v1) - parseAmount(v2);
			},
			filterOperators: customAmountOperators,
		},
		{
			field: "mode",
			headerName: "Mode",
			hideSortIcons: true,
			minWidth: 160,
			width: 160,
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
											`/expenses/view-expense/${row.id}`
										)
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View
										Expense
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 flex-1">
										<TrashIcon className="size-6 text-danger" />
										Delete Expense
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<div className="flex-1 h-fit flex flex-col bg-white m-5 rounded p-5">
			{/* filter sidebars */}
			<FilterSidebar
				applyFilters={() => {
					setFilterModel(selectedFilters);
				}}
				isOpen={showFilterSidebar}
				onClose={() => setShowFilterSidebar(false)}
			>
				{/* self / party filter */}
				<div className="flex flex-col bg-white text-[#474747]">
					<span className="py-3 px-5 border-b">
						Show Sales Returns delivery
					</span>
					{[
						{
							name: "Show Expenses related to Party(s)",
							value: "",
						},
						{
							name: "Show Expenses related to Self",
							value: undefined,
						},
					].map((filterItem, i) => (
						<div
							key={i}
							className="flex gap-x-2 text-sm py-3 px-5 items-center border-b"
						>
							<Checkbox
								className="rounded-none"
								checked={selectedFilters.items.some(
									(item) =>
										item.field === "party" &&
										item.value === filterItem.value
								)}
								onClick={() =>
									handleFilter(
										"party",
										filterItem.value,
										filterItem.value === undefined
											? "isEmpty"
											: "isNotEmpty"
									)
								}
							/>
							<span>{filterItem.name}</span>
						</div>
					))}
				</div>
				{/* Return Amount wise */}
				<details
					open
					className="w-full bg-white group my-5 text-[#474747]"
				>
					{/* Accordion Header */}
					<summary className="flex justify-between items-center px-5 h-[56px] cursor-pointer list-none">
						<span className="flex items-center gap-x-2">
							<RupeeIcon className="size-6 text-[#8F8F8F]" />{" "}
							Return Amount wise
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
				{/* show return made */}
				<details
					open
					className="w-full bg-white group my-5 text-[#474747]"
				>
					{/* Accordion Header */}
					<summary className="flex justify-between items-center px-5 h-[56px] cursor-pointer list-none">
						<span>Show Return made</span>
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
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							setSearch(value);
							setFilterModel({
								items: value
									? [
										{
											field: "expenseCategory",
											operator: "contains",
											value,
										},
									]
									: [],
							});
						}}
						placeholder="Search by expense category..."
						className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg placeholder:italic"
					/>
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3">
					{/* applied filters */}
					{/* {filterModel.items.map((item, i) => (
						<Button
							key={i}
							variant={"outline"}
							className="flex gap-x-1 p-2 hover:bg-white border-[#FAFAFA] rounded-lg items-center"
							onClick={() => {
								setFilterModel((prev) => {
									return {
										items: prev.items.filter(
											(filterItem) =>
												filterItem.value !== item.value
										),
									};
								});
								setSelectedFilters((prev) => {
									return {
										items: prev.items.filter(
											(filterItem) =>
												filterItem.value !== item.value
										),
									};
								});
							}}
						>
							<span className="text-sm text-[#8f8f8f]">
								Filters:{" "}
							</span>
							<span className="capitalize font-medium">
								{item.value}
							</span>
							<X className="size-3" />
						</Button>
					))} */}
					{/* filter toggle */}
					<Button
						variant={"outline"}
						size={"lg"}
						disabled={tableData.length < 1}
						className={`${filterModel.items.length > 0
								? "text-brand hover:text-brand border-brand"
								: ""
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
								className={`${sortModel.length > 0
										? "text-brand hover:text-brand border-brand/50 drop-shadow-brand/30 drop-shadow-lg"
										: ""
									} relative`}
							>
								{sortModel.length > 0 && (
									<div className="size-4 bg-brand absolute -top-2 text-xs -left-2 text-white flex justify-center items-center rounded-full">
										{sortModel.length}
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
									className={`w-full justify-start rounded-none hover:!ring-0 ${sortModel.at(0)?.field ===
											"expenseOn" &&
											sortModel.at(0)?.sort === "asc"
											? "!text-brand hover:!text-brand"
											: ""
										}`}
									onClick={() =>
										handleSorting("expenseOn", "asc")
									}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Expenses - Oldest to Recent
								</Button>
							</DropdownMenuItem>
							{/* old to recent */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0 ${sortModel.at(0)?.field ===
											"expenseOn" &&
											sortModel.at(0)?.sort === "desc"
											? "!text-brand hover:!text-brand"
											: ""
										}`}
									onClick={() =>
										handleSorting("expenseOn", "desc")
									}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Expenses - Recent to Oldest
								</Button>
							</DropdownMenuItem>
							{/* high to low */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0 ${sortModel.at(0)?.field ===
											"expenseAmount" &&
											sortModel.at(0)?.sort === "desc"
											? "!text-brand hover:!text-brand"
											: ""
										}`}
									onClick={() =>
										handleSorting("expenseAmount", "desc")
									}
								>
									<RupeeIcon className="size-4" /> Expense
									Amount - High to low
								</Button>
							</DropdownMenuItem>
							{/* low to high */}
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start rounded-none hover:!ring-0 ${sortModel.at(0)?.field ===
											"expenseAmount" &&
											sortModel.at(0)?.sort === "asc"
											? "!text-brand hover:!text-brand"
											: ""
										}`}
									onClick={() =>
										handleSorting("expenseAmount", "asc")
									}
								>
									<RupeeIcon className="size-4" /> Expense
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
					<GenericDataGrid<ExpenseTableType>
						columns={columns}
						rows={tableData}
						getRowId={(row) => row.id}
						rowHeight={52}
						customRowCount={7}
						loading={loading}
						filterModel={filterModel}
						onFilterModelChange={setFilterModel}
						sortModel={sortModel}
						page={1}
						pageSize={10}
						rowCount={10}
						onPageChange={(page) => console.log(page)}
						onPageSizeChange={(pageSize) => console.log(pageSize)}
						onSortModelChange={setSortModel}
					/>
				) : (
					<EmptyTableFallback
						text="No Expense Recorded yet"
						linkText="Record Expenses"
						url="/expenses"
					/>
				)}
			</div>
		</div>
	);
};

export default ExpenseTable;
