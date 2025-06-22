"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { LuFilter } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";

export default function FilterSidebar({
	isOpen,
	onClose,
	children,
	applyFilters,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	applyFilters: () => void;
}) {
	return (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/20 z-40"
					onClick={onClose}
				/>
			)}

			<div
				className={`fixed right-0 top-0 h-full rounded-l-md w-[412px] bg-white transform transition-transform duration-300 z-50 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-2xl text-heading-light flex items-center gap-x-1 font-semibold">
						<CiFilter className="size-6 mt-1" /> Filters
					</h2>
					<Button
						variant={"outline"}
						size={"icon"}
						onClick={onClose}
						className="rounded-full"
					>
						<X className="size-6 text-gray-500" />
					</Button>
				</div>
				<div className="overflow-y-auto bg-[#BBBBBB]/10 flex-1 min-h-[80%] max-h-[80%]">
					{children}
				</div>
				<div
					style={{ boxShadow: "0 -4px 6px -4px rgba(0, 0, 0, 0.1)" }}
					className="absolute bottom-0 p-4 inset-x-0 flex justify-between items-center"
				>
					<Button
						onClick={() => {
							applyFilters();
							onClose();
						}}
					>
						Apply Filters
					</Button>
					<Button variant={"ghost"} onClick={onClose}>
						Cancel
					</Button>
				</div>
			</div>
		</>
	);
}
