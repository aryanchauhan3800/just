export type ItemRow = {
    id: number
    item: string
    avatarInitial: string
    avatarColor: string
    sold: number
}

export type Return = {
    returnNumber: string
    createdOn: string
    name: string
    avatarColor: string
    avatarInitial: string
    returnValue: string
    creditNote: string
    returnDate: string
    status: string
    amount: string
}

export interface ShowReturnFilter {
    recieved: boolean
    pending: boolean
    draft: boolean
    partiallyRecieved: boolean
}

export interface ReturnFiltersState {
    showReturns: ShowReturnFilter;
    showCreditNotes: boolean
    amountWise: string
    returnsMade: string
}

export interface ExpandedSections {
    amountWise: boolean
    returnsMade: boolean
}

export interface ReturnFiltersProps {
    filters: ReturnFiltersState;
    setFilters: React.Dispatch<React.SetStateAction<ReturnFiltersState>>;
    expandedSections: ExpandedSections;
    toggleSection: (section: keyof ExpandedSections) => void;
    applyFilters: () => void;
    cancelFilters: () => void;
    isFilterOpen: boolean;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}