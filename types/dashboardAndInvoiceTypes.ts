import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export type PersonalDetails = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	countryCode: string;
	contactNumber: string;
	freeTrial?: boolean;
};

export type BusinessDetails = {
	businessName: string;
	businessType: string;
	hasGST: boolean;
	gstNumber: string;
	businessLogo?: File | null;
};

export type AddressDetails = {
	addressLine1: string;
	addressLine2: string;
	country: string;
	state: string;
	city: string;
	pinCode: string;
};

export type SubscriptionPlanDetails = {
	planId: string;
};

export type PaymentDetails = {
	paymentStatus: string;
	transactionId: string;
	orderId: string;
};

export type PhonePayload = {
	contactNumber: string;
	countryCode: string;
	otp: string;
};

export type EmailPayload = {
	email: string;
	otp: string;
};

export type VerificationPayload = PhonePayload | EmailPayload;

export type CustomTableProps = {
	tableType: string;
	mainColumn: string;
	columns: string[];
	data: any[];
};

export type StripItem = {
	title: string;
	icon: IconType | LucideIcon;
	all: boolean;
	color: string;
	value: string;
	percentage: string;
	isUpwardTred: Boolean;
	isDownwardTred: Boolean;
	alert: boolean;
};

export type Invoice = {
	invoiceNumber: string;
	name: string;
	avatarColor: string;
	avatarInitial: string;
	createdOn: string;
	invoiceAmount: string;
	dueAmount: string;
	dueDate: string;
	status: string;
};

export type ProductItem = {
	id: string;
	name: string;
	rate: number;
	cost?: number;
	cgst?: number;
	sgst?: number;
	discount?: number;
	quantity: number;
	amount: number;
};

export type Warehouse = {
	id: string;
	name: string;
	address: string;
};

export type InvoiceDrawerProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
};

export interface ShowInvoicesFilter {
	paid: boolean;
	partiallyPaid: boolean;
	due: boolean;
	overdue: boolean;
	draft: boolean;
}

export interface InvoiceFiltersState {
	showInvoices: ShowInvoicesFilter;
	showRecurring: boolean;
	upcomingDueDates: string;
	showInvoicesCreated: string;
	dueAmountWise: string;
	search:string;
}
export interface PartyFiltersState {
	status: {
		active: boolean;
		inactive: boolean;
	};
	highValueOnly: boolean;
	toReceiveAmount: AmountRangeOption;
	toPayAmount: AmountRangeOption;
}

export interface ExpandedSections {
	upcomingDueDates: boolean;
	showInvoicesCreated: boolean;
	dueAmountWise: boolean;
}

export interface InvoiceFiltersProps {
	filters: InvoiceFiltersState;
	setFilters: React.Dispatch<React.SetStateAction<InvoiceFiltersState>>;
	expandedSections: ExpandedSections;
	toggleSection: (section: keyof ExpandedSections) => void;
	applyFilters: () => void;
	cancelFilters: () => void;
	isFilterOpen: boolean;
	setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PartyFiltersProps {
	filters: PartyFiltersState;
	setFilters: React.Dispatch<React.SetStateAction<PartyFiltersState>>;
	expandedSectionsParty: ExpandedSectionsParty;
	toggleSection: (section: keyof ExpandedSectionsParty) => void;
	applyFilters: () => void;
	cancelFilters: () => void;
	isFilterOpen: boolean;
	setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AmountRangeOption =
	| "ALL"
	| "LESS_THAN_9999"
	| "BETWEEN_10000_AND_49999"
	| "ABOVE_50000";

export interface ExpandedSectionsParty {
	toReceiveAmount: boolean;
	toPayAmount: boolean;
}

export interface FiltersState {
	showInvoices: ShowInvoicesFilter;
	showRecurring: boolean;
	upcomingDueDates: string;
	showInvoicesCreated: string;
	dueAmountWise: string;
}

export type StripItem1 = {
	title: string;
	icon: LucideIcon;
	color: string;
	value: string;
	profit: string;
	profitTitle: string;
};
export type Party = {
	partyID: string;
	companyName: string;
	type: string;
	toPay: string;
	toReceive: string;
	lastActivity: string;
	status: string;
	highValue: boolean;
};

export type AccountSummaryView = {
	Transactions: string;
	Quotations: string;
	DeliveryChallans: string;
	LedgerStatement: string;
	ItemwiseReport: string;
};

export type Transactions = {
	Docno: string;
	DocType: string;
	Createdon: string;
	Amount: string;
	status: string;
};

export type Quotations1 = {
	QuationId: string;
	Createdon: string;
	QouteAmount: string;
	DueDate: string;
	Status: string;
};

export type DeliverChallans = {
	ChallanNumber: string;
	ValueofGoods: string;
	Createdon: string;
	ChallanType: string;
	status: string;
};

export type LedgerStatement = {
	date: string;
	Slno: string;
	Voucher: string;
	CreditAmount: string;
	DebitAmount: string;
	TDSbyParty: string;
	TDSbySelf: string;
	Balance: string;
};


export type ItemwiseReport = {
	ItemName: string;
	ItemCode: string;
	SalesQty: string;
	SalesAmount: string;
	PurchaseQty: string;
	PurchaseAmount: string;
};

interface FilterButtonWithMenuProps {
	onApplyFilter: (filters: PartyFiltersState) => void;
}

interface FilterButtonWithMenuProps {
	onApplyFilter: (filters: PartyFiltersState) => void;
}

export type CompanyDetailStripInfo = {
  icon: React.ElementType;
  title: string;
  value: number;
  color: string;
  growth: number; // positive or negative percentage
};

