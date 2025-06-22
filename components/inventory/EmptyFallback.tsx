import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";
import emptyInventory from "@/assets/svgs/empty-inventory.svg";

const EmptyFallback: FC<{
	text?: string;
	linkText?: string;
	url?: string;
}> = ({
	linkText = "Add Item",
	text = "Inventory Empty",
	url = "/inventory/create-item",
}) => {
	return (
		<div className="flex flex-col justify-center items-center h-[456px] flex-1">
			<Image
				alt="Empty inventory image"
				src={emptyInventory}
				width={300}
				height={200}
				className="h-[59.5px] w-[97.2px]"
			/>
			<span className="text-sm text-[#6B6B6B] mb-5">{text}</span>
			<Link
				href={url}
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"text-brand hover:text-brand text-base"
				)}
			>
				<Plus />
				{linkText}
			</Link>
		</div>
	);
};

export default EmptyFallback;
