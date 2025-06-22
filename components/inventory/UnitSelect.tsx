"use client";

import { FC, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Check, ChevronDown, X } from "lucide-react";
import { TrashIcon } from "@/assets/svgIcons/CustomIcons";
import { cn } from "@/lib/utils";
import { CreateItemFormType, InventoryUnit } from "@/types/inventory-types";
import { FormikProps } from "formik";

interface UnitSelectProps {
	unitType: "item" | "service";
	value?: string;
	onChange: (val: string) => void;
	initialUnits: InventoryUnit[];
	className?: string;
	formik: FormikProps<CreateItemFormType>;
}

const UnitSelect: FC<UnitSelectProps> = ({
	unitType,
	value,
	onChange,
	initialUnits,
	className,
	formik,
}) => {
	const [units, setUnits] = useState<InventoryUnit[]>(initialUnits);
	const [open, setOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const [shortForm, setShortForm] = useState("");
	const [fullForm, setFullForm] = useState("");

	const handleAddUnit = () => {
		if (!shortForm.trim() || !fullForm.trim()) return;

		const newUnit: InventoryUnit = {
			id: Math.random().toString(),
			unit: shortForm.trim().toUpperCase(),
			name: fullForm.trim(),
			initial: false,
		};

		formik.setFieldValue("unitId", newUnit.id);

		setUnits([newUnit, ...units]);
		onChange(newUnit.unit);
		setShortForm("");
		setFullForm("");
		setDialogOpen(false);
		setOpen(false);
	};

	const handleDelete = (unit: string) => {
		setUnits((prev) => prev.filter((u) => u.unit !== unit));
		if (value === unit) {
			onChange(""); // reset if selected item is deleted
		}
	};

	const unitId = formik.values.unitId;
	const isSelected = typeof unitId === "string" && unitId.length > 0;

	// Close dropdown on outside click
	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!containerRef.current?.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<>
			{/* Trigger */}
			<div className={cn("relative w-1/2", className)} ref={containerRef}>
				<Button
					type="button"
					variant="outline"
					className={`w-full justify-between hover:bg-white font-normal ${
						isSelected
							? "text-[#474747] hover:text-[#474747]"
							: "text-[#B3B3B3] hover:text-[#B3B3B3]"
					}`}
					onClick={() => setOpen(!open)}
				>
					{isSelected
						? units.find((u) => u.id === unitId)?.unit +
						  " - " +
						  units.find((u) => u.id === unitId)?.name
						: "Select unit"}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>

				{/* Dropdown */}
				{open && (
					<div
						ref={dropdownRef}
						className="fixed left-1/3 top-1/4 z-50 mt-1 w-[521px] rounded-md border bg-white shadow-md max-h-2/3 overflow-y-auto"
					>
						{/* Add New */}
						<div
							onClick={() => {
								setDialogOpen(true);
								setOpen(false);
							}}
							className="px-4 py-2 w-fit ml-auto text-blue-600 hover:bg-blue-50 cursor-pointer text-sm font-medium"
						>
							+ New unit
						</div>

						{/* Unit List */}
						{units.map((u) => (
							<div
								key={u.unit}
								className="px-4 py-2 border-t h-[56px] flex items-center hover:bg-gray-100 cursor-pointer text-sm"
								onClick={() => {
									formik.setFieldValue("unitId", u.id);

									onChange(u.unit);
									setOpen(false);
									console.log(formik.values.unitId);
								}}
							>
								{!u.initial && (
									<TrashIcon
										onClick={(e) => {
											e.stopPropagation();
											handleDelete(u.unit);
										}}
										className="mr-3 size-5 text-red-500 hover:text-red-700"
									/>
								)}
								<span>
									{u.unit} - {u.name}
								</span>
								{u.id === unitId && (
									<Check className="mr-3 ml-auto size-5 text-light-200 hover:text-light-200" />
								)}
							</div>
						))}
					</div>
				)}
			</div>

			{/* Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="p-0 rounded-none">
					<DialogHeader>
						<DialogTitle className="px-6 py-4 border-b flex justify-between items-center">
							<span>New {unitType} Unit</span>
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
						<DialogDescription className="px-6">
							Add a new unit of your preference.
						</DialogDescription>
					</DialogHeader>
					<div className="flex gap-x-4 mt-4 px-6">
						<div className="flex flex-col gap-y-2 w-1/3">
							<span>Short form</span>
							<Input
								placeholder={
									unitType === "item" ? "e.g. KG" : "e.g. HRS"
								}
								value={shortForm}
								onChange={(e) => setShortForm(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-y-2 flex-1">
							<span>Full form</span>
							<Input
								placeholder={
									unitType === "item"
										? "e.g. Kilogram"
										: "e.g. Hours"
								}
								value={fullForm}
								onChange={(e) => setFullForm(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter className="mt-6 py-4 px-6 border-t">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button className="ml-auto" onClick={handleAddUnit}>
							Add Unit
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UnitSelect;
