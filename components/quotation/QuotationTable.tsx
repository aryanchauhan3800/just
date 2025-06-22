import React, { useState } from 'react'
import SearchBar from './SearchBar';
import QuoteFilterSidebar from './QuoteFilterSidebar';
import { FilterState } from '@/types/quotationTypes';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import QuotationFilterTabs from './QuotationFilterTabs';
import QuotationSort, { SortOption } from './QuotationSort';
import QuotationGrid from './QuotationGrid';


const QuotationTable = () => {


  // state for Holding Search bar values
  const [search, setSearch] = useState<string>("");


  // toggle filterdrawer open and close
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);


  // Quote filters - storing all values
  const [quoteFilters, setQuoteFilters] = useState<FilterState>({
    statuses: [],
    validTo: "all",
    createdAt: "all",
    amount: "all",
  });


  // state for Holding sort values
  const [sortValue, setSortValue] = useState<SortOption>("");



  // in filterTabs when user click CLEAR ALL -- reset form to default values
  const handleClearAllFilters = () => {
    setQuoteFilters({
      statuses: [],
      validTo: "all",
      createdAt: "all",
      amount: "all",
    });
  };



  // remove single value from filter tabs
  const handleRemoveFilter = (filterType: keyof FilterState, value?: string) => {

    setQuoteFilters(prev => {

      if (filterType === 'statuses' && value) {

        return {
          ...prev,
          statuses: prev.statuses.filter(status => status !== value)
        };

      } else if (filterType === 'validTo') {

        return {
          ...prev,
          validTo: "all"
        };

      } else if (filterType === 'createdAt') {

        return {
          ...prev,
          createdAt: "all"
        };

      } else if (filterType === 'amount') {

        return {
          ...prev,
          amount: "all"
        };

      }

      return prev;

    });
  };




  return (
    <div className="flex-1 h-fit m-5 rounded p-5 items-center">


      <div className='flex justify-between items-center'>

        {/* search bar */}
        <SearchBar search={search} setSearch={setSearch} />


        <div className='flex items-center gap-4'>

          <QuotationFilterTabs
            filters={quoteFilters}
            onClearAll={handleClearAllFilters}
            onRemoveFilter={handleRemoveFilter}
          />

          <div>
            <Button
              variant="outline"
              onClick={() => setShowFilterDrawer(true)}
              className="flex items-center gap-2 text-[#025AE0] font-semibold">
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            <QuoteFilterSidebar
              isOpen={showFilterDrawer}
              onClose={() => setShowFilterDrawer(false)}
              filters={quoteFilters}
              setFilters={setQuoteFilters} />
          </div>

          <QuotationSort
            sortValue={sortValue}
            setSortValue={setSortValue}
          />


        </div>

      </div>



      {/* calling quotation grid that will display all data */}
      {/* <QuotationGrid /> */}


    </div>
  )
}

export default QuotationTable;