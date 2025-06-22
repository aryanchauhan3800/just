import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface PartyFiltersState {
  dueAmountWise: string | null | undefined;
  showRecurring: boolean | undefined;
  showInvoices: any;
  status: {
    active: boolean;
    inactive: boolean;
  };
  highValueOnly: boolean;
  toReceiveAmount: AmountRangeOption;
  toPayAmount: AmountRangeOption;
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
  | 'ALL'
  | 'LESS_THAN_9999'
  | 'BETWEEN_10000_AND_49999'
  | 'ABOVE_50000';


  export interface ExpandedSectionsParty {
  toReceiveAmount: boolean;
  toPayAmount: boolean;
}


export type Party={

    partyId:string,
    companyName:string,
    type:string,
    toPay:string,
    toReceive:string,
    lastActivity:string,
    status:string
    highValue:boolean
}


export type AccountSummaryView ={

    Transactions:string,
    Quotations:string,
    DeliveryChallans:string,
    LedgerStatement:string,
    ItemwiseReport:string,

}

export type  Transactions ={
Docno:string,
DocType:string,
Createdon:string,
Amount:string,
status:string,


}

export type Quotations1={
    QuationId:string,
    Createdon:string,
    QouteAmount:string,
    DueDate:string,
    Status:string
}

 export type DeliverChallans={
ChallanNumber:string,
ValueofGoods:string,
Createdon:string,
ChallanType:string,
status:string

 }

export type LedgerStatement = {
  id: number;
  date: string;
  Slno: string;
  Voucher: string;
  DebitAmount: number,
  CreditAmount: number;
  TDSbyParty: string;
  TDSbySelf: string;
  Balance: string;
}


 export type ItemwiseReport={

    ItemName: string,
    ItemCode:string,
    SalesQty:string,
    SalesAmount: string,
    PurchaseQty:string,
    PurchaseAmount:string,

 }


interface FilterButtonWithMenuProps {
  onApplyFilter: (filters: PartyFiltersState) => void;
}

interface FilterButtonWithMenuProps {
  onApplyFilter: (filters: PartyFiltersState) => void;
}



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
export type InvoiceDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?:string
}
export type Company ={
companyName:string,
Name:string,
}
 export  type BankAccount = {
  id: string;
  name: string;
  accountNumber: string;
  type: string;
  isDefault?: boolean;
  logoUrl?: string;
};

export type Employee = {
  id: string;
  name: string;
  location: string;
  color?: string;
};

export type StripItem = {
    title: string,
    icon: IconType | LucideIcon,
    all: boolean,
    color: string,
    value: string
}
export type StripItem1 = {
    title: string,
    icon: LucideIcon,
    color: string,
    value: string,
    profit:string,
    profitTitle:string


}

