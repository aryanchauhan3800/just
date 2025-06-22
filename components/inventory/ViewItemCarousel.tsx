"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";
import { PiUploadSimpleBold } from "react-icons/pi";
import { ImageIcon } from "@/assets/svgIcons/CustomIcons";

type ImageType = { src: string; alt?: string };

export default function ViewItemCarousel({ images }: { images: ImageType[] }) {
	const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
	const [thumbApi, setThumbApi] = useState<CarouselApi | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

	const handleImageError = (idx: number) => {
		setBrokenImages((prev) => new Set(prev).add(idx));
	};

	useEffect(() => {
		if (!mainApi) return;

		const onSelect = () => {
			const index = mainApi.selectedScrollSnap();
			setCurrentIndex(index);
			// Scroll thumbnail carousel to visible if needed
			if (thumbApi) thumbApi.scrollTo(index);
		};

		mainApi.on("select", onSelect);
		onSelect();

		return () => {
			mainApi.off("select", onSelect);
		};
	}, [mainApi, thumbApi]);

	useEffect(() => {
		if (mainApi && currentIndex !== mainApi.selectedScrollSnap()) {
			mainApi.scrollTo(currentIndex);
		}
	}, [currentIndex, mainApi]);

	return (
		<div className="relative flex-1 min-h-[74.4vh] max-h-[74.4vh]">
			<div className="flex justify-center items-center flex-1">
				<Carousel
					setApi={setMainApi}
					opts={{ loop: false, align: "center" }}
					className="w-[320px]"
				>
					<CarouselContent className="aspect-square">
						{images.map((img, idx) => (
							<CarouselItem
								key={idx}
								className="flex items-center justify-center"
							>
								<div className="relative size-[320px]">
									{brokenImages.has(idx) ? (
										<div className="flex items-center justify-center h-full w-full p-2 bg-white">
											<div className="h-full w-full rounded flex flex-col gap-2 justify-center items-center border-dashed border border-brand bg-brand/5">
												<PiUploadSimpleBold className="size-5 text-brand" />
												<div className="flex gap-1 items-center">
													<span className="text-[#6B6B6B] text-sm">
														Upload item Photo
													</span>
													<span className="text-brand font-medium text-base">
														Click here
													</span>
												</div>
											</div>
										</div>
									) : (
										<Image
											src={img.src}
											alt={img.alt || `Image ${idx + 1}`}
											fill
											className="object-contain bg-white"
											onError={() =>
												handleImageError(idx)
											}
										/>
									)}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>

			{/* Thumbnails */}
			<Carousel
				opts={{ align: "start", dragFree: true }}
				setApi={setThumbApi}
				className="max-w-full absolute bottom-0 inset-x-0 h-[156px] bg-white border-t pt-2"
			>
				<CarouselContent className="pl-10">
					{images.map((img, idx) => (
						<CarouselItem
							key={idx}
							className="basis-auto grow-0 shrink-0 items-end flex"
							onClick={() => setCurrentIndex(idx)}
						>
							<div
								className={cn(
									"rounded-md cursor-pointer flex items-center justify-center",
									images.length === idx + 1 ? "mr-10" : "",
									currentIndex === idx
										? "size-[120px] border-brand border rounded-md p-1"
										: "size-[100px]"
								)}
							>
								{brokenImages.has(idx) ? (
									<div className="flex justify-center items-center flex-1 h-full rounded bg-[#fafafa] text-[#fafafa] border border-[#8F8F8F] border-dashed">
										<ImageIcon />
									</div>
								) : (
									<Image
										src={img.src}
										alt={img.alt || `Thumb ${idx + 1}`}
										width={100}
										height={100}
										className={cn(
											"object-cover bg-white",
											currentIndex === idx
												? "size-[120px]"
												: "size-[100px]"
										)}
										onError={() => handleImageError(idx)}
									/>
								)}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
