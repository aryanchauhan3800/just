"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";


import Image, { StaticImageData } from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { AiOutlineCheck } from "react-icons/ai";
import { X } from "lucide-react";

interface CustomModalProps {
	open: boolean;
	setOpenAction: (value: boolean) => void;
	showImage?: boolean;
	imageUrl?: string | StaticImageData;
	message: string;
	onClose?: () => void;
	showAgain: boolean;
	setShowAgainAction: (value: boolean) => void;
	className?: string;
}

export const CustomModal = ({
	open,
	setOpenAction,
	showImage = false,
	imageUrl,
	message,
	onClose,
	showAgain,
	setShowAgainAction,
	className,
}: CustomModalProps) => {
	useEffect(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
			<div
				className={cn(
					"bg-white relative rounded-lg shadow-xl w-[90%] max-w-[720px] overflow-hidden",
					className
				)}
			>
				{/* Close button */}
				<Button
					variant={"outline"}
					className="absolute top-5 rounded-full right-5 text-gray-500 hover:text-black"
					onClick={() => {
						setOpenAction(false);
						onClose?.();
					}}
				>
					<X />
				</Button>

				{/* Optional Image */}
				{showImage && imageUrl && (
					<div className="w-full h-[250px] relative">
						<Image
							src={imageUrl}
							alt="Popup Header"
							fill
							className="object-cover"
						/>
					</div>
				)}

				{/* Lottie + Message */}
				<div className="flex flex-col items-center justify-center p-6">
					
					<p className="text-xl font-semibold text-center">
						{message}
					</p>
				</div>

				{/* Footer */}
				<div className="border-t p-4 flex items-center justify-between text-sm">
					<label className="flex items-center space-x-2">
						<Checkbox
							checked={showAgain}
							onCheckedChange={(val) => setShowAgainAction(!!val)}
						/>
						<span>Don't show me again</span>
					</label>

					<Button
						variant={"ghost"}
						className="text-base"
						onClick={() => {
							if (onClose) onClose();
							setOpenAction(false);
						}}
					>
						<AiOutlineCheck className="size-4" strokeWidth={50} />{" "}
						Done
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
