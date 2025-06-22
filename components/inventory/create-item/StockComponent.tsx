"use client";
import { Input } from "@/components/ui/input";
import { CreateItemFormType, Warehouse } from "@/types/inventory-types";
import { FormikProps } from "formik";
import { FC, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { PiWarehouse } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import BatchProcess from "../BatchProcessing";

interface StockComponentProps {
	formik: FormikProps<CreateItemFormType>;
}

const StockComponent: FC<StockComponentProps> = ({ formik }) => {
	const [asOfDate, setAsOfDate] = useState<Date>();
	const [warehouses, setWarehouses] = useState<Warehouse[]>([
		{
			id: 1,
			name: "Raigarh",
			address: "123 Havildar Street, opp Ordinance",
			isSelected: false,
			batchName: "",
			quantity: "",
			lowStockAlert: "",
		},
		{
			id: 2,
			name: "Pratapgarh",
			address: "42-7 Bleeker Street, Mahavir Singh Colony",
			isSelected: true,
			batchName: "BT-000001",
			quantity: "",
			lowStockAlert: "",
		},
		{
			id: 3,
			name: "Zamin Zilla",
			address: "42 Mall Road, opp Netaji bose lane",
			isSelected: false,
			batchName: "",
			quantity: "",
			lowStockAlert: "",
		},
	]);

	const toggleWarehouse = (id: number) => {
		setWarehouses((prev) =>
			prev.map((w) =>
				w.id === id ? { ...w, isSelected: !w.isSelected } : w
			)
		);
	};

	const updateWarehouse = (
		id: number,
		field: keyof Warehouse,
		value: string
	) => {
		setWarehouses((prev) =>
			prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
		);
	};
	return (
		<div className="space-y-6">
			<h2 className="text-2xl text-[#474747] font-medium">
				Enter Stock & Inventory details
			</h2>
			<div className="flex flex-col gap-y-5 pr-20">
				{/* opening stock */}
				<div className="flex flex-1">
					<span className="flex justify-between items-center min-w-40">
						<span className="text-danger">* Opening Stock</span>
						<span className="pr-6">:</span>
					</span>
					<Input
						placeholder="₹ Enter Cost Price"
						className="flex-1 bg-white shadow-none border border-[#D6D6D6] rounded placeholder:text-[#B3B3B3]"
					/>
				</div>
				{/* as of date */}
				<div className="flex flex-1">
					<span className="flex justify-between items-center min-w-40">
						<span>
							<span className="text-danger">*</span> as of
						</span>
						<span className="pr-6">:</span>
					</span>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[200px] justify-between text-left font-normal",
									!asOfDate
										? "text-[#B3B3B3]"
										: "text-[#242424]"
								)}
							>
								{asOfDate ? (
									format(asOfDate, "yyyy-MM-dd")
								) : (
									<span>Pick a date</span>
								)}
								<CalendarIcon className="text-[#00000040] size-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={asOfDate}
								onSelect={setAsOfDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<hr />
				{/* warehouses */}
				<div className="flex justify-between items-center flex-1">
					<div className="flex flex-col">
						<div className="flex gap-x-3 items-center">
							<div className="flex items-center gap-x-1 text-[#474747] text-lg">
								<PiWarehouse className="text-[#8F8F8F] size-5" />{" "}
								Warehouses
							</div>
							<span className="text-brand text-sm px-2.5 py-1 bg-brand/5 rounded-full">
								3
							</span>
						</div>
						<p className="text-[#6B6B6B]">
							Divide the items in Stock among warehouses
						</p>
					</div>
					{/* btn */}
					<Button
						variant={"ghost"}
						className="text-brand hover:text-brand"
					>
						<Plus className="size-3" /> New Warehouse
					</Button>
				</div>
				{/* warehouses list */}
				<div className="flex flex-col gap-y-5">
					{warehouses.map((warehouse) => (
						<div key={warehouse.id} className="space-y-2">
							<div className="flex gap-x-5 items-start">
								{/* checkbox */}
								<Checkbox
									className="size-5"
									onClick={() =>
										toggleWarehouse(warehouse.id)
									}
									checked={warehouse.isSelected}
								/>
								<div
									className={`flex flex-1 flex-col p-4 rounded-md ${
										warehouse.isSelected
											? "bg-white ring ring-gray-200"
											: "bg-transparent"
									}`}
								>
									{/* checkbox, name & address */}
									<div className="flex gap-x-3">
										{/* icon */}
										<div className="p-4 h-fit rounded-md bg-[#fafafa] text-[#8F8F8F] flex items-center justify-center">
											<PiWarehouse className="size-4 h-fit" />
										</div>
										{/* warehouse name and address */}
										<div className="flex flex-col flex-1">
											<div className="font-medium text-xl text-[#242424]">
												{warehouse.name}
											</div>
											<div className="text-[#6B6B6B] text-sm">
												{warehouse.address}
											</div>
											{/* form */}
											{warehouse.isSelected && (
												<div className="space-y-4 mt-3 flex gap-x-5">
													<div className="flex max-w-[40%] min-w-[40%] flex-col gap-y-4">
														{/* batch name */}
														<div className="flex-1">
															<Label className="text-sm mb-1">
																Batch Name :
															</Label>
															<div className="relative">
																<span className="absolute top-[0.5px] right-[1px]">
																	<BatchProcess />
																</span>
																<Input
																	className="placeholder:text-[#B3B3B3] pr-10"
																	placeholder="BT-00001"
																	value={
																		warehouse.batchName
																	}
																	onChange={(
																		e
																	) =>
																		updateWarehouse(
																			warehouse.id,
																			"batchName",
																			e
																				.target
																				.value
																		)
																	}
																/>
															</div>
														</div>
														{/* low stock alert */}
														<div className="flex-1 flex flex-col mb-1">
															<Label className="text-sm">
																<span className="text-danger">
																	*
																</span>{" "}
																Low Stock Alert
																:
															</Label>
															<Input
																className="placeholder:text-[#B3B3B3]"
																placeholder="Enter Number"
																type="number"
																value={
																	warehouse.lowStockAlert
																}
																onChange={(e) =>
																	updateWarehouse(
																		warehouse.id,
																		"lowStockAlert",
																		e.target
																			.value
																	)
																}
															/>
														</div>
													</div>
													{/* how many in warehouse */}
													<div className="flex-1">
														<Label className="text-sm mb-1">
															<span className="text-danger">
																*
															</span>{" "}
															How many in this
															warehouse :
														</Label>
														<Input
															className="placeholder:text-[#B3B3B3]"
															type="number"
															placeholder="Enter Number"
															value={
																warehouse.quantity
															}
															onChange={(e) =>
																updateWarehouse(
																	warehouse.id,
																	"quantity",
																	e.target
																		.value
																)
															}
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StockComponent;
