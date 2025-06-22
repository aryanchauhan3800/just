import { useMutation, useQuery } from '@tanstack/react-query';
import { partyService } from '@/services/partyService';
import { PartyFiltersState } from '@/types/dashboardAndInvoiceTypes';

export const useCreateParty = () => useMutation({
  mutationFn: partyService.create,
});

export const useGetParty = (filters: PartyFiltersState) => useQuery({
  queryKey: ['parties', filters],
  queryFn: ({ queryKey }) => {
    const [_key, filterParams] = queryKey as [string, PartyFiltersState];
    return partyService.getAll({
      ...filterParams,
      dueAmountWise: "",
      showRecurring: false, 
      showInvoices: false
    });
  },
  // Optional: you can enable keepPreviousData for pagination
  //   keepPreviousData: true,
});



export const useGetPartyById = (id?: string) => useQuery({
  queryKey: ['party', id],
  queryFn: () => partyService.getOne(id!),
  enabled: !!id, // Only runs if id is defined
});


export const useUpdateParty = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      partyService.update(id, data),
  });
};