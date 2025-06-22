
import { GridColDef, GridFilterModel, GridRenderCellParams, GridSortModel, GridValidRowModel } from "@mui/x-data-grid";



// attributes API call data type
export type QuotationAttributesSingleDataType = {
  value: number;
  change: number;
  changePercentage: number;
};

export type AppColumn<T extends GridValidRowModel> = Omit<
  GridColDef,
  "field" | "renderCell"
> & {
  field: keyof T & string;
  renderCell?: (params: GridRenderCellParams<T>) => React.ReactNode;
};


export type QuotationAttributesApiResType = {
  totalInvoice: QuotationAttributesSingleDataType;
  totalDue: QuotationAttributesSingleDataType;
  averagePaidTime: QuotationAttributesSingleDataType;
  overduePayment: QuotationAttributesSingleDataType;
};


export type QuoteStatus = "sent" | "confirmed" | "overdue" | "draft";
export type DateRangeOption = "all"| "7_days" | "this_month" | "this_quarter" | "this_year" | "custom";
export type AmountRange = "all" | "lt_9999" | "10000_49999" | "50000_99999";


export type FilterState = {
  statuses: QuoteStatus[];
  validTo: DateRangeOption;
  createdAt: DateRangeOption;
  amount: AmountRange;
};


export type QuotationFilterComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
};




interface Item {
  _id: string;
  name: string;
  type: "SERVICE" | "PRODUCT";
  images: string[];
  quantity: number;
  purchase: {
    price: number;
    finalPrice: number;
    raw: {
      price: number;
      isPartOfPrice: boolean;
    };
  };
  selling: {
    price: number;
    finalPrice: number;
    packaging: {
      price: number;
      isIncludedInPrice: boolean;
    };
  };
  tax: string;
  taxRate: number;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  totalTax: number;
  totalAmount: number;
  totalDiscount: number;
  totalTaxableAmount: number;
  returnedQuantity: number;
}

interface Party {
  _id: string;
  partyId: string;
  idSequence: number;
  type: "CUSTOMER" | "SUPPLIER";
  name: string;
  contactNumber: string;
  email: string;
  gstin: string;
  pan: string;
}

interface Signature {
  type: "MANUAL" | "DIGITAL";
  image: string | null;
}

export interface Doc {
  _id: string;
  idSequence: number;
  quotationNumber: string;
  quotationDate: string;
  dueDate: string;
  paymentMode: string;
  paymentTerms: string;
  isIgst: boolean;
  party: Party;
  status: string;
  items: Item[];
  description: string;
  notes: string;
  attachments: string[]; // i dont know the data type, need to change it later
  totalTaxableAmount: number;
  totalAmount: number;
  totalDiscount: number;
  totalTax: number;
  isRoundOff: boolean;
  roundOffAmount: number;
  isSent: boolean;
  signature: Signature;
  companyId: string;
  userId: string;
  isDeleted: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}



export interface FormattedDoc {
  id: string;
  quotationNumber: string;
  clientCompany: string;
  quoteAmount: number;
  createdOn: string;
  validTo: string;
  status: string;
  action: any;
}


export interface FormattedQuotationData {
  docs: FormattedDoc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}


export interface QuotationApiAllDataType {
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}