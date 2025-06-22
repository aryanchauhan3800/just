"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "@/assets/svgIcons/CustomIcons";
import { cn } from "@/lib/utils";
import { PiUploadSimpleFill } from "react-icons/pi";

type ImageType = { src: string; alt?: string };

export default function SmallCarousel({ images }: { images: ImageType[] }) {
	const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

	const handleImageError = (idx: number) => {
		setBrokenImages((prev) => new Set(prev).add(idx));
	};

	return (
		<Carousel
			opts={{ align: "start", dragFree: true }}
			className="max-w-full h-[120px] bg-white"
		>
			<CarouselContent>
				{images.map((img, idx) => (
					<CarouselItem
						key={idx}
						className="basis-auto grow-0 shrink-0 items-end flex"
					>
						<div
							className={cn(
								"rounded-md flex items-center justify-center size-[120px] relative",
								images.length === idx + 1 ? "mr-5" : "",
							)}
						>
							{brokenImages.has(idx) ? (
								<div className="flex justify-center items-center flex-1 h-full rounded-md bg-[#fafafa] text-[#fafafa] border border-[#8F8F8F] border-dashed cursor-pointer">
									<PiUploadSimpleFill className="text-[#8F8F8F]" />
								</div>
							) : (
								<Image
									src={img.src}
									alt={img.alt || `Thumb ${idx + 1}`}
                                    fill
									// width={120}
									// height={120}
									className="object-cover bg-white size-[100px] border border-[#E8E8E8] rounded-md"
									onError={() => handleImageError(idx)}
								/>
							)}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
