"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie/success.json";
import Image, { StaticImageData } from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { AiOutlineCheck } from "react-icons/ai";
import { X } from "lucide-react";

interface CustomModalProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	showImage?: boolean;
	imageUrl?: string | StaticImageData;
	message: string;
	onClose?: () => void;
	showAgain: boolean;
	setShowAgain: (value: boolean) => void;
	className?: string;
}

export const CustomModal = ({
	open,
	setOpen,
	showImage = false,
	imageUrl,
	message,
	onClose,
	showAgain,
	setShowAgain,
	className,
}: CustomModalProps) => {
	useEffect(() => {
		if (open) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
			{/* Modal Container */}
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
						setOpen(false);
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
					<Lottie
						animationData={animationData}
						className="size-[160px] mb-4"
					/>
					<p className="text-xl font-semibold text-center">
						{message}
					</p>
				</div>

				{/* Footer */}
				<div className="border-t p-4 flex items-center justify-between text-sm">
					<label className="flex items-center space-x-2">
						<Checkbox
							checked={showAgain}
							onCheckedChange={(val) => setShowAgain(!!val)}
						/>
						<span>Don't show me again</span>
					</label>

					<Button
						variant={"ghost"}
						className="text-base"
						onClick={() => {
							if (onClose) onClose();
							setOpen(false);
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
