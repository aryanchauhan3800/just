import InfoCard from "@/components/inventory/InfoCard";
import { InfoCardType } from "@/types/inventory-types";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { RupeeIcon } from "@/assets/svgIcons/CustomIcons";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import RecordIncome from "@/components/income/RecordIncome";
import IncomeTable from "@/components/income/IncomeTable";

const page: FC = () => {
	const MockCardData: InfoCardType[] = [
		{
			title: "Total income",
			TitleIcon: HiOutlineBanknotes,
			titleColor: "#22B947",
			value: "₹ 00.00",
			FooterIcon: BiSolidUpArrow,
			footerIconText: "0%",
			footerText: "higher than last week",
		},
		{
			title: "Income other than Sales",
			TitleIcon: RiMoneyRupeeCircleLine,
			titleColor: "#FAAD14",
			value: "₹ 00.00",
			FooterIcon: BiSolidDownArrow,
			footerIconText: "0%",
			footerText: "lower than last week",
		},
		{
			title: "Income in last 30 days",
			TitleIcon: RupeeIcon,
			titleColor: "#D400FF",
			value: "₹ 00.00",
			FooterIcon: BiSolidUpArrow,
			footerIconText: "0%",
			footerText: "higher than last month",
		},
		{
			title: "Income Frequency in 30 days",
			TitleIcon: IoIosInformationCircleOutline,
			titleColor: "#F5222D",
			value: "00 times",
			FooterIcon: BiSolidDownArrow,
			footerIconText: "0%",
			footerText: "lower than last month",
		},
	];
	return (
		<div className="flex-1 h-full space-y-5">
			{/* heading and info cards */}
			<div className="flex-1 flex flex-col h-[200px] bg-white m-5 rounded p-5">
				{/* heading with btns */}
				<div className="flex justify-between h-10 items-center">
					<h2 className="text-2xl font-medium text-[#474747]">
						Income
					</h2>
					<div className="flex gap-x-4 items-center">
						<Link
							href={"/income"}
							className={buttonVariants({
								variant: "outline",
								className: "text-[#474747]",
							})}
						>
							Sales-Expense Reports
							<LuSquareArrowOutUpRight className="size-4 text-[#6B6B6B]" />
						</Link>
						<RecordIncome />
					</div>
				</div>
				{/* cards */}
				<div className="flex-1 h-full grid grid-cols-4 gap-x-5 items-end">
					{MockCardData.map((card, i) => (
						<InfoCard key={i} {...card} />
					))}
				</div>
			</div>
			{/* table */}
			<IncomeTable />
		</div>
	);
};

export default page;
