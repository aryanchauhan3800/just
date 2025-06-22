import { useQuery } from '@tanstack/react-query';
import { idService } from '@/services/idService';

  export const useGetInvoiceNumber = () =>
    useQuery({
      queryKey: ['invoiceNumber'],
      queryFn: ({ queryKey }) => {
        return idService.getInvoiceNumber();
      },
      // Optional: you can enable keepPreviousData for pagination
    //   keepPreviousData: true,
    });
