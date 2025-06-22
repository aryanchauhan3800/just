import React, { useState } from 'react';
import { Party  } from '@/types/party-types';
import CustomTable from '../Customtable';
import FilterButtonWithMenu from '../FilterButtonWithMenu';
import { PartyFiltersState } from '@/types/dashboardAndInvoiceTypes';



interface FilterButtonWithMenuProps {
  onApplyFilter: (filters: PartyFiltersState) => void;
}
interface FilterButtonWithMenuProps {
  onApplyFilter: (filters: PartyFiltersState) => void;
}

const PartyTableWrapper = ({ data }: { data: Party[] }) => {
  const [filters, setFilters] = useState<PartyFiltersState>({
    status: { active: true, inactive: false },
    highValueOnly: false,
    toReceiveAmount: 'ALL',
    toPayAmount: 'ALL',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const applyFilter = (newFilters: PartyFiltersState) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
        
        </div>
      </div>

     
    </div>
  );
};

export default PartyTableWrapper;
