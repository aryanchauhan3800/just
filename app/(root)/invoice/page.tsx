"use client";

import InfoStrip from "@/components/InfoStrip";
import TableWithControls from "@/components/TableWithControls";
import Customtable from "@/components/Customtable";
import InvoiceFilters from "@/components/invoice-components/InvoiceFilters";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Invoice,
	StripItem,
	InvoiceFiltersState,
} from "@/types/dashboardAndInvoiceTypes";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LuBadgePercent, LuBox } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGetInvoice, useGetInvoiceAttributes } from "@/hooks/useInvoice";

export default function Page() {

	const invoices: Invoice[] = [
		{
			invoiceNumber: "INV-000100",
			name: "Ashok Srivastav",
			avatarColor: "#FF5A5F",
			avatarInitial: "A",
			createdOn: "12-Jan-2025",
			invoiceAmount: "80,000",
			dueAmount: "24,000",
			dueDate: "12-Apr-2025",
			status: "Overdue"
		},
		{
			invoiceNumber: "INV-000101",
			name: "Akansha Mehra",
			avatarColor: "#00D2FF",
			avatarInitial: "A",
			createdOn: "15-Jan-2025",
			invoiceAmount: "1,20,000",
			dueAmount: "50,000",
			dueDate: "15-Apr-2025",
			status: "Partially Paid"
		},
		{
			invoiceNumber: "INV-000102",
			name: "Prabir Joshi",
			avatarColor: "#32CD32",
			avatarInitial: "P",
			createdOn: "18-Jan-2025",
			invoiceAmount: "95,000",
			dueAmount: "0",
			dueDate: "18-Apr-2025",
			status: "Paid"
		},
		{
			invoiceNumber: "INV-000103",
			name: "Balwant Singh Joshi",
			avatarColor: "#FFD700",
			avatarInitial: "B",
			createdOn: "20-Jan-2025",
			invoiceAmount: "75,000",
			dueAmount: "75,000",
			dueDate: "20-Apr-2025",
			status: "Due"
		},
	];

	// Define the filters state and its setter
	const [filters, setFilters] = useState<InvoiceFiltersState>({
		showInvoices: {
			paid: true,
			partiallyPaid: true,
			due: true,
			overdue: true,
			draft: true,
		},
		showRecurring: false,
		upcomingDueDates: "",
		showInvoicesCreated: "",
		dueAmountWise: "showAll",
		search: "",
		// status: { active: true, inactive: true }, // Removed because not in InvoiceFiltersState type
	});
	const [queryParams, setQueryParams] = useState({
		pageSize: 10,
		pageNumber: 1,
		sort: "oldToLatest"
	})
	const { data, isLoading } = useGetInvoice(filters, queryParams)
	const { data: attributesData, isLoading: isAttributeLoading } = useGetInvoiceAttributes(filters)
	const items: StripItem[] = [
		{
			title: "Total Invoice Value",
			icon: HiOutlineBanknotes,
			all: true,
			color: "border-l-green-500",
			value: attributesData?.totalInvoice?.value || '0',
			percentage: attributesData?.totalInvoice?.changeInPercentage || '0',
			isUpwardTred: attributesData?.totalInvoice?.change >= 0,
			isDownwardTred: attributesData?.totalInvoice?.change < 0,
			alert: true
		},
		{
			title: "Due in next 30 days",
			icon: RiMoneyRupeeCircleLine,
			all: true,
			color: "border-l-yellow-500",
			value: attributesData?.totalDue?.value || '0',
			percentage: attributesData?.totalDue?.changePercentage || '0',
			isUpwardTred: attributesData?.totalDue?.changePercentage >= 0,
			isDownwardTred: attributesData?.totalDue?.changePercentage < 0,
			alert: true
		},
		{
			title: "Average time to get paid",
			icon: LuBox,
			all: true,
			color: "border-l-purple-500",
			value: attributesData?.averagePaidTime?.value || '0',
			percentage: attributesData?.averagePaidTime?.changePercentage || '0',
			isUpwardTred: attributesData?.averagePaidTime?.changePercentage >= 0,
			isDownwardTred: attributesData?.averagePaidTime?.changePercentage < 0,
			alert: true
		},
		{
			title: "Overdue Payment",
			icon: LuBadgePercent,
			all: true,
			color: "border-l-red-500",
			value: attributesData?.overduePayment?.value || '0',
			percentage: attributesData?.overduePayment?.changePercentage || '0',
			isUpwardTred: attributesData?.overduePayment?.changePercentage >= 0,
			isDownwardTred: attributesData?.overduePayment?.changePercentage < 0,
			alert: true
		},
	];

	const [expandedSections, setExpandedSections] = useState({
		status: true,
		recurring: false,
		dueDates: false,
		createdDates: false,
		dueAmount: false,
		upcomingDueDates: false,
		showInvoicesCreated: false,
		dueAmountWise: false,
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// Add applyFilters and cancelFilters handlers
	const applyFilters = () => {
		// You can add logic here to fetch or filter data based on filters
		setIsFilterOpen(false);
	};

	const cancelFilters = () => {
		// Optionally reset filters or just close the filter panel
		setIsFilterOpen(false);
	};

	const filterInvoiceData = (query: string, invoice: Invoice) => {
		// const matchesSearch =
		// 	invoice?.name?.toLowerCase().includes(query.toLowerCase()) ||
		// 	invoice?.invoiceNumber?.toLowerCase().includes(query.toLowerCase());
		// let filtersData = {...filters}
		// if(query){
		// 	filtersData.search = query
		// 	setFilters(filtersData)
		// }
		const status = invoice?.status?.toLowerCase();
		const statusMatches =
			status === "paid" ||
			status === "partially paid" ||
			status === "due" ||
			status === "overdue" ||
			status === "draft";

		let dueAmountMatches = true;
		if (filters.dueAmountWise === "lessThan9999") {
			const dueAmount = parseInt(invoice?.dueAmount.replace(/,/g, ""));
			dueAmountMatches = dueAmount < 9999;
		} else if (filters.dueAmountWise === "10000to49999") {
			const dueAmount = parseInt(invoice?.dueAmount.replace(/,/g, ""));
			dueAmountMatches = dueAmount >= 10000 && dueAmount <= 49999;
		}

		let dueDateMatches = true;
		let createdDateMatches = true;

		if (filters.upcomingDueDates) {
			const today = new Date();
			const dueDate = new Date(invoice?.dueDate);

			switch (filters.upcomingDueDates) {
				case "within7Days":
					const sevenDaysFromNow = new Date(today);
					sevenDaysFromNow.setDate(today.getDate() + 7);
					dueDateMatches =
						dueDate >= today && dueDate <= sevenDaysFromNow;
					break;
				case "thisMonth":
					dueDateMatches =
						dueDate.getMonth() === today.getMonth() &&
						dueDate.getFullYear() === today.getFullYear();
					break;
			}
		}

		if (filters.showInvoicesCreated) {
			const today = new Date();
			const createdDate = new Date(invoice?.createdOn);

			switch (filters.showInvoicesCreated) {
				case "within7Days":
					const sevenDaysAgo = new Date(today);
					sevenDaysAgo.setDate(today.getDate() - 7);
					createdDateMatches =
						createdDate >= sevenDaysAgo && createdDate <= today;
					break;
				case "thisMonth":
					createdDateMatches =
						createdDate.getMonth() === today.getMonth() &&
						createdDate.getFullYear() === today.getFullYear();
					break;
			}
		}

		return (
			// matchesSearch &&
			statusMatches &&
			dueAmountMatches &&
			dueDateMatches &&
			createdDateMatches
		);
	};

	const router = useRouter();

	const handleNewInvoice = () => {
		router.push("/invoice/new");
	};

	const [showInfoStrip, setShowInfoStrip] = useState(true);
	const lastScrollTop = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;

			if (currentScroll > lastScrollTop.current) {
				// Scrolling down
				setShowInfoStrip(false);
			} else if (currentScroll < lastScrollTop.current) {
				// Scrolling up
				setShowInfoStrip(true);
			}

			lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="flex flex-col h-full p-4 space-y-6">
			<Card className="flex flex-col justify-between bg-white border-none shadow-none p-4">
				<div className="flex flex-row justify-between items-center">
					<h1 className="text-2xl text-gray-800">Invoices</h1>
					<div className="flex items-center gap-2">
						<Link
							href={"/invoice/bulk-import"}
							className={cn(
								buttonVariants({ variant: "outline" })
							)}
						>
							<MdOutlineFileUpload />
							Bulk Upload
						</Link>
						<Button variant="primary" onClick={handleNewInvoice}>
							<span className="text-xl">+</span>New Invoice
						</Button>
					</div>
				</div>
				<div
					className={`transition-all duration-300 sticky top-0 z-10 bg-white ${showInfoStrip
						? "max-h-[500px] opacity-100"
						: "max-h-0 opacity-0 overflow-hidden"
						}`}
				>
					<InfoStrip items={items} />
				</div>
			</Card>

			<Card className="border-none shadow-none p-4">
				<TableWithControls
					data={data?.docs || []}
					columns={[
						"Client / Company",
						"Created on",
						"Invoice Amount",
						"Due Amount",
						"Due Date",
						"Status",
					]}
					tableType="Invoice"
					mainColumn="# Invoice"
					onSearch={filterInvoiceData}
					searchPlaceholder="Search by customer or invoice number..."
					filterComponent={
						<InvoiceFilters
							filters={filters}
							setFilters={setFilters}
							expandedSections={expandedSections}
							toggleSection={toggleSection}
							applyFilters={applyFilters}
							cancelFilters={cancelFilters}
							isFilterOpen={isFilterOpen}
							setIsFilterOpen={setIsFilterOpen}
						/>
					}
					customTableComponent={(data) => (
						<Customtable
							tableType="Invoice"
							mainColumn="# Invoice"
							columns={[
								"Client / Company",
								"Created on",
								"Invoice Amount",
								"Due Amount",
								"Due Date",
								"Status",
							]}
							data={data}
						/>
					)}
					rowsPerPage={queryParams.pageSize}
					totalDocs={data?.totalDocs}
					totalPages={data?.totalPages}
					currentPage={queryParams.pageNumber}
					handlePageChange={(page) => {
						setQueryParams((prev) => ({
							...prev,
							pageNumber: page,
						}));
					}}
					handleSearch={(search) => {
						setFilters((prev) => ({
							...prev,
							search: search,
						}));
					}}
				/>
			</Card>
		</div>
	);
}
