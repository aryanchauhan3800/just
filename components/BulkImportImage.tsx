"use client";
import Image from "next/image";
import { FC } from "react";
import bulk_import_table from "@/assets/svgs/bulk-import-table.svg";

interface BulkImportImageProps {
	description: string;
}

const BulkImportImage: FC<BulkImportImageProps> = ({ description }) => {
	return (
		<div className="flex-1 max-h-[120px] min-h-[120px] px-14 rounded-md overflow-hidden flex justify-between items-start bg-gradient-to-b from-[#A5DFBE] to-[#F7F8F7]">
			<div className="flex flex-col gap-y-2 h-full justify-center">
				<span className="text-success font-semibold text-4xl capitalize">
					Bulk Import
				</span>
				<span className="text-sm text-[#474747]">{description}</span>
			</div>
			<Image
				alt="Bulk import table image"
				width={600}
				height={600}
				src={bulk_import_table}
				className="w-[240px] h-[152px] mt-"
			/>
		</div>
	);
};

export default BulkImportImage;
