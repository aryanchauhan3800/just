"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { GenericDataGrid } from "@/components/GenericDataGrid";
import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
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
import { Check, Plus, X } from "lucide-react";
import EmptyInventoryFallback from "@/components/inventory/EmptyFallback";
import { CrownIcon, SortIcon } from "@/assets/svgIcons/CustomIcons";
import { cn } from "@/lib/utils";
import { CiCircleInfo } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import ViewItemSidebar from "@/components/inventory/ViewItemSidebar";
import { useRouter } from "next/navigation";
import {
	AppColumn,
	InventoryBatchTableType,
	InventoryItemTableType,
} from "@/types/inventory-types";
import { Checkbox } from "../ui/checkbox";
import {
	useAllInventoryBatch,
	useAllInventoryItems,
} from "@/hooks/useInventory";
import { objectToQueryParams } from "@/helpers/queryParams.helper";

const InventoryTable = () => {
	// display Items and Batch tab
	const [dataType, setDataType] = useState<"item" | "batch">("item");

	const [search, setSearch] = useState<string>("");

	const router = useRouter();

	// pagination Related states
	const [page, setPage] = useState(0); // MUI = 0-indexed
	const [pageSize, setPageSize] = useState(10);

	// Sidebar OPEN / CLOSE
	const [viewItem, setViewItem] = useState<boolean>(false);

	const closeViewSidebar = () => setViewItem(false);
	const openViewSidebar = () => setViewItem(true);

	const [currentSelectedItemId, setCurrentSelectedItemId] =
		useState<string>();
	const [currentSelectedType, setCurrentSelectedType] = useState<
		"item" | "batch"
	>("item");

	// Store current item's ID and Type in States to pass to sidebar component
	const handleSideBarOpen = (currentRow) => {
		openViewSidebar();

		setCurrentSelectedItemId(currentRow.id);
		setCurrentSelectedType(currentRow.addedOn ? "batch" : "item");
	};

	// Item Table Data
	const {
		mutate: itemMutate,
		data: itemData,
		isPending: itemPending,
	} = useAllInventoryItems();

	// Batch Table Data
	const {
		mutate: batchMutate,
		data: batchData,
		isPending: batchPending,
	} = useAllInventoryBatch();

	// function to generate API payload of filter
	const buildFilterPayload = (filters: GridFilterModel) => {
		const body: Record<string, any> = {};

		filters.items.forEach(({ field, value }) => {
			if (typeof value === "boolean") {
				body[field] = value;
			} else {
				if (!body[field]) body[field] = [];
				body[field].push(value);
			}
		});

		return body;
	};

	const [showItemFilterSidebar, setShowItemFilterSidebar] =
		useState<boolean>(false);
	const [sortItemModel, setSortItemModel] = useState<GridSortModel>([]);
	const [filterItemModel, setFilterItemModel] = useState<GridFilterModel>({
		items: [],
	});
	const [selectedItemFilters, setSelectedItemFilters] =
		useState<GridFilterModel>({
			items: [],
		});

	const [showBatchFilterSidebar, setShowBatchFilterSidebar] =
		useState<boolean>(false);
	const [sortBatchModel, setSortBatchModel] = useState<GridSortModel>([]);
	const [filterBatchModel, setFilterBatchModel] = useState<GridFilterModel>({
		items: [],
	});
	const [selectedBatchFilters, setSelectedBatchFilters] =
		useState<GridFilterModel>({ items: [] });

	const setFilter = (field: string, value: string | boolean) => {
		const isFieldApplied = selectedItemFilters.items.some(
			(item) => item.field === field
		);

		const isValueApplied = selectedItemFilters.items.some(
			(item) => item.field === field && item.value === value
		);

		if (!isFieldApplied) {
			setSelectedItemFilters((prev) => {
				return {
					items: [
						...prev.items,
						{ field, value, operator: "equals" },
					],
				};
			});
			return;
		}
		if (isFieldApplied && isValueApplied) {
			setSelectedItemFilters((prev) => {
				return {
					items: [
						...prev.items.filter((item) => item.field !== field),
					],
				};
			});
			return;
		}
		setSelectedItemFilters((prev) => {
			return {
				items: [
					...prev.items.filter((item) => item.field !== field),
					{ field, value, operator: "equals" },
				],
			};
		});

		// setSelectedFilters()
	};

	// RUN MUTATE FUNCTIONS BASED ON CURRENT SELECTED STATE
	useEffect(() => {
		const filters =
			dataType === "item" ? filterItemModel : filterBatchModel;
		const sort = dataType === "item" ? sortItemModel : sortBatchModel;

		const queryObj = {
			pageNumber: page + 1,
			pageSize,
			...(sort[0]?.field && sort[0]?.sort && { sort: sort[0].field }), // optional
		};

		const queryParams = objectToQueryParams(queryObj);

		const body = {
			...buildFilterPayload(filters),
			search: search || undefined,
		};

		if (dataType === "item") {
			itemMutate({ params: queryParams, filter: body });
		} else {
			batchMutate({ params: queryParams, filter: body });
		}
	}, [
		dataType,
		page,
		pageSize,
		search,
		filterItemModel,
		filterBatchModel,
		sortItemModel,
		sortBatchModel,
		batchMutate,
		itemMutate,
	]);

	// item wise
	const itemColumns: AppColumn<InventoryItemTableType>[] = [
		{
			field: "id",
			headerName: "# ID",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			cellClassName: "text-brand text-sm",
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="flex-1 bg-transparent hover:bg-transparent shadow-none text-inherit justify-start">
									{row.id}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[300px] ml-20">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
										<Plus className="size-6" /> Add new
										batch to Inventory
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleSideBarOpen(row)}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View All
										Details
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										router.push("/inventory/edit-item/id")
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<TbEdit className="size-6" />
										Edit Item
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
		{
			field: "itemOrService",
			headerName: "Item / Service",
			hideSortIcons: true,
			minWidth: 240,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center">
							<span className="size-8 text-xs rounded-md bg-danger text-white flex justify-center items-center">
								{row.itemOrService.at(0)?.toUpperCase()}
							</span>
							<span className="text-sm text-brand">
								{row.itemOrService}
							</span>
							{row.topSeller && (
								<CrownIcon className="bg-warning size-5 p-0.5 rounded-full" />
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "hsnOrSac",
			headerName: "HSN / SAC",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "totalStock",
			headerName: "Total Stock",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "unit",
			headerName: "Unit",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm uppercase",
		},
		{
			field: "type",
			headerName: "Type",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "status",
			headerName: "Status",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div
							className={cn(
								"flex h-[22px] gap-x-2 items-center px-2 py-1 capitalize rounded",
								row.status.includes("in stock")
									? "text-success bg-success/10"
									: "",
								row.status === "low stock"
									? "text-warning bg-warning/10"
									: "",
								row.status === "out of stock"
									? "text-danger bg-danger/10"
									: ""
							)}
						>
							{row.status.includes("in stock") && (
								<span className="bg-success rounded-full -mr-1 size-[6px]" />
							)}
							{row.status === "low stock" && (
								<CiCircleInfo className="size-[9px]" />
							)}
							<span className="text-xs">{row.status}</span>
						</div>
					</div>
				);
			},
		},
		{
			field: "costPrice",
			headerName: "Cost Price (₹)",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "sellingPrice",
			headerName: "Selling Price (₹)",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "gstSlab",
			headerName: "GST Slab (%)",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "action",
			headerName: "",
			minWidth: 60,
			width: 60,
			maxWidth: 60,
			hideSortIcons: true,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell() {
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
							<DropdownMenuContent className="w-[300px] -ml-60">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
										<Plus className="size-6" /> Add new
										batch to Inventory
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={openViewSidebar}>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View All
										Details
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										router.push("/inventory/edit-item/id")
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<TbEdit className="size-6" />
										Edit Item
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	// batch wise
	const batchColumns: AppColumn<InventoryBatchTableType>[] = [
		{
			field: "batchId",
			headerName: "Batch ID",
			hideSortIcons: true,
			minWidth: 160,
			width: 160,
			maxWidth: 160,
			cellClassName: "text-brand text-sm",
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="flex-1 bg-transparent hover:bg-transparent shadow-none text-inherit justify-start">
									{row.batchId}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[300px] ml-20">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
										<Plus className="size-6" /> Add new
										batch to Inventory
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleSideBarOpen(row)}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View All
										Details
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										router.push(
											"/inventory/edit-item/" + row.id
										)
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<TbEdit className="size-6" />
										Edit Item
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
		{
			field: "itemOrService",
			headerName: "Item / Service",
			hideSortIcons: true,
			minWidth: 240,
			width: 240,
			maxWidth: 240,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center">
							<span className="size-8 text-xs rounded-md bg-danger text-white flex justify-center items-center">
								{row.itemOrService.at(0)?.toUpperCase()}
							</span>
							<span className="text-sm text-brand">
								{row.itemOrService}
							</span>
							{row.topSeller && (
								<CrownIcon className="bg-warning size-5 p-0.5 rounded-full" />
							)}
						</div>
					</div>
				);
			},
		},
		{
			field: "hsnOrSac",
			headerName: "HSN / SAC",
			hideSortIcons: true,
			minWidth: 100,
			width: 100,
			maxWidth: 100,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "stock",
			headerName: "Stock",
			hideSortIcons: true,
			minWidth: 60,
			width: 60,
			maxWidth: 60,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "status",
			headerName: "Status",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div
							className={cn(
								"flex h-[22px] gap-x-2 items-center px-2 py-1 capitalize rounded",
								row.status.includes("in stock")
									? "text-success bg-success/10"
									: "",
								row.status === "low stock"
									? "text-warning bg-warning/10"
									: "",
								row.status === "out of stock"
									? "text-danger bg-danger/10"
									: ""
							)}
						>
							{row.status.includes("in stock") && (
								<span className="bg-success rounded-full -mr-1 size-[6px]" />
							)}
							{row.status === "low stock" && (
								<CiCircleInfo className="size-[9px]" />
							)}
							<span className="text-xs">{row.status}</span>
						</div>
					</div>
				);
			},
		},
		{
			field: "expiryDate",
			headerName: "Expiry Date",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "expiryStatus",
			headerName: "Expiry Status",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div
							className={cn(
								"flex items-center capitalize",
								row.expiryStatus === "fresh"
									? "text-success"
									: "",
								row.expiryStatus === "soon to expire"
									? "text-warning"
									: "",
								row.expiryStatus === "expired"
									? "text-danger"
									: ""
							)}
						>
							<span className="text-sm">{row.expiryStatus}</span>
						</div>
					</div>
				);
			},
		},
		{
			field: "storageWarehouse",
			headerName: "Storage WareHouse",
			hideSortIcons: true,
			minWidth: 160,
			width: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm capitalize",
		},
		{
			field: "manufacturingDate",
			headerName: "Manufacturing Date",
			hideSortIcons: true,
			minWidth: 160,
			width: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "addedOn",
			headerName: "Added On",
			hideSortIcons: true,
			minWidth: 120,
			width: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "vendor",
			headerName: "Vendor",
			hideSortIcons: true,
			minWidth: 200,
			width: 200,
			maxWidth: 200,
			cellClassName: "text-[#474747] text-sm",
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						{row.vendor ? (
							<div
								className={
									"flex gap-x-2 items-center capitalize"
								}
							>
								<span
									className={
										"rounded-full flex justify-center items-center size-8 text-xs uppercase bg-danger text-white"
									}
								>
									{`${row.vendor
										.split(" ")
										.at(0)
										?.at(0)}${row.vendor
										.split(" ")
										.at(1)
										?.at(0)}`}
								</span>
								<span className="text-sm capitalize">
									{row.vendor}
								</span>
							</div>
						) : (
							"- -"
						)}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "",
			minWidth: 60,
			width: 60,
			maxWidth: 60,
			hideSortIcons: true,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({}) {
				// add "row" in rendercell
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
							<DropdownMenuContent className="w-[300px] -ml-60">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<div className="flex items-center gap-x-2 border-b pb-2 flex-1 text-brand">
										<Plus className="size-6" /> Add new
										batch to Inventory
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={openViewSidebar}>
									<div className="flex items-center gap-x-2 flex-1">
										<IoEye className="size-6" /> View All
										Details
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										router.push("/inventory/edit-item/id")
									}
								>
									<div className="flex items-center gap-x-2 flex-1">
										<TbEdit className="size-6" />
										Edit Item
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	const clearCustomizations = () => {
		setFilterBatchModel({ items: [] });
		setFilterItemModel({ items: [] });
		setSelectedBatchFilters({ items: [] });
		setSelectedItemFilters({ items: [] });
		setSortBatchModel([]);
		setSortItemModel([]);
		setSearch("");
	};

	const handleSorting = (field: string, sort: "asc" | "desc") => {
		setSortBatchModel((prev) => {
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

	// clear all filters and sorting on changing table type
	useEffect(() => {
		clearCustomizations();
	}, [dataType]);

	return (
		<div className="flex-1 h-fit flex flex-col bg-white m-5 rounded p-5">
			{/* filter sidebars */}
			{dataType === "item" ? (
				<FilterSidebar
					applyFilters={() => {
						setFilterItemModel(selectedItemFilters);
					}}
					isOpen={showItemFilterSidebar}
					onClose={() => setShowItemFilterSidebar(false)}
				>
					{/* item / service filter */}
					<div className="flex flex-col bg-white">
						<span className="py-3 px-5 border-b">Show</span>
						{[
							{ name: "Items", value: "item" },
							{ name: "Services", value: "service" },
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex gap-x-2 text-sm py-3 px-5 items-center border-b"
							>
								<Checkbox
									className="size-4"
									checked={selectedItemFilters.items.some(
										(item) =>
											item.field === "type" &&
											item.value === filterItem.value
									)}
									onClick={() =>
										setFilter("type", filterItem.value)
									}
								/>
								<span>{filterItem.name}</span>
							</div>
						))}
					</div>
					{/* status filter */}
					<div className="flex flex-col bg-white mt-5">
						<span className="py-3 px-5">Show Items</span>
						{[
							{
								name: "In Stock",
								color: "text-success bg-success/10",
								value: "in stock",
							},
							{
								name: "Low Stock",
								color: "text-warning bg-warning/10",
								value: "low stock",
							},
							{
								name: "Out of Stock",
								color: "text-danger bg-danger/10",
								value: "out of stock",
							},
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex text-xs gap-x-2 py-3 px-5 items-center"
							>
								<Checkbox
									className="size-4"
									checked={selectedItemFilters.items.some(
										(item) =>
											item.field === "status" &&
											item.value === filterItem.value
									)}
									onClick={() =>
										setFilter("status", filterItem.value)
									}
								/>
								<span
									className={`px-2 py-0.5 rounded ${filterItem.color}`}
								>
									{filterItem.name}
								</span>
							</div>
						))}
					</div>
					{/* top selling item / Service filter */}
					<div className="flex text-sm bg-white gap-x-2 py-3 px-5 items-center border-y">
						<Checkbox
							className="size-4"
							checked={selectedItemFilters.items.some(
								(item) =>
									item.field === "topSeller" &&
									item.value === true
							)}
							onClick={() => setFilter("topSeller", true)}
						/>
						<span>Show Top Selling Items / Services</span>
					</div>
					{/* perishable item filter */}
					<div className="flex text-sm bg-white gap-x-2 py-3 px-5 items-center border-b">
						<Checkbox
							className="size-4"
							checked={selectedItemFilters.items.some(
								(item) =>
									item.field === "expiryStatus" &&
									item.value === "expired"
							)}
							onClick={() => setFilter("expiryStatus", "expired")}
						/>
						<span>Show Perishable Items only</span>
					</div>
					{/* filter with expiry status */}
					<div className="flex flex-col bg-white mt-5 mb-10 pb-5 border-b">
						<span className="py-3 px-5">
							Filter with Expiry Status
						</span>
						{[
							{ name: "fresh", color: "text-success" },
							{ name: "expired", color: "text-danger" },
							{ name: "soon to expire", color: "text-warning" },
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex gap-x-2 text-xs py-2 px-5 items-center"
							>
								<Checkbox
									className="size-4"
									checked={selectedItemFilters.items.some(
										(item) =>
											item.field === "expiryStatus" &&
											item.value === filterItem.name
									)}
									onClick={() =>
										setFilter(
											"expiryStatus",
											filterItem.name
										)
									}
								/>
								<span
									className={`capitalize ${filterItem.color}`}
								>
									{filterItem.name}
								</span>
							</div>
						))}
					</div>
				</FilterSidebar>
			) : (
				<FilterSidebar
					applyFilters={() => {
						setFilterBatchModel(selectedBatchFilters);
					}}
					isOpen={showBatchFilterSidebar}
					onClose={() => setShowBatchFilterSidebar(false)}
				>
					{/* item / service filter */}
					<div className="flex flex-col bg-white">
						<span className="py-3 px-5 border-b">Show</span>
						{[
							{ name: "Items", value: "item" },
							{ name: "Services", value: "service" },
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex gap-x-2 text-sm py-3 px-5 items-center border-b"
							>
								<span
									onClick={() =>
										setFilter("type", filterItem.value)
									}
									className={`size-4 border-brand border rounded-xs ${
										selectedBatchFilters.items.some(
											(item) =>
												item.field === "type" &&
												item.value === filterItem.value
										)
											? "bg-brand"
											: "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span>{filterItem.name}</span>
							</div>
						))}
					</div>
					{/* status filter */}
					<div className="flex flex-col bg-white mt-5">
						<span className="py-3 px-5">Show Items</span>
						{[
							{
								name: "In Stock",
								color: "text-success bg-success/10",
								value: "in stock",
							},
							{
								name: "Low Stock",
								color: "text-warning bg-warning/10",
								value: "low stock",
							},
							{
								name: "Out of Stock",
								color: "text-danger bg-danger/10",
								value: "out of stock",
							},
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex text-xs gap-x-2 py-3 px-5 items-center"
							>
								<span
									onClick={() =>
										setFilter("status", filterItem.value)
									}
									className={`size-4 border-brand border rounded-xs ${
										selectedBatchFilters.items.some(
											(item) =>
												item.field === "status" &&
												item.value === filterItem.value
										)
											? "bg-brand"
											: "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span
									className={`px-2 py-0.5 rounded ${filterItem.color}`}
								>
									{filterItem.name}
								</span>
							</div>
						))}
					</div>
					{/* top selling item / Service filter */}
					<div className="flex text-sm bg-white gap-x-2 py-3 px-5 items-center border-y">
						<span
							onClick={() => setFilter("topSeller", true)}
							className={`size-4 border-brand border rounded-xs ${
								selectedBatchFilters.items.some(
									(item) =>
										item.field === "topSeller" &&
										item.value === true
								)
									? "bg-brand"
									: "bg-white"
							}`}
						>
							<Check className="size-4 text-white pr-[2px]" />
						</span>
						<span>Show Top Selling Items / Services</span>
					</div>
					{/* perishable item filter */}
					<div className="flex text-sm bg-white gap-x-2 py-3 px-5 items-center border-b">
						<span
							onClick={() => setFilter("expiryStatus", "expired")}
							className={`size-4 border-brand border rounded-xs ${
								selectedBatchFilters.items.some(
									(item) =>
										item.field === "expiryStatus" &&
										item.value === "expired"
								)
									? "bg-brand"
									: "bg-white"
							}`}
						>
							<Check className="size-4 text-white pr-[2px]" />
						</span>
						<span>Show Perishable Items only</span>
					</div>
					{/* filter with expiry status */}
					<div className="flex flex-col bg-white mt-5 mb-10 pb-5 border-b">
						<span className="py-3 px-5">
							Filter with Expiry Status
						</span>
						{[
							{ name: "fresh", color: "text-success" },
							{ name: "expired", color: "text-danger" },
							{ name: "soon to expire", color: "text-warning" },
						].map((filterItem, i) => (
							<div
								key={i}
								className="flex gap-x-2 text-xs py-2 px-5 items-center"
							>
								<span
									onClick={() =>
										setFilter(
											"expiryStatus",
											filterItem.name
										)
									}
									className={`size-4 border-brand border rounded-xs ${
										selectedBatchFilters.items.some(
											(item) =>
												item.field === "expiryStatus" &&
												item.value === filterItem.name
										)
											? "bg-brand"
											: "bg-white"
									}`}
								>
									<Check className="size-4 text-white pr-[2px]" />
								</span>
								<span
									className={`capitalize ${filterItem.color}`}
								>
									{filterItem.name}
								</span>
							</div>
						))}
					</div>
				</FilterSidebar>
			)}
			{/* view item Sidebar */} {/* OPENS ON THE RIGHT SIDE */}
			<ViewItemSidebar
				isOpen={viewItem}
				onClose={closeViewSidebar}
				currentSelectedItemId={currentSelectedItemId}
				currentSelectedType={currentSelectedType}
			/>
			{/* search bar with filter and sort */}
			<div className="flex justify-between w-full">
				{/* search input */}
				<div className="flex items-center rounded-full ring-1 ring-gray-300 min-w-[360px] max-w-[360px] px-3 py-2 h-12">
					<FiSearch className="size-4 text-[#B3B3B3]" />
					<Input
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							setSearch(value);
							if (dataType === "batch") {
								setFilterBatchModel({
									items: value
										? [
												{
													field: "itemOrService",
													operator: "contains",
													value,
												},
										  ]
										: [],
								});
								return;
							}
							setFilterItemModel({
								items: value
									? [
											{
												field: "itemOrService",
												operator: "contains",
												value,
											},
									  ]
									: [],
							});
						}}
						placeholder="Search by item name..."
						className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg placeholder:italic"
					/>
				</div>
				{/* btns */}
				<div className="flex items-center gap-x-3">
					{/* applied filters */}
					{filterItemModel.items.map((item, i) => (
						<Button
							key={i}
							variant={"outline"}
							className="flex gap-x-1 p-2 hover:bg-white border-[#FAFAFA] rounded-lg items-center"
							onClick={() => {
								setFilterItemModel((prev) => {
									return {
										items: prev.items.filter(
											(filterItem) =>
												filterItem.value !== item.value
										),
									};
								});
								setSelectedItemFilters((prev) => {
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
					))}
					{/* filter toggle */}
					<Button
						variant={"outline"}
						size={"lg"}
						className={`${
							filterItemModel.items.length > 0
								? "text-brand hover:text-brand border-brand"
								: ""
						}`}
						onClick={() => setShowItemFilterSidebar(true)}
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
								className={`${
									sortBatchModel.length > 0
										? "text-brand hover:text-brand border-brand/50 drop-shadow-brand/30 drop-shadow-lg"
										: ""
								} relative`}
							>
								{sortBatchModel.length > 0 && (
									<div className="size-4 bg-brand absolute -top-2 text-xs -left-2 text-white flex justify-center items-center rounded-full">
										{sortBatchModel.length}
									</div>
								)}
								<SortIcon className="size-4" /> Sort
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[300px]">
							<DropdownMenuLabel>
								Sort Inventory
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start ${
										sortBatchModel.at(0)?.field ===
										"addedOn"
											? "!text-brand hover:!text-brand"
											: ""
									}`}
									onClick={() =>
										handleSorting("addedOn", "desc")
									}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Date Added - Oldest to Latest
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Button
									variant={"ghost"}
									size={"sm"}
									className={`w-full justify-start ${
										sortBatchModel.at(0)?.field ===
										"expiryDate"
											? "!text-brand hover:!text-brand"
											: ""
									}`}
									onClick={() =>
										handleSorting("expiryDate", "asc")
									}
								>
									<AiOutlineCalendar className="size-4" />{" "}
									Show Items to expire on top
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{/* item / batch wise toggles */}
			<div className="flex h-fit rounded p-0.5 bg-gray-50 w-fit my-5">
				<Button
					variant={dataType === "item" ? "outline" : "ghost"}
					className={`border-0 ring-0 ${
						dataType === "item"
							? "text-brand hover:text-brand hover:bg-white"
							: "text-gray-500 hover:text-gray-600"
					}`}
					onClick={() => setDataType("item")}
				>
					Item wise
				</Button>
				<Button
					variant={dataType === "batch" ? "outline" : "ghost"}
					className={`border-0 ring-0 ${
						dataType === "batch"
							? "text-brand hover:text-brand hover:bg-white"
							: "text-gray-500 hover:text-gray-600"
					}`}
					onClick={() => setDataType("batch")}
				>
					Batch wise
				</Button>
			</div>
			{/* data grid */}
			<div className="overflow-x-auto">
				{dataType === "item" ? (
					itemData?.docs?.length > 0 ? (
						<GenericDataGrid<InventoryItemTableType>
							columns={itemColumns}
							rows={itemData?.docs ?? []}
							getRowId={(row) => row.id}
							loading={itemPending}
							rowHeight={52}
							customRowCount={itemData?.totalDocs}
							filterModel={filterItemModel}
							onFilterModelChange={setFilterItemModel}
							sortModel={sortItemModel}
							onSortModelChange={setSortItemModel}
							page={page}
							pageSize={pageSize}
							onPageChange={setPage}
							onPageSizeChange={setPageSize}
							rowCount={itemData?.totalDocs || 0}
						/>
					) : (
						<EmptyInventoryFallback />
					)
				) : batchData?.docs?.length > 0 ? (
					<GenericDataGrid<InventoryBatchTableType>
						columns={batchColumns}
						rows={batchData?.docs ?? []}
						rowHeight={52}
						headerHeight={56}
						customRowCount={pageSize}
						getRowId={(row) => row.id}
						loading={batchPending}
						filterModel={filterBatchModel}
						onFilterModelChange={setFilterBatchModel}
						sortModel={sortBatchModel}
						onSortModelChange={setSortBatchModel}
						page={page}
						pageSize={pageSize}
						onPageChange={setPage}
						onPageSizeChange={setPageSize}
						rowCount={batchData?.totalDocs || 0}
					/>
				) : (
					<EmptyInventoryFallback />
				)}
			</div>
		</div>
	);
};

export default InventoryTable;
