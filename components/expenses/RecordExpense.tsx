"use client";
import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronRight, Minus, Plus, X } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogFooter,
} from "@/components/ui/dialog";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import other_expenses from "@/assets/pngs/other-expenses.png";
import purchase_expenses from "@/assets/pngs/purchase-expense.png";
import full_order from "@/assets/pngs/green-circle-check.png";
import partial_order from "@/assets/svgs/inventory-items.svg";
import Image, { type StaticImageData } from "next/image";
import AddCustomerDrawer from "@/components/invoice-components/AddCustomerDrawer";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import AddExpenseTable, { RowData } from "./AddExpenseTable";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { MdOutlineFileUpload } from "react-icons/md";
import { RecordCombobox } from "./RecordCombobox";
import { UserFillIcon } from "@/assets/svgIcons/CustomIcons";
import { Input } from "../ui/input";
import { GenericDataGrid } from "../GenericDataGrid";
import { FiSearch } from "react-icons/fi";
import { CiBoxes } from "react-icons/ci";
import { AppColumn } from "@/types/inventory-types";
import { AiOutlineCheck } from "react-icons/ai";

interface RecordExpenseProps {}

type ExpenseType = "purchase" | "other";

const options: {
	text: string;
	value: ExpenseType;
	image: StaticImageData;
}[] = [
	{
		text: "Expense from Purchase",
		value: "purchase",
		image: purchase_expenses,
	},
	{ text: "Other Expense", value: "other", image: other_expenses },
];

const RecordExpense: FC<RecordExpenseProps> = ({}) => {
	const [showOtherExpenseModal, setShowOtherExpenseModal] =
		useState<boolean>(false);
	const [showPurchaseExpenseModal, setShowPurchaseExpenseModal] =
		useState<boolean>(false);
	const [currentlyRecording, setCurrentlyRecording] =
		useState<ExpenseType | null>(null);
	const [showConfirmOrder, setShowConfirmOrder] = useState<boolean>(false);

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<Plus className="size-4" />
						Record New Expense
					</Button>
				</DialogTrigger>
				<DialogContent className="p-0 rounded-md min-w-[516px] max-w-[516px] z-[100]">
					<DialogHeader>
						<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
							<span className="flex items-center gap-x-3">
								<RiMoneyRupeeCircleLine className="text-[#8F8F8F] size-6" />
								Record Expense
							</span>
							<DialogClose asChild>
								<Button
									variant={"outline"}
									size={"icon"}
									className="rounded-full"
								>
									<X />
								</Button>
							</DialogClose>
						</DialogTitle>
						<DialogDescription className="px-6 pt-4 text-base text-[#6B6B6B]">
							What expense do you want to record ?
						</DialogDescription>
					</DialogHeader>
					<RadioGroup className="flex flex-col gap-y-6 px-6">
						{options.map((option, i) => (
							<div
								key={i}
								className="px-6 py-4 border rounded border-[#E8E8E8] flex items-center space-x-6"
							>
								<RadioGroupItem
									value={option.value}
									onClick={() =>
										setCurrentlyRecording(option.value)
									}
								/>
								<div className="flex items-center gap-x-3">
									<Image
										className="size-10"
										src={option.image}
										alt={option.text}
									/>
									<span className="text-base text-[#474747]">
										{option.text}
									</span>
								</div>
							</div>
						))}
					</RadioGroup>
					<DialogFooter className="px-6 py-4 border-t">
						<DialogClose asChild>
							<Button variant="ghost">Back</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								disabled={currentlyRecording === null}
								onClick={() =>
									setTimeout(() => {
										if (currentlyRecording === "other") {
											setShowPurchaseExpenseModal(false);
											setShowOtherExpenseModal(true);
										} else {
											setShowOtherExpenseModal(false);
											setShowPurchaseExpenseModal(true);
										}

										setCurrentlyRecording(null);
									}, 200)
								}
								className="ml-auto"
							>
								Next
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<RecordOtherExpenseModal
				open={showOtherExpenseModal}
				onOpenChange={setShowOtherExpenseModal}
			/>
			<RecordPurchaseExpenseModal
				nextFx={() => {
					setShowConfirmOrder(true);
				}}
				open={showPurchaseExpenseModal}
				onOpenChange={setShowPurchaseExpenseModal}
			/>
			<ConfirmOrderModal
				open={showConfirmOrder}
				onOpenChange={setShowConfirmOrder}
				returnFx={() => {
					setShowPurchaseExpenseModal(true);
				}}
			/>
		</>
	);
};

