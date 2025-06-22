"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { PdfIcon, TrashIcon } from "@/assets/svgIcons/CustomIcons";
import { ConfirmationDialog } from "../inventory/EditItemForm";
import { SiHdfcbank } from "react-icons/si";
import { cn } from "@/lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface ViewExpenseProps {}

type ExpenseItem = { name: string; date: string };

const MockExpenseArray: ExpenseItem[] = [
	{ name: "IT & Services Charge", date: "12 Mar, 2025" },
	{ name: "Meals & Entertainment", date: "26 Mar, 2025" },
	{ name: "Travel Cost", date: "8 Feb, 2025" },
	{ name: "Labour Expense", date: "12 Jan, 2025" },
	{ name: "Repair & Maintenance", date: "24 Apr, 2025" },
];

const MockCredsArray = [
	{ title: "Expense Date", value: "12 Apr, 2025" },
	{ title: "Payment Mode", value: "Cash" },
	{ title: "Expense Type", value: "Recurring" },
];

const MockExpenseCategoryArray = [
	{ name: "IT & Services Charge", amount: "10,000" },
	{ name: "Labour Charges", amount: "10,000" },
	{ name: "Repair & Expenses", amount: "30,000" },
	{ name: "Cleaning & Janitorial Expense", amount: "10,000" },
];

