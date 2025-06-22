"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown, Plus } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ComboBoxItem = {
	id: string;
	label: string;
};

interface RecordComboboxProps {
	items: ComboBoxItem[];
	value: string | null;
	onChange: (value: string) => void;
	onCreateNew: () => void;
	renderItem: (item: ComboBoxItem) => React.ReactNode;
	placeholder?: React.ReactNode;
	searchPlaceholder?: string;
	popoverClassName?: string;
	createNewText?: string;
	triggerClassName?: string;
}

export function RecordCombobox({
	items,
	value,
	onChange,
	onCreateNew,
	renderItem,
	placeholder = "Select if applicable",
	searchPlaceholder = "Search...",
	popoverClassName,
	createNewText = "Create New",
	triggerClassName,
}: RecordComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const selectedItem = items.find((item) => item.id === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn("flex-1 justify-between", triggerClassName)}
				>
					{selectedItem ? (
						renderItem(selectedItem)
					) : (
						<span className="text-muted-foreground">
							{placeholder}
						</span>
					)}
					{!triggerClassName && (
						<ChevronDown className="ml-2 size-4" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("min-w-[360px] flex-1 p-0", popoverClassName)}
			>
				<Command>
					<CommandInput
						placeholder={searchPlaceholder}
						className="placeholder:italic"
					/>
					<CommandList>
						<CommandEmpty>No results found</CommandEmpty>
						<CommandGroup>
							<div className="max-h-[168px] overflow-y-auto">
								{items.map((item) => (
									<CommandItem
										key={item.id}
										value={item.label}
										onSelect={() => {
											onChange(item.id);
											setOpen(false);
										}}
										className="!h-14 px-4 border-b rounded-none"
									>
										{renderItem(item)}
										{value === item.id && (
											<Check className="ml-auto size-4" />
										)}
									</CommandItem>
								))}
							</div>
						</CommandGroup>
						<CommandItem
							asChild
							onSelect={() => {
								setOpen(false);
								onCreateNew();
							}}
						>
							<Button
								variant="ghost"
								className="w-full justify-start !h-14 border-t font-bold rounded-none"
							>
								<Plus className="mr-2 ml-4 size-4 stroke-3 text-brand hover:text-brand" />
								<span className="text-brand hover:!text-brand">
									{createNewText}
								</span>
							</Button>
						</CommandItem>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
