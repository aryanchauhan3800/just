import { useMutation, useQuery } from '@tanstack/react-query';
import { InvoiceFiltersState } from '@/types/dashboardAndInvoiceTypes';
import { invoiceService } from '@/services/invoiceService';
import { login } from '@/services/authService';

  export const useLogin = () =>useMutation({
    mutationFn: login,
  })
   


    export const useGetInvoiceAttributes = (filters: InvoiceFiltersState) =>
      useQuery({
        queryKey: ['invoiceAttributes', filters],
        queryFn:  invoiceService.getAttributes,
        // Optional: you can enable keepPreviousData for pagination
      //   keepPreviousData: true,
      });
