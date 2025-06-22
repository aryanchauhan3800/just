"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/button";
import { ChevronLeft, Trash } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface EditItemFormProps {}

const EditItemForm: FC<EditItemFormProps> = ({}) => {
	const router = useRouter();
	return (
		<div className="flex flex-col">
			{/* header */}
			<div className="flex justify-between items-center min-h-[64px] px-5 bg-white border-b border-[#E8E8E8]">
				<div className="flex gap-x-5 items-center">
					<Button
						onClick={() => router.back()}
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "icon",
							}),
							"text-[#474747] rounded-full"
						)}
					>
						<ChevronLeft className="text-[#8f8f8f] size-6" />
					</Button>

					<h2 className="text-xl text-[#474747]">
						Edit Item Details
					</h2>
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
							<DropdownMenuLabel>Action</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className="flex items-center gap-x-2 py-2 flex-1 text-danger">
									<Trash className="size-6" /> Remove Product
									from All
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default EditItemForm;
