"use client";

import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { HotTable, HotTableProps, HotTableClass } from "@handsontable/react";
import Handsontable from "handsontable";
import { HyperFormula } from "hyperformula";
import type { CellChange, ChangeSource } from "handsontable/common";
import "handsontable/dist/handsontable.full.min.css";
import "@/css/handsonTable.css";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Info, X } from "lucide-react";
import { Button } from "./ui/button";

export type GenericHandsonProps = Omit<HotTableProps, "data"> & {
	data: Handsontable.CellValue[][];
	onDataChange?: (data: Handsontable.CellValue[][]) => void;
	instructions: string[];
};

const GenericHandson: React.FC<GenericHandsonProps> = ({
	data,
	onDataChange,
	instructions,
	...rest
}) => {
	const hotTableRef = useRef<HotTableClass>(null);

	const handleAfterChange = (
		changes: CellChange[] | null,
		source: ChangeSource
	): void => {
		if (!changes || source === "loadData" || !onDataChange) return;

		const instance = hotTableRef.current?.hotInstance;
		if (!instance) return;

		onDataChange(instance.getData());
	};

	return (
		<HotTable
			ref={hotTableRef}
			data={data}
			colHeaders
			rowHeaders
			className="flex-1"
			height={500}
			licenseKey="non-commercial-and-evaluation"
			formulas={{ engine: HyperFormula }}
			stretchH="all"
			autoWrapRow
			autoWrapCol
			fixedRowsTop={instructions.length + 1}
			contextMenu
			undo
			afterChange={handleAfterChange}
			minRows={100}
			colWidths={160}
			cells={(row, col): Partial<Handsontable.CellProperties> => {
				const cellProperties: Partial<Handsontable.CellProperties> = {};

				if (row < instructions.length) {
					cellProperties.readOnly = true;
					cellProperties.className = "instruction-cell";
				} else if (row === instructions.length) {
					cellProperties.readOnly = true;
					cellProperties.className = "heading";
				}

				return cellProperties;
			}}
			{...rest}
		/>
	);
};

export default GenericHandson;

export const handsonToJson = (
	sheetData: Handsontable.CellValue[][],
	instructions: string[]
) => {
	const allData = sheetData;
	const headerRowIndex = instructions.length;
	const headers = allData[headerRowIndex] as string[];
	const dataRows = allData.slice(headerRowIndex + 1);

	const result = dataRows
		.filter((row) => row.some((cell) => cell !== null && cell !== ""))
		.map((row) => {
			const obj: Record<string, any> = {};
			headers.forEach((header, i) => {
				obj[header] = row[i];
			});
			return obj;
		});

	return result;
};

export const ErrorModal: FC<{
	errors: string[];
	open: boolean;
	onOpenChange: (val: boolean) => void;
	setErrors: Dispatch<SetStateAction<string[]>>;
}> = ({ errors, onOpenChange, open, setErrors }) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="p-0 rounded-md min-w-[640px] max-w-[640px] z-[100]">
				<DialogHeader>
					<DialogTitle className="border-b h-[88px] text-[#474747] flex items-center justify-between px-6 text-2xl gap-x-3">
						<span className="flex items-center gap-x-3">
							<Info className="text-warning size-6" /> Bulk Import
							error
						</span>
						<DialogClose asChild>
							<Button
								onClick={() => setErrors([])}
								variant={"outline"}
								size={"icon"}
								className="rounded-full"
							>
								<X />
							</Button>
						</DialogClose>
					</DialogTitle>
					<DialogDescription className="px-6 pt-4 text-base text-[#6B6B6B]">
						The following issues were found in the data of bulk
						import
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-y-4 px-6 overflow-y-auto min-h-[300px] max-h-[300px]">
					{errors.map((error, i) => (
						<div
							key={i}
							className="px-6 py-4 gap-x-4 rounded-[8px] bg-danger/10 flex items-start"
						>
							<Info className="text-danger min-h-6 min-w-6 size-6" />
							<span className="font-semibold text-base text-[#474747]">
								{error}
							</span>
						</div>
					))}
				</div>
				<DialogFooter className="px-6 py-4 border-t">
					<DialogClose asChild>
						<Button onClick={() => setErrors([])} variant="ghost">
							Close
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={() => setErrors([])}
							className="ml-auto"
						>
							Okay
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
