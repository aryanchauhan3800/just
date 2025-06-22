import { useMutation, useQuery } from '@tanstack/react-query';
import { InvoiceFiltersState } from '@/types/dashboardAndInvoiceTypes';
import { invoiceService } from '@/services/invoiceService';
import { InvoicePrintBody } from '@/types/invoice-types';

export const useBank = () => useMutation({
  mutationFn: invoiceService.getBank
})

export const useCreateBank = () => useMutation({
  mutationFn: invoiceService.addBank,
})

export const useCreateInvoice = () => useMutation({
  mutationFn: invoiceService.createInvoice
})

export const useGetInvoice = (filters: InvoiceFiltersState, queryParams) =>
  useQuery({
    queryKey: ['invoices', filters, queryParams],
    queryFn: ({ queryKey }) => {
      const [_key, filterParams, queryParams] = queryKey as [string, InvoiceFiltersState, any];

      return invoiceService.getAll(filterParams, queryParams);
    },
    // Optional: you can enable keepPreviousData for pagination
    //   keepPreviousData: true,
  });

    export const useGetInvoiceAttributes = (filters: InvoiceFiltersState) =>
      useQuery({
        queryKey: ['invoiceAttributes', filters],
        queryFn:  invoiceService.getAttributes,
        // Optional: you can enable keepPreviousData for pagination
      //   keepPreviousData: true,
      });
      export const useGetParticularInvoice = (id:any) =>
        useQuery({
          queryKey: ['invoice/',id],
          queryFn: ({queryKey}) =>{
            const [_key,id] = queryKey as [string,string];
            return invoiceService.getParticular(id);
          }
          
          // Optional: you can enable keepPreviousData for pagination
        //   keepPreviousData: true,
        });

      export const useGetInvoicePrint = (id:any,body: InvoicePrintBody) =>
        useQuery({
          queryKey: ['invoice/print',id, body],
          queryFn: ({queryKey}) =>{
            const [_key,id,body] = queryKey as [string,string,InvoicePrintBody];
            return invoiceService.printInvoice(id,body);
          }
          
          // Optional: you can enable keepPreviousData for pagination
        //   keepPreviousData: true,
        });
