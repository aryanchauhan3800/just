import { useQuery } from '@tanstack/react-query';
import { InvoiceFiltersState } from '@/types/dashboardAndInvoiceTypes';
import { invoiceService } from '@/services/invoiceService';
import { dropdownService } from '@/services/dropdownService';

  export const useGetPartiesDropdown = () =>
    useQuery({
      queryKey: ['parties'],
      queryFn: ({ queryKey }) => {
        return dropdownService.getParties();
      },
      // Optional: you can enable keepPreviousData for pagination
    //   keepPreviousData: true,
    });

    export const useGetItemDropdown = () =>
      useQuery({
        queryKey: ['items'],
        queryFn: ({ queryKey }) => {
          return dropdownService.getItems();
        },
        // Optional: you can enable keepPreviousData for pagination
      //   keepPreviousData: true,
      });
