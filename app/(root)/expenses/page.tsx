import InfoCard  from "@/components/inventory/InfoCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { RupeeIcon } from "@/assets/svgIcons/CustomIcons";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import ExpenseTable from "@/components/expenses/ExpenseTable";
import RecordExpense from "@/components/expenses/RecordExpense";
import { InfoCardType } from "@/types/inventory-types";

const page: FC = () => {
	const MockCardData: InfoCardType[] = [
		{
			title: "Total expense",
			TitleIcon: HiOutlineBanknotes,
			titleColor: "#22B947",
			value: "₹ 00.00",
			FooterIcon: BiSolidUpArrow,
			footerIconText: "0%",
			footerText: "higher than last week",
		},
		{
			title: "Expense other than Purchase",
			TitleIcon: RiMoneyRupeeCircleLine,
			titleColor: "#FAAD14",
			value: "₹ 00.00",
			FooterIcon: BiSolidDownArrow,
			footerIconText: "0%",
			footerText: "lower than last week",
		},
		{
			title: "Expenses in last 30 days",
			TitleIcon: RupeeIcon,
			titleColor: "#D400FF",
			value: "₹ 00.00",
			FooterIcon: BiSolidUpArrow,
			footerIconText: "0%",
			footerText: "higher than last month",
		},
		{
			title: "Expense Frequency in 30 days",
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
						Expenses
					</h2>
					<div className="flex gap-x-4 items-center">
						<Link
							href={"/expenses"}
							className={buttonVariants({
								variant: "outline",
								className: "text-[#474747]",
							})}
						>
							Sales-Expense Reports
							<LuSquareArrowOutUpRight className="size-4 text-[#6B6B6B]" />
						</Link>
						<RecordExpense />
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
			<ExpenseTable />
		</div>
	);
};

export default page;
