"use client";
import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
	CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Plus,
	Upload,
	X,
} from "lucide-react";
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
import other_income from "@/assets/pngs/income-from-other.png";
import invoice_income from "@/assets/pngs/income-from-invoice.png";
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
import AddIncomeTable, { RowData } from "./AddIncomeTable";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { MdOutlineFileUpload } from "react-icons/md";
import { RecordCombobox } from "@/components/expenses/RecordCombobox";
import { UserFillIcon } from "@/assets/svgIcons/CustomIcons";
import { Input } from "../ui/input";
import { CiBoxes } from "react-icons/ci";
import { AppColumn } from "@/types/inventory-types";
import { GenericDataGrid } from "../GenericDataGrid";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

interface RecordIncomeProps {}

type IncomeType = "invoice" | "other";

const options: {
	text: string;
	value: IncomeType;
	image: StaticImageData;
}[] = [
	{
		text: "Income from Invoice",
		value: "invoice",
		image: invoice_income,
	},
	{ text: "Income from other source", value: "other", image: other_income },
];

const RecordIncome: FC<RecordIncomeProps> = ({}) => {
	const [showOtherIncome, setShowOtherIncome] = useState<boolean>(false);
	const [showIncomeFromInvoice, setShowIncomeFromInvoice] =
		useState<boolean>(false);

	const [currentlyRecording, setCurrentlyRecording] =
		useState<IncomeType | null>(null);

	const [showRecordIncomeModal, setShowRecordIncomeModal] =
		useState<boolean>(false);

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<Plus className="size-4" />
						Record New Income
					</Button>
				</DialogTrigger>
				<DialogContent className="p-0 rounded-md min-w-[516px] max-w-[516px] z-[100]">
					<DialogHeader>
						<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-xl gap-x-3">
							<span className="flex items-center gap-x-3">
								<RiMoneyRupeeCircleLine className="text-[#8F8F8F] size-6" />
								Record Income
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
							Select what you want to record ?
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
											setShowIncomeFromInvoice(false);
											setShowOtherIncome(true);
										} else {
											setShowOtherIncome(false);
											setShowIncomeFromInvoice(true);
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
			<RecordOtherIncomeModal
				open={showOtherIncome}
				onOpenChange={setShowOtherIncome}
			/>
			<RecordInvoiceIncomeModal
				nextFx={() => setShowRecordIncomeModal(true)}
				open={showIncomeFromInvoice}
				onOpenChange={setShowIncomeFromInvoice}
			/>
			<RecordPaymentModal
				open={showRecordIncomeModal}
				onOpenChange={setShowRecordIncomeModal}
			/>
		</>
	);
};

export default RecordIncome;

type PartyType = {
	id: string;
	label: string;
};

const RecordOtherIncomeModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
}> = ({ open, onOpenChange }) => {
	const [showAddPartyModal, setShowAddPartyModal] = useState<boolean>(false);
	const [incomeDate, setIncomeDate] = useState<Date>();
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

	const fileInput = useRef<HTMLInputElement>(null);

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
							<RiMoneyRupeeCircleLine className="text-[#8f8f8f] size-6" />
							Record Income
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
										<div className="flex items-center gap-x-2 text-heading-dark font-semibold">
											<Checkbox /> Unspecified Source
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-y-2 !w-[400px]">
									<Label className="text-[#474747]">
										<span className="text-danger mt-1">
											*
										</span>
										Income Mode :
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
									Income Date :
								</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className={cn(
												"flex-1 justify-between text-left font-normal",
												!incomeDate
													? "text-[#B3B3B3]"
													: "text-[#242424]"
											)}
										>
											{incomeDate
												? format(
														incomeDate,
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
											selected={incomeDate}
											onSelect={setIncomeDate}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
						{/* second section */}
						<div className="bg-white px-4 pt-2 rounded-md border border-[#E8E8E8]">
							<AddIncomeTable
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
							</div>
							<div className="flex-1 max-w-[480px] gap-3 flex flex-col">
								<Label>Attachments or Receipts :</Label>
								<div className="flex flex-1">
									<Button
										variant="outline"
										className="flex-1 h-full flex-col text-light-200 hover:text-light-200 bg-brand/5 hover:bg-brand/5 border-brand border-dashed"
										onClick={() => {
											if (fileInput.current) {
												fileInput.current.click();
											}
										}}
									>
										<MdOutlineFileUpload className="text-brand size-6" />
										<div className="flex gap-x-1 items-center text-sm">
											Drag & Drop file here or{" "}
											<span className="text-brand text-base">
												Click here
											</span>
										</div>
									</Button>
									<Input
										type="file"
										className="hidden"
										ref={fileInput}
									/>
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
							Record Income <ChevronRight />
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

type PaymentStatus = "due" | "partially paid" | "overdue";

type InvoiceIncomeTableRow = {
	id: string;
	invoiceNumber: string;
	partyName: string;
	createdOn: string;
	dueDate: string;
	orderAmount: string;
	dueAmount: string;
	paymentStatus: PaymentStatus;
};

const RecordInvoiceIncomeModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
	nextFx: () => void;
}> = ({ open, onOpenChange, nextFx }) => {
	const [tableRows, setTableRows] = useState<InvoiceIncomeTableRow[]>([
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "1",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "2",
			invoiceNumber: "INV-00124",
			orderAmount: "70,000",
			partyName: "Karish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "3",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "4",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "5",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "6",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "7",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
	]);
	const [loading, setLoading] = useState<boolean>(false);

	const [selectedInvoices, setSelectedInvoices] = useState<
		InvoiceIncomeTableRow[]
	>([
		{
			createdOn: "25-05-2025",
			dueAmount: "70,000",
			dueDate: "28-09-2025",
			id: "1",
			invoiceNumber: "INV-0012",
			orderAmount: "70,000",
			partyName: "Ravish",
			paymentStatus: "due",
		},
	]);

	const getRow = (id: string): InvoiceIncomeTableRow | null => {
		const row = selectedInvoices.find((row) => row?.id && row.id === id);
		if (row) {
			console.log(row.id);
		}
		return row ?? null;
	};

	const selectRow = (id: string) => {
		const row = getRow(id);
		if (row !== null) {
			setSelectedInvoices((prev) =>
				prev.filter((filter) => filter.id !== row.id)
			);
		} else {
			setSelectedInvoices((prev) => [...prev, row]);
		}
	};

	const columns: AppColumn<InvoiceIncomeTableRow>[] = [
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
			field: "invoiceNumber",
			headerName: "# Invoice No",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
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
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "dueDate",
			headerName: "Due Date",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "orderAmount",
			headerName: "Order Amount",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "dueAmount",
			headerName: "Due Amount",
			hideSortIcons: true,
			minWidth: 120,
			maxWidth: 120,
			headerClassName: "text-[#6B6B6B] text-sm",
			cellClassName: "text-[#242424] text-sm",
		},
		{
			field: "paymentStatus",
			headerName: "Payment Status",
			hideSortIcons: true,
			minWidth: 140,
			maxWidth: 140,
			headerClassName: "text-[#6B6B6B] text-sm",
			renderCell({ row }) {
				return (
					<div className="h-full w-full flex items-center justify-start">
						<div
							className={cn(
								"flex items-center capitalize py-1 px-3 rounded-full text-sm",
								row.paymentStatus === "due" ||
									row.paymentStatus === "partially paid"
									? "text-warning bg-warning/10"
									: "",
								row.paymentStatus === "overdue"
									? "text-danger bg-danger/10"
									: ""
							)}
						>
							{row.paymentStatus}
						</div>
					</div>
				);
			},
		},
	];

	const handleSubmit = () => {
		console.log(selectedInvoices);
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
							Select Invoice
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
							Select an Invoice to record Income
						</span>
						<div className="flex items-center rounded-full ring-1 ring-gray-300 !w-[400px] px-3 py-2 h-12">
							<FiSearch className="size-4 text-light-100" />
							<Input
								placeholder="Search by party or Invoice number..."
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
								onPageSizeChange={(pageSize) => console.log(pageSize)}
							/>
						</div>
					</div>
					{/* footer */}
					<div className="px-6 flex items-center border-t !h-[72px]">
						<Button variant="ghost" onClick={close}>
							Close
						</Button>
						<Button className="ml-auto" onClick={handleSubmit}>
							Record Payment Received <ChevronRight />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

const RecordPaymentModal: FC<{
	open: boolean;
	onOpenChange: (val: boolean) => void;
}> = ({ open, onOpenChange }) => {
	const router = useRouter();
	const [incomeDate, setIncomeDate] = useState<Date>();
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="[&>button]:hidden p-0 !min-w-[992px]">
				<DialogHeader>
					<div className="flex flex-row justify-between items-center border-b py-4 px-6">
						<DialogTitle className="text-2xl text-[#474747] flex items-center gap-2">
							Record Payment Recieved
						</DialogTitle>
						<DialogClose asChild>
							<X className="h-8 w-8 p-2 bg-white hover:bg-gray-100 rounded-full border" />
						</DialogClose>
					</div>
				</DialogHeader>

				<div className="grid grid-cols-2 gap-10 max-w-4xl w-full mx-auto pb-2">
					<div className="pl-4">
						<div className="flex justify-center items-center h-3/5 bg-gradient-to-b from-[#F9F9F9] to-[#FFFFFF]">
							<Image
								src="/recordInvoice.png"
								alt="recordInvoice"
								height={150}
								width={150}
							/>
						</div>
						<div className="bg-[#FAFAFA] p-4">
							<div>
								<Avatar className="mb-2 size-10 bg-white">
									<AvatarFallback className="bg-brand/80 text-2xl size-10 text-white">
										A
									</AvatarFallback>
								</Avatar>
								<h3 className="text-xl text-[#474747]">
									Akansha Mishra
								</h3>
								<p className="text-sm text-light-300">
									# INV 000010 -{" "}
									<span className="text-light-200">Due</span>{" "}
									: 24 Apr, 2025
								</p>
							</div>
							<hr className="my-3" />
							<div className="flex flex-row gap-20">
								<div className="flex flex-col">
									<span className="text-sm text-[#6B6B6B]">
										Total Amount:
									</span>
									<span className="text-heading-light">
										₹ 40,00,000
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-[#6B6B6B]">
										Amount Due:
									</span>
									<span className="text-danger text-xl">
										₹ 80,000
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col text-sm space-y-4 pr-4">
						<div className="flex items-center justify-between">
							<Label className="gap-x-1">
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
											"w-[280px] justify-between text-left font-normal",
											!incomeDate
												? "text-[#B3B3B3]"
												: "text-[#242424]"
										)}
									>
										{incomeDate
											? format(incomeDate, "yyyy-MM-dd")
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
										selected={incomeDate}
										onSelect={setIncomeDate}
									/>
								</PopoverContent>
							</Popover>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label className="text-red-500">
								* Amount Recieved :
							</Label>
							<Input
								type="number"
								placeholder="Enter amount recieved"
								className="w-[280px]"
							/>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label className="gap-x-1">
								<span className="text-red-500">*</span>
								<span className="text-heading-dark font-semibold">
									Bank Name :
								</span>
							</Label>
							<Select>
								<SelectTrigger className="w-[280px]">
									<SelectValue
										placeholder="eg. HDFC Bank"
										className="placeholder:text-light-200"
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hdfc">HDFC</SelectItem>
									<SelectItem value="idbi">IDBI</SelectItem>
									<SelectItem value="sbi">SBI</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label className="gap-x-1">
								<span className="text-red-500">*</span>
								<span className="text-heading-dark font-semibold">
									Payment Mode :
								</span>
							</Label>
							<Select>
								<SelectTrigger className="w-[280px]">
									<SelectValue
										placeholder="eg. Cash"
										className="placeholder:text-light-200"
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="upi">UPI</SelectItem>
									<SelectItem value="banking">
										Net Banking
									</SelectItem>
									<SelectItem value="card">Card</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center space-x-2 mt-1">
							<Checkbox id="dontAsk" />
							<Label htmlFor="dontAsk">
								TDS collected by customer
							</Label>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label>Amount :</Label>
							<Input
								type="number"
								placeholder="Enter TDS Amount"
								className="w-[280px]"
							/>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label>Challan :</Label>
							<Button variant="outline" className="w-[280px]">
								<Upload className="h-4 w-4 text-[#025AE0]" />
								<span className="text-[#242424] text-base">
									Click to Upload
								</span>
							</Button>
						</div>
						<hr />
						<div className="flex flex-row items-center justify-between">
							<Label>Notes:</Label>
							<Input
								type="text"
								placeholder="Start writing..."
								className="w-[280px]"
							/>
						</div>
						<div className="flex flex-row items-center justify-between">
							<Label>Attachments:</Label>
							<Button variant="outline" className="w-[280px]">
								<Upload className="h-4 w-4 text-[#025AE0]" />
								<span className="text-[#242424] text-base">
									Click to Upload
								</span>
							</Button>
						</div>
					</div>
				</div>

				<DialogFooter className="w-full flex justify-between border-t shadow-2xl px-6 py-2">
					<DialogClose asChild>
						<Button variant="ghost" className="mr-auto">
							<ChevronLeft />
							Back
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							variant="primary"
							className="px-5"
							onClick={() =>
								router.push("/invoice/view-invoice/")
							}
						>
							Update
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