export default RecordExpense;

type PartyType = {
	id: string;
	label: string;
};

const RecordOtherExpenseModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
}> = ({ open, onOpenChange }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [showAddPartyModal, setShowAddPartyModal] = useState<boolean>(false);
	const [expenseDate, setExpenseDate] = useState<Date>();
	const [tableRows, setTableRows] = useState<RowData[]>([]);

	const [parties, setParties] = useState<PartyType[]>([
		{
			id: "1",
			label: "Motilal Nehru",
		},
		{
			id: "2",
			label: "Mahargha Das",
		},
		{
			id: "3",
			label: "Mithu Sen",
		},
	]);
	const [selectedPartyId, setSelectedPartyId] = useState<string>("");

	const [isRecurring, setIsRecurring] = useState<boolean>(false);
	const [recurringDate, setRecurringDate] = useState<Date>();
	const challanInput = useRef<HTMLInputElement>(null);

	const close = () => onOpenChange(false);

	if (!open) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
				<div
					ref={modalRef}
					className="bg-white rounded-md shadow-sm flex flex-col justify-between"
					style={{ height: "95vh", width: "1200px" }}
				>
					{/* header */}
					<div className="border-b !h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
						<span className="flex items-center gap-x-3">
							<RiMoneyRupeeCircleLine className="text-[#8f8f8f] size-6" />
							Record Expense
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

					{/* body */}
					<div className="flex z-50 flex-col flex-1 bg-brand/[2%] gap-y-4 py-6 px-10 gap-6 overflow-y-auto">
						{/* first section */}
						<div className="flex flex-col gap-6 mb-5 flex-1 max-h-fit">
							<div className="flex justify-between items-start">
								<div className="flex flex-col gap-y-2 !w-[400px]">
									<Label className="text-[#474747]">
										Party Name :
									</Label>
									<div className="flex flex-1 flex-col gap-y-4 items-end">
										<div className="flex flex-1 w-full gap-x-2 items-center">
											<RecordCombobox
												items={parties}
												value={selectedPartyId}
												onChange={setSelectedPartyId}
												onCreateNew={() =>
													setShowAddPartyModal(true)
												}
												searchPlaceholder="Search party..."
												placeholder={
													<div className="flex gap-2 font-normal items-center text-[#B3B3B3]">
														<UserFillIcon className="text-[#B3B3B3]" />
														Select party if
														applicable
													</div>
												}
												renderItem={(item) => (
													<div className="flex items-center gap-2">
														<div
															className={cn(
																"size-9 rounded-md text-white flex items-center justify-center text-sm font-semibold bg-danger"
															)}
														>
															{item.label[0]}
														</div>
														<span>
															{item.label}
														</span>
													</div>
												)}
												createNewText="New Party"
											/>
											<Button
												onClick={() =>
													setShowAddPartyModal(true)
												}
												className="text-brand hover:text-brand"
												variant="outline"
												size="icon"
											>
												<Plus />
											</Button>
										</div>
										<div className="flex items-center gap-x-2 text-[#242424]">
											<Checkbox /> Expense by Self
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-y-2 !w-[400px]">
									<Label className="text-[#474747]">
										<span className="text-danger mt-1">
											*
										</span>
										Payment Mode :
									</Label>
									<Select>
										<SelectTrigger className="placeholder:text-[#B3B3B3] bg-white w-full h-11">
											<SelectValue placeholder="Select payment mode" />
										</SelectTrigger>
										<SelectContent>
											{[
												"Cash",
												"Bank Transfer",
												"Cheque",
												"UPI",
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
								</div>
							</div>
							<div className="flex flex-col gap-y-2 !w-[400px]">
								<Label className="text-[#474747]">
									<span className="text-danger mt-1">*</span>
									Expense Date :
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"flex-1 justify-between text-left font-normal",
												!expenseDate
													? "text-[#B3B3B3]"
													: "text-[#242424]"
											)}
										>
											{expenseDate
												? format(
														expenseDate,
														"yyyy-MM-dd"
												  )
												: "Pick a date"}
											<CalendarIcon className="text-[#00000040] size-4" />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={expenseDate}
											onSelect={setExpenseDate}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						{/* second section */}
						<div className="bg-white px-4 pt-2 rounded-md border border-[#E8E8E8]">
							<AddExpenseTable
								rows={tableRows}
								setRows={setTableRows}
							/>
						</div>
						{/* third section */}
						<div className="flex-1 bg-white flex justify-between gap-10 p-4 border rounded-md border-[#E8E8E8]">
							<div className="flex flex-col flex-1 gap-y-6">
								<div className="flex flex-col gap-y-3">
									<Label htmlFor="notes-textarea">
										Notes :
									</Label>
									<Textarea
										placeholder="Start writing..."
										className="placeholder:text-[#B3B3B3] min-h-[82px] max-h-[100px] bg-white resize-none"
									/>
								</div>
								<div className="flex items-center">
									<Label className="!w-40">Challan :</Label>
									<Button
										variant="outline"
										className="!h-11 text-[#242424]"
										onClick={() => {
											if (challanInput.current) {
												challanInput.current.click();
											}
										}}
									>
										<MdOutlineFileUpload className="text-brand size-4" />
										Click to upload
									</Button>
									<Input
										type="file"
										className="hidden"
										ref={challanInput}
									/>
								</div>
							</div>
							<div className="flex-1 max-w-[480px] flex flex-col">
								<div className="flex-1 flex flex-col">
									<div className="flex items-center gap-x-2">
										<Switch
											checked={isRecurring}
											onClick={() =>
												setIsRecurring((prev) => !prev)
											}
										/>
										<span className="text-[#242424] font-semibold">
											Set as Recurring Expense
										</span>
									</div>
									<span className="text-[#6B6B6B]">
										Recurring expenses auto-repeat after
										certain interval
									</span>
								</div>
								<div className="flex flex-1 gap-6">
									<div className="min-w-[280px] flex flex-col gap-y-3">
										<Label className="text-[#474747]">
											Repeat Expense after :
										</Label>
										<Select>
											<SelectTrigger className="placeholder:text-[#B3B3B3] bg-white w-full !h-11">
												<SelectValue placeholder="Select payment mode" />
											</SelectTrigger>
											<SelectContent>
												{[
													"1 Month",
													"3 Months",
													"6 Months",
													"12 Months",
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
									</div>
									<div className="flex-1 flex flex-col gap-y-3">
										<Label className="text-[#474747]">
											Stop recurring after :
										</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"justify-between text-left font-normal !h-11",
														!recurringDate
															? "text-[#B3B3B3]"
															: "text-[#242424]"
													)}
												>
													{recurringDate
														? format(
																recurringDate,
																"yyyy-MM-dd"
														  )
														: "Pick a date"}
													<CalendarIcon className="text-[#00000040] size-4" />
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={recurringDate}
													onSelect={setRecurringDate}
												/>
											</PopoverContent>
										</Popover>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* footer */}
					<div className="px-6 flex items-center border-t !h-[72px]">
						<Button variant="ghost" onClick={close}>
							Close
						</Button>
						<Button className="ml-auto">
							Record Expense <ChevronRight />
						</Button>
					</div>
				</div>
			</div>
			<AddCustomerDrawer
				title="New Party"
				open={showAddPartyModal}
				onOpenChange={setShowAddPartyModal}
			/>
		</>
	);
};

