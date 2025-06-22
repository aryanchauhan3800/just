import { FormattedDoc, FormattedQuotationData, QuotationAttributesApiResType } from "@/types/quotationTypes";
import axios from "./axios";


export const quotationService = {


  // Attributes Cards Data
  getAttributes: async (): Promise<QuotationAttributesApiResType> => {
    const result = await axios.post('/api/v1/invoice/attributes');
    return result?.data?.result;
  },




  // get all data, filter and sorting
  getAllData: async (): Promise<FormattedQuotationData> => {

    const result = await axios.post(`/api/v1/quotation/own`);

    const formattedDocs: FormattedDoc[] = result.data.result.docs.map(doc => ({
      id: doc.id,
      quotationNumber: doc.quotationNumber,
      clientCompany: doc.party.name,
      quoteAmount: doc.totalAmount,
      createdOn: new Date(doc.createdAt).toLocaleDateString('en-GB'),
      validTo: new Date(doc.dueDate).toLocaleDateString('en-GB'),
      status: doc.status,
    }));

    return {
      ...result.data.result,
      docs: formattedDocs
    }

  }



}