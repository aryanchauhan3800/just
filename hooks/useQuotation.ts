import { quotationService } from "@/services/quotationService";
import { FormattedQuotationData, QuotationAttributesApiResType } from "@/types/quotationTypes";
import { useMutation } from "@tanstack/react-query";


export const useGetQuotationAttributes = () => useMutation<QuotationAttributesApiResType>({
  mutationKey: ["itemAttributes"],
  mutationFn: quotationService.getAttributes,
});




export const useAllQuotationData = () => useMutation<FormattedQuotationData>({
  mutationKey: ["allQuotation"],
  mutationFn: () => quotationService.getAllData()
})