type OrderStatus = "accepted" | "partially delivered";

type PurchaseExpenseRow = {
	id: string;
	purchaseOrder: string;
	partyName: string;
	createdOn: string;
	orderAmount: string;
	orderStatus: OrderStatus;
};

const RecordPurchaseExpenseModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
	nextFx: () => void;
}> = ({ open, onOpenChange, nextFx }) => {
	const [tableRows, setTableRows] = useState<PurchaseExpenseRow[]>([
		{
			createdOn: "25-05-2025",
			id: "1",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "partially delivered",
		},
		{
			createdOn: "25-05-2025",

			id: "2",
			purchaseOrder: "PO-00124",
			orderAmount: "70,000",
			partyName: "Karish",
			orderStatus: "accepted",
		},
		{
			createdOn: "25-05-2025",

			id: "3",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "accepted",
		},
		{
			createdOn: "25-05-2025",

			id: "4",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "partially delivered",
		},
		{
			createdOn: "25-05-2025",

			id: "5",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "accepted",
		},
		{
			createdOn: "25-05-2025",

			id: "6",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "accepted",
		},
		{
			createdOn: "25-05-2025",

			id: "7",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "accepted",
		},
	]);
	const [loading, setLoading] = useState<boolean>(false);

	const [selectedPurchase, setSelectedPurchase] = useState<
		PurchaseExpenseRow[]
	>([
		{
			createdOn: "25-05-2025",
			id: "1",
			purchaseOrder: "PO-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			orderStatus: "accepted",
		},
	]);

	const getRow = (id: string): PurchaseExpenseRow | null => {
		const row = selectedPurchase.find((row) => row?.id && row.id === id);
		if (row) {
			console.log(row.id);
		}
		return row ?? null;
	};

	const selectRow = (id: string) => {
		const row = getRow(id);
		if (row !== null) {
			setSelectedPurchase((prev) =>
				prev.filter((filter) => filter.id !== row.id)
			);
		} else {
			setSelectedPurchase((prev) => [...prev, row]);
		}
	};

	const columns: AppColumn<PurchaseExpenseRow>[] = [
		{
			field: "id",
			headerName: "",
			hideSortIcons: true,
			minWidth: 40,
			maxWidth: 40,
			renderCell({ row }) {
				const selected = getRow(row.id);
				return (
					<div className="h-full w-full center">
						<Input
							type="radio"
							className="size-4"
							checked={!!selected}
							onChange={() => selectRow(row.id)}
						/>
					</div>
				);
			},
		},
		{
			field: "purchaseOrder",
			headerName: "# Purchase Order",
			hideSortIcons: true,
			minWidth: 140,
			maxWidth: 140,
			cellClassName: "text-brand text-sm",
			headerClassName: "text-[#6B6B6B] text-sm",
		},
		{
			field: "partyName",
			headerName: "Party Name",
			hideSortIcons: true,
			flex: 1,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center text-sm">
							<span className="text-white bg-danger size-8 rounded-full center">
								{row.partyName.charAt(0)}
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
			field: "createdOn",
			headerName: "Created on",
			hideSortIcons: true,
			minWidth: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "orderAmount",
			headerName: "Order Amount",
			hideSortIcons: true,
			minWidth: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "orderStatus",
			headerName: "Order Status",
			hideSortIcons: true,
			minWidth: 200,
			maxWidth: 200,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div
							className={cn(
								"flex items-center capitalize py-1 px-3 rounded-full text-sm text-success bg-success/5"
							)}
						>
							{row.orderStatus}
						</div>
					</div>
				);
			},
		},
	];

	const handleSubmit = () => {
		console.log(selectedPurchase);
		nextFx();
		close();
	};

	const close = () => onOpenChange(false);

	if (!open) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
				<div
					className="bg-white rounded-md shadow-sm flex flex-col justify-between"
					style={{ height: "95vh", width: "1200px" }}
				>
					{/* header */}
					<div className="border-b !h-[88px] text-[#474747] flex items-center justify-between px-6 text-lg gap-x-3">
						<span className="flex items-center gap-x-3">
							<CiBoxes className="text-[#8f8f8f] size-6" />
							Select Purchase Order
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

					{/* body */}
					<div className="flex flex-col flex-1 bg-white gap-y-4 py-6 px-10 gap-6 overflow-y-auto">
						<span className="text-heading-light -ml-3">
							Select a Purchase Order to record Expense
						</span>
						<div className="flex items-center rounded-full ring-1 ring-gray-300 !w-[400px] px-3 py-2 h-12">
							<FiSearch className="size-4 text-light-100" />
							<Input
								placeholder="Search by party or Order number..."
								className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-light-100 placeholder:text-lg placeholder:italic"
							/>
						</div>
						<div className={loading ? "" : "border rounded"}>
							<GenericDataGrid
								columns={columns}
								getRowId={(row) => row.id}
								rows={tableRows}
								hideFooter
								headerHeight={56}
								rowHeight={52}
								loading={loading}
								customRowCount={10}
								page={1}
								pageSize={10}
								rowCount={10}
								onPageChange={(page) => console.log(page)}
								onPageSizeChange={(pageSize) =>
									console.log(pageSize)
								}
							/>
						</div>
					</div>
					{/* footer */}
					<div className="px-6 flex items-center border-t !h-[72px]">
						<Button variant="ghost" onClick={close}>
							Close
						</Button>
						<Button className="ml-auto" onClick={handleSubmit}>
							Clear Vendor Payment <ChevronRight />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

