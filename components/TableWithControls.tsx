'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState, useMemo } from 'react';
import { Box, Button, InputBase, Pagination } from '@mui/material';
import { FiSearch } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { SearchIcon } from "lucide-react";
import { Sort } from "@mui/icons-material";

type TableWithControlsProps<T> = {
  data: T[];
  columns: string[];
  tableType?: string;
  mainColumn?: string;
  customTableComponent: (data: T[]) => React.ReactNode;
  onSearch?: (query: string, row: T) => boolean;
  searchPlaceholder?: string;
  filterComponent?: React.ReactNode;
  applyFilters?: () => void;
  cancelFilters?: () => void;
  rowsPerPage?: number;
  currentPage?: number;
  totalDocs?: number;
  totalPages?: number;
  handlePageChange?: (page: number) => void;
  handleSearch?: (search: string) => void;

};

const statusStyles = {
  Active: { color: '#15803D', bg: '#DCFCE7' },    // green
  Inactive: { color: '#B91C1C', bg: '#FEE2E2' },  // red
};


function TableWithControls<T>({
  data,
  customTableComponent,
  onSearch,
  searchPlaceholder,
  filterComponent,
  rowsPerPage = 10,
  currentPage = 1,
  totalDocs=0,
  totalPages=0,
  handlePageChange,
  handleSearch
}: TableWithControlsProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);

  // const filteredData = useMemo(() => {
  //   return data.filter((row) => (onSearch ? onSearch(searchQuery, row) : true));
  // }, [data, searchQuery, onSearch]);

  // const data = useMemo(() => {
  //   const start = (currentPage - 1) * rowsPerPage;
  //   return filteredData.slice(start, start + rowsPerPage);
  // }, [filteredData, currentPage, rowsPerPage]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <div className='w-full flex flex-row justify-between'>
          <InputBase
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value)
              // setCurrentPage(1);
              handlePageChange(1)
            }}
            startAdornment={<FiSearch className='mx-1 h-3.5 w-3.5 text-gray-500' />}
            sx={{ px: 1, py: 0.5, border: '1px solid #E5E7EB', borderRadius: 6, width: 400, fontStyle: 'italic' }}
          />
          <div className='flex flex-row gap-2'>
            {filterComponent}
            <DropdownMenu>
              <DropdownMenuTrigger className="border border-[#D6D6D6] font-medium text-sm rounded-sm px-4 flex items-center hover:cursor-pointer hover:bg-gray-100">
                <BiSort className='w-4 h-5 mr-1' />Sort
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-6">
                <DropdownMenuLabel className='flex items-center gap-2 text-lg text-[#6B6B6B]'>Sort Invoices</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                  <CiCalendar />Upcoming Due Dates
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='flex items-center gap-2 text-base text-[#474747]'>
                  <MdCurrencyRupee />Due Amount - High to Low
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Box>

      {customTableComponent(data)}

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => handlePageChange(page)}
          color="primary"
        />
      </Box>
    </Box >
  );
}

export default TableWithControls;
