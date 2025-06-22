"use client";
import { FC, useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { PiNutLight } from "react-icons/pi";
import { BatchProcessingIcon } from "@/assets/svgIcons/CustomIcons";

interface BatchProcessProps {}

const BatchProcess: FC<BatchProcessProps> = ({}) => {
	const [expiry, setExpiry] = useState<boolean>(false);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					size={"icon"}
					className="size-[34.5px] rounded bg-[#fafafa]"
				>
					<PiNutLight className="size-4 text-[#8F8F8F]" />
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 rounded-none">
				<DialogHeader className="h-fit">
					<DialogTitle className="flex items-center justify-between border-b px-6 py-4">
						<span className="flex gap-x-3">
							<BatchProcessingIcon className="text-[#8f8f8f]" />{" "}
							Batch Processing
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
					<DialogDescription className="px-6 py-2">
						Customize Batch name as per your preferrence
					</DialogDescription>
				</DialogHeader>

				{/* Dialog body content */}
				<div className="space-y-4 px-6 py-4">
					<div className="flex-1 gap-x-5 flex text-sm">
						<div className="flex w-1/3 gap-y-2 flex-col">
							<span>Batch Prefix :</span>
							<Input placeholder="eg. BT" />
						</div>
						<div className="flex flex-1 gap-y-2 flex-col">
							<span>Batch Number :</span>
							<Input placeholder="eg. 00001" />
						</div>
					</div>
					<hr />
					{/* set product warranty */}
					<div className="flex gap-x-2">
						<span
							onClick={() => setExpiry((prev) => !prev)}
							className={`size-4 mt-1 border-brand border rounded-xs ${
								expiry ? "bg-brand" : "bg-white"
							}`}
						>
							<Check className="size-4 text-white pr-[2px]" />
						</span>
						<div className="flex flex-col flex-1">
							<h3 className="text-[#242424] font-semibold text-base">
								Set Batch Expiry Date
							</h3>
							<p className="text-[#6B6B6B] text-sm">
								Track batch expiry to better manage perishable
								items
							</p>

							<div className="flex flex-1 mt-5">
								<span className="min-w-40 text-sm flex items-center justify-between font-medium pr-5">
									Expiry Period <span>:</span>
								</span>
								<div className="flex flex-1 items-center ring ring-[#D6D6D6] rounded">
									<Input
										placeholder="Enter Expiry Period"
										disabled={!expiry}
										className="flex-1 !border-0 !ring-0 bg-white shadow-none rounded-l placeholder:text-[#B3B3B3]"
									/>
									<Select
										disabled={!expiry}
										defaultValue={"Yrs"}
									>
										<SelectTrigger className="bg-[#fafafa] border-0 shadow-none border-l rounded rounded-l-xs border-[#D6D6D6] text-base font-bold text-[#6B6B6B]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{["Yrs", "Mon"].map((option, i) => (
												<SelectItem
													key={i}
													className="flex-1"
													value={option}
												>
													{option}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="h-fit px-6 py-4 border-t mt-auto">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button className="ml-auto">Update</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default BatchProcess;