type ConfirmOrderModalProps = {
	open: boolean;
	onOpenChange: (val: boolean) => void;
	returnFx: () => void;
};

type OrderOption = "partial" | "full";

const ConfirmOrderModal: FC<ConfirmOrderModalProps> = ({
	onOpenChange,
	open,
	returnFx,
}) => {
	const [selectedAction, setSelectedAction] = useState<OrderOption | null>(
		null
	);
	const [receivingDate, setReceivingDate] = useState<Date>();
	const [showBatchModal, setShowBatchModal] = useState<boolean>(false);

	const options: {
		value: OrderOption;
		text: string;
		image: StaticImageData;
	}[] = [
		{
			value: "partial",
			text: "Partial Order Received ?",
			image: partial_order,
		},
		{
			value: "full",
			text: "Full Order Received ?",
			image: full_order,
		},
	];

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="p-0 rounded-md min-w-[516px] max-w-[516px]">
					<DialogHeader>
						<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
							<span className="flex items-center gap-x-3">
								<CiBoxes className="text-[#8F8F8F] size-6" />
								Track received items
							</span>
							<DialogClose asChild>
								<Button
									variant={"outline"}
									size={"icon"}
									className="rounded-full"
								>
									<X />
								</Button>
							</DialogClose>
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-6">
						<div className="flex items-center justify-between px-6">
							<Label className="gap-x-1 !w-40">
								<span className="text-red-500">*</span>
								<span className="text-heading-dark font-semibold">
									Recieving Date :
								</span>
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"flex-1 justify-between text-left font-normal",
											!receivingDate
												? "text-[#B3B3B3]"
												: "text-[#242424]"
										)}
									>
										{receivingDate
											? format(
													receivingDate,
													"yyyy-MM-dd"
											  )
											: "Pick a date"}
										<CalendarIcon className="text-[#00000040] size-4" />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={receivingDate}
										onSelect={setReceivingDate}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<hr />
						<RadioGroup className="flex flex-col gap-y-6 px-6">
							<span className="text-heading-light">
								Please mention which items have been delivered
								from this order
							</span>
							{options.map((option, i) => (
								<div
									key={i}
									className="px-6 py-4 border rounded border-[#E8E8E8] flex items-center space-x-6"
								>
									<RadioGroupItem
										value={option.value}
										onClick={() =>
											setSelectedAction(option.value)
										}
									/>
									<div className="flex items-center gap-x-3">
										<Image
											className="size-10"
											src={option.image}
											alt={option.text}
										/>
										<span className="text-base text-[#474747]">
											{option.text}
										</span>
									</div>
								</div>
							))}
						</RadioGroup>
					</div>
					<DialogFooter className="px-6 py-4 border-t">
						<DialogClose asChild>
							<Button onClick={returnFx} variant="ghost">
								Back
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								disabled={selectedAction === null}
								onClick={() =>
									setTimeout(() => {
										if (selectedAction === "partial") {
											setShowBatchModal(true);
										} else {
											setShowBatchModal(false);
										}

										setSelectedAction(null);
									}, 200)
								}
								className="ml-auto"
							>
								{selectedAction === "partial" ? "Next" : "Save"}
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<CreateBatchModal
				open={showBatchModal}
				onOpenChange={setShowBatchModal}
				nextFx={() => {}}
				returnFx={() => onOpenChange(true)}
			/>
		</>
	);
};

