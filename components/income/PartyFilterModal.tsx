"use client";
import { FC, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogClose,
	DialogFooter,
	DialogDescription,
	DialogTitle,
	DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import { FiSearch } from "react-icons/fi";

type Party = {
	id: string;
	name: string;
};

interface PartyFilterModalProps {
	trigger: React.ReactNode;
	onSubmit: (selected: Party[]) => void;
	parties: Party[];
}

const PartyFilterModal: FC<PartyFilterModalProps> = ({
	onSubmit,
	parties,
	trigger,
}) => {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const toggleSelection = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const handleSubmit = () => {
		const selected = parties.filter((p) => selectedIds.has(p.id));
		onSubmit(selected);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="p-0 rounded !w-[560px]">
				<DialogHeader className="h-fit">
					<DialogTitle className="flex items-center justify-between border-b px-6 py-4">
						<span className="flex gap-x-3">Filter by Party</span>
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
						Select Party's to view Incomes from them
					</DialogDescription>
				</DialogHeader>

				<div className="overflow-y-hidden flex flex-col px-5 gap-y-4">
					<div className="flex items-center rounded-full ring-1 ring-gray-300 !w-[80%] mt-1 px-3 py-2 h-12">
						<FiSearch className="size-4 text-light-100" />
						<Input
							placeholder="Search by party name..."
							className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-light-100 placeholder:text-lg placeholder:italic"
						/>
					</div>
					<div className="flex-col border flex max-h-[320px] overflow-y-auto">
						{parties.map((party, i) => (
							<div
								key={i}
								className={cn(
									"flex items-center h-[52px] gap-3 px-4",
									i > 0 ? "border-t" : ""
								)}
							>
								<Checkbox
									checked={selectedIds.has(party.id)}
									onCheckedChange={() =>
										toggleSelection(party.id)
									}
								/>
								<div
									className={cn(
										"rounded-full w-6 h-6 flex items-center justify-center text-white bg-danger font-bold"
									)}
								>
									{party.name.charAt(0)}
								</div>
								<span className="text-sm text-heading-light">
									{party.name}
								</span>
							</div>
						))}
					</div>
				</div>

				<DialogFooter className="h-fit px-6 py-4 border-t mt-auto">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							onClick={handleSubmit}
							disabled={selectedIds.size < 1}
							className="ml-auto"
						>
							Show Income <ChevronRight />
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PartyFilterModal;