const ViewExpense: FC<ViewExpenseProps> = ({}) => {
	const router = useRouter();
	const [showRemoveExpenseDialog, setShowRemoveExpenseDialog] =
		useState<boolean>(false);

	return (
		<div className="flex flex-col justify-between h-full overflow-hidden">
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

					<h2 className="text-xl text-[#474747]">Expenses</h2>
				</div>
				<div className="flex gap-x-2 items-center">
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
							<DropdownMenuLabel className="text-lg text-[#6B6B6B] font-normal">
								Action
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() =>
									setTimeout(() => {
										setShowRemoveExpenseDialog(true);
									}, 200)
								}
							>
								<div className="flex items-center text-base gap-x-2 py-1 flex-1 text-danger">
									<TrashIcon className="size-6 text-danger" />{" "}
									Delete Expense
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{/* body */}
			<div className="flex flex-1 overflow-hidden">
				{/* left section */}
				<div className="flex-1 flex-col flex justify-between bg-white min-h-full max-h-full overflow-hidden min-w-[31%] max-w-[31%] border-r border-[#E8E8E8]">
					<div className="!h-[104px] border-b flex items-center justify-between p-6">
						<div className="flex flex-col gap-y-2 text-lg text-[#474747]">
							<div className="flex items-center gap-x-1">
								<span>Your Expenses</span>-
								<span className="center bg-brand/5 text-brand rounded-full size-6 font-bold text-sm">
									5
								</span>
							</div>
							<span>Click to see details</span>
						</div>
						<Button
							variant="outline"
							size="icon"
							className="size-[56px] text-brand hover:text-brand"
						>
							<Plus className="size-6" />
						</Button>
					</div>
					<div
						style={{ direction: "rtl" }}
						className="flex-1 bg-white min-w-full overflow-y-scroll"
					>
						<div
							className="max-h-full min-h-full min-w-full flex-1 border-l border-[#E8E8E8]"
							style={{ direction: "ltr" }}
						>
							{MockExpenseArray.map((exp, i) => (
								<ExpenseSidebarItem
									key={i}
									isActive={i === 0}
									data={exp}
									setActive={() => {}}
								/>
							))}
						</div>
					</div>
				</div>
				{/* right section */}
				<div className="flex-1 flex-col flex overflow-hidden">
					<div className="overflow-y-scroll flex-1">
						<div className="flex min-h-full flex-col flex-1 border-r p-6 gap-6 border-[#E8E8E8]">
							{/* expense detail */}
							<div className="flex flex-col bg-white max-h-[162px] flex-1 border border-[#E8E8E8] rounded-[8px]">
								{/* heading */}
								<h3 className="!h-[46px] px-4 py-3 text-lg text-[#474747] border-b border-b-[#E8E8E8]">
									Expense Details
								</h3>
								{/* content */}
								<div className="p-6 flex justify-between items-start flex-1">
									<div className="flex gap-4 items-center">
										{/* circle */}
										<span className="bg-danger text-white border-4 rounded-full center shadow-sm size-12">
											S
										</span>
										<div className="flex flex-col justify-center">
											<span className="text-sm text-[#8F8F8F]">
												Party
											</span>
											<span className="text-[#242424] text-[22px]">
												Self Expense
											</span>
										</div>
									</div>
									<div className="!w-[220px] bg-[#FAFAFA] !h-[68px] border-l-4 border-l-danger px-4 flex flex-col justify-center">
										<span className="text-sm text-[#8F8F8F]">
											Expense Amount
										</span>
										<span className="text-[#242424] text-[22px]">
											₹ 60,000
										</span>
									</div>
								</div>
							</div>
							{/* other content */}
							<div className="flex flex-col bg-white flex-1 border border-[#E8E8E8] rounded-[8px]">
								{/* Credentials */}
								<div>
									<h3 className="!h-[46px] px-4 py-3 text-lg text-[#474747] border-b border-b-[#E8E8E8]">
										Credentials
									</h3>
									<div className="p-6 flex justify-between gap-x-4 items-start flex-1">
										<div className="!w-[294px] flex flex-col gap-y-4 text-[#8F8F8F]">
											{MockCredsArray.map((item, i) => (
												<div
													key={i}
													className="flex w-full items-center text-sm"
												>
													<div className="flex !w-[140px] items-center gap-x-2">
														<div className="center size-6 bg-[#fafafa] rounded-full">
															<Calendar className="size-3" />
														</div>
														{item.title} :
													</div>
													<span className="text-[#242424]">
														{item.value}
													</span>
												</div>
											))}
										</div>
										{/* bank detail */}
										<div className="flex-1 flex">
											<div className="flex gap-x-2 text-[#8F8F8F] text-sm items-center !w-[140px]">
												<div className="center size-6 bg-[#fafafa] rounded-full">
													<CiBank className="size-3" />
												</div>
												Bank Account :
											</div>
											<div className="flex flex-1 items-center gap-x-2">
												<div className="center size-[28px] bg-[#fafafa] rounded-full">
													<SiHdfcbank className="size-4 text-gray-700" />
												</div>
												<div className="flex items-center gap-x-2">
													<span className="text-base text-[#474747]">
														HDFC Bank
													</span>
													<span className="text-sm text-[#6B6B6B]">
														- 4478
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* Expense Categories */}
								<div>
									<h3 className="!h-[46px] px-4 py-3 text-lg text-[#474747] border-b border-b-[#E8E8E8]">
										Expense Categories
									</h3>
									<div className="py-6 px-5 flex-1">
										<Table className="border w-full rounded-[8px]">
											<TableHeader className="h-[56px]">
												<TableRow className="h-fit bg-white hover:bg-white border-b text-[#6B6B6B] font-normal text-sm">
													<TableHead
														style={{ width: "50%" }}
														className="text-[#6B6B6B] font-normal text-sm px-3"
													>
														Expense Category
													</TableHead>
													<TableHead className="text-[#6B6B6B] font-normal text-sm">
														<span className="border-l px-3">
															Expense Amount (₹)
														</span>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{MockExpenseCategoryArray.map(
													(row, i) => {
														return (
															<TableRow
																key={i}
																className="bg-white hover:bg-white !h-[52px] text-[#242424]"
															>
																{/* category */}
																<TableCell className="px-3">
																	{row.name}
																</TableCell>
																{/* amount */}
																<TableCell className="pr-3 pl-6">
																	{row.amount}
																</TableCell>
															</TableRow>
														);
													}
												)}
											</TableBody>
											<TableFooter>
												<TableRow className="bg-white hover:bg-white !h-[52px] text-[#242424]">
													<TableCell className="px-3 font-semibold">
														Total
													</TableCell>
													<TableCell className="pr-3 pl-6 font-normal">
														60,000
													</TableCell>
												</TableRow>
											</TableFooter>
										</Table>
									</div>
								</div>
								{/* note & attachment */}
								<div className="flex flex-1">
									<div className="flex-1 flex-col">
										<h3 className="!h-[46px] px-4 py-3 text-lg text-[#474747] border-b border-b-[#E8E8E8]">
											Notes
										</h3>
										<p className="max-w-full whitespace-normal break-words p-6 max-h-full truncate">
											This is a demo note to show that can
											be entered while recording the
											expense, the UI of this section.
										</p>
									</div>
									<div className="!w-[360px] flex-col">
										<h3 className="!h-[46px] px-4 py-3 text-lg text-[#474747] border-b border-b-[#E8E8E8]">
											Attachments
										</h3>
										<div className="p-6">
											<div className="border gap-x-2 !h-[56px] border-[#E8E8E8] rounded bg-[#fafafa] flex flex-1">
												<div className="center h-full w-[50px] bg-white rounded-l">
													<PdfIcon className="text-danger size-6" />
												</div>
												<div className="flex flex-col text-[#474747] py-1">
													<span>Receipts_10.PDF</span>
													<span className="text-sm text-[#6B6B6B]">
														1.5 mb
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* delete expense popup */}
			<ConfirmationDialog
				open={showRemoveExpenseDialog}
				onOpenChange={setShowRemoveExpenseDialog}
				acceptBtnFx={async () => {
					setShowRemoveExpenseDialog(false);
					return false;
				}}
				description="Are you sure you want to delete the Expense?"
				acceptText={"Yes, Delete Expense"}
				acceptBtnClass="bg-danger hover:bg-danger"
				cancelText="Keep it"
			/>
		</div>
	);
};

export default ViewExpense;

type ExpenseSidebarItemProps = {
	isActive?: boolean;
	setActive: () => void;
	data: ExpenseItem;
};

const ExpenseSidebarItem: FC<ExpenseSidebarItemProps> = ({
	isActive,
	setActive,
	data,
}) => {
	return (
		<div
			onClick={setActive}
			className={cn(
				"max-h-[66px] w-full flex-1 flex justify-between",
				isActive ? "bg-brand/5" : "bg-white hover:bg-[#fafafa]"
			)}
		>
			<div
				className={cn(
					"min-h-full min-w-1 rounded-tr-[20px] rounded-br-[20px]",
					isActive ? "bg-brand" : "bg-transparent"
				)}
			/>
			<div className="flex-1 px-6 gap-4 py-4 flex items-center">
				<span className="!size-8 bg-danger text-white center rounded-full uppercase">
					{data.name.at(0)}
				</span>
				<div className="text-[#6B6B6B] text-sm flex flex-col">
					<span className="text-base">{data.name}</span>
					<span>{data.date}</span>
				</div>
			</div>
		</div>
	);
};