type BatchTableRow = {
	id: string;
	itemName: string;
	unit: string;
	sellingPrice: string;
	orderQty: number;
	receivedQty: number;
	purchaseRate: number;
	purchaseWithTax?: boolean;
	MRP: number;
	MRPWithTax?: boolean;
	manufacturingDate?: Date;
};

const CreateBatchModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
	nextFx: () => void;
	returnFx: () => void;
}> = ({ open, onOpenChange, nextFx, returnFx }) => {
	const [tableRows, setTableRows] = useState<BatchTableRow[]>([
		{
			id: "1",
			itemName: "biscuits",
			MRP: 100,
			orderQty: 20,
			purchaseRate: 412,
			receivedQty: 0,
			sellingPrice: "400",
			unit: "PCS",
			MRPWithTax: true,
			purchaseWithTax: true,
			manufacturingDate: new Date(Date.now()),
		},
	]);
	const [loading, setLoading] = useState<boolean>(false);

	const columns: AppColumn<BatchTableRow>[] = [
		{
			field: "id",
			headerName: "",
			hideSortIcons: true,
			minWidth: 40,
			maxWidth: 40,
			renderCell({ row }) {
				return (
					<div className="h-full w-full center">
						<Checkbox className="size-4" />
					</div>
				);
			},
		},
		{
			field: "itemName",
			headerName: "Item",
			hideSortIcons: true,
			minWidth: 360,
			maxWidth: 360,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div className="flex gap-x-2 items-center text-sm">
							<span className="text-white bg-danger size-8 rounded-md uppercase center">
								{row.itemName.charAt(0)}
							</span>
							<div className="text-[#474747] flex flex-col">
								<span>{row.itemName}</span>
								<span className="text-light-300">
									₹ <span>{row.sellingPrice}</span> /{" "}
									{row.unit}
								</span>
							</div>
						</div>
					</div>
				);
			},
		},
		{
			field: "orderQty",
			headerName: "Ordered QTY",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "receivedQty",
			headerName: "Received in delivery",
			hideSortIcons: true,
			minWidth: 240,
			maxWidth: 240,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-between gap-x-2">
						<Button variant="outline" size="icon">
							<Minus className="text-brand hover:text-brand" />
						</Button>
						<Input placeholder="Qty received" className="flex-1" />
						<Button variant="outline" size="icon">
							<Plus className="text-brand hover:text-brand" />
						</Button>
					</div>
				);
			},
		},
		{
			field: "purchaseRate",
			headerName: "Purchase rate",
			hideSortIcons: true,
			minWidth: 280,
			maxWidth: 280,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-between gap-x-2">
						<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
							<Input
								type="number"
								placeholder={"Purchase rate"}
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
				);
			},
		},
		{
			field: "MRP",
			headerName: "MRP per Unit (change if you want)",
			hideSortIcons: true,
			minWidth: 280,
			maxWidth: 280,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-between gap-x-2">
						<div className="flex flex-1 items-center border border-[#D6D6D6] rounded">
							<Input
								type="number"
								placeholder={"MRP per unit"}
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
				);
			},
		},
		{
			field: "manufacturingDate",
			headerName: "Manufacturing Date",
			hideSortIcons: true,
			minWidth: 160,
			maxWidth: 160,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-between gap-x-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-between text-left font-normal",
										!row.manufacturingDate
											? "text-[#B3B3B3]"
											: "text-[#242424]"
									)}
								>
									{row.manufacturingDate ? (
										format(
											row.manufacturingDate,
											"yyyy-MM-dd"
										)
									) : (
										<span>Pick a date</span>
									)}
									<CalendarIcon className="text-[#00000040] size-4" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start"
							>
								<Calendar
									mode="single"
									selected={row.manufacturingDate}
									onSelect={() => {}}
								/>
							</PopoverContent>
						</Popover>
					</div>
				);
			},
		},
	];

	const handleSubmit = () => {
		nextFx();
		close();
	};

	const close = () => onOpenChange(false);

	if (!open) return null;

	return (
		<>
			<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
				<div
					className="bg-white rounded-md shadow-sm flex flex-col justify-between"
					style={{ height: "95vh", width: "1200px" }}
				>
					{/* header */}
					<div className="border-b !h-[88px] text-[#474747] flex items-center justify-between px-6 text-lg gap-x-3">
						<span className="flex items-center gap-x-3">
							<CiBoxes className="text-[#8f8f8f] size-6" />
							Create Batches
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

					{/* body */}
					<div className="flex flex-col flex-1 bg-white gap-y-4 py-6 px-10 gap-6 overflow-y-auto">
						<span className="text-heading-light">
							Create Batches in Inventory
						</span>
						<div
							className={
								loading ? "" : "border rounded overflow-x-auto"
							}
						>
							<GenericDataGrid<BatchTableRow>
								columns={columns}
								getRowId={(row) => row.id}
								rows={tableRows}
								hideFooter
								headerHeight={56}
								rowHeight={52}
								loading={loading}
								customRowCount={10}
								page={1}
								pageSize={10}
								rowCount={10}
								onPageChange={(page) => console.log(page)}
								onPageSizeChange={(pageSize) =>
									console.log(pageSize)
								}
							/>
						</div>
					</div>
					{/* footer */}
					<div className="px-6 flex items-center border-t !h-[72px]">
						<Button
							variant="ghost"
							onClick={() => {
								close();
								returnFx();
							}}
						>
							Back
						</Button>
						<Button className="ml-auto" onClick={handleSubmit}>
							<AiOutlineCheck className="size-4" /> Add Items to
							Inventory
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
