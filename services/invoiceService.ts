import { InvoiceFiltersState, Invoice } from '@/types/dashboardAndInvoiceTypes';
import axios from './axios';
import { objectToQueryParams } from '@/helpers/queryParams.helper';
import { InvoicePrintBody } from '@/types/invoice-types';

type CreateBankPayload = {
  name: string
  accountType: 'SAVINGS' | 'CURRENT'
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  branch: string
  location: string
  upiId: string
  openingBalance: number
  balance: number
}

export const invoiceService = {
  createInvoice: async (data) => {
    const result = await axios.post('/api/v1/invoice/create', data)
    console.log(result?.data)
    return result?.data
  },
  getAll: async (data: InvoiceFiltersState, queryParams: any) => {
    const params = objectToQueryParams(queryParams);
    const result = await axios.post(`/api/v1/invoice/own${params && params}`, data);
    console.log(result?.data?.result);
    return {
      ...result?.data?.result,
      docs: result?.data?.result?.docs?.map((invoice: any) => ({
        invoiceNumber: invoice?.invoiceNumber,
        _id: invoice?._id,
        name: invoice?.party?.name || "",
        avatarColor: "#3498db",
        avatarInitial: invoice?.party?.name?.[0],
        createdOn: new Date(invoice?.createdAt)?.toLocaleDateString("en-IN"),
        invoiceAmount: invoice?.totalAmount,
        dueAmount: invoice?.totalAmount,
        dueDate: new Date(invoice?.dueDate)?.toLocaleDateString("en-IN"),
        status: invoice?.status
      }))
    }
  },
  getAttributes: async () => {
    const result = await axios.post('/api/v1/invoice/attributes');
    console.log(result?.data?.result);
    return result?.data?.result
  },
  getParticular: async (id: string) => {
    const result = await axios.get('/api/v1/invoice/' + id);
    console.log(result?.data?.result);
    return result?.data?.result?.invoiceDetails
  },
  printInvoice: async (id: string, body: InvoicePrintBody) => {
    const result = await axios.post('/api/v1/invoice/print/' + id, body);
    console.log(result?.data?.result);
    return result?.data?.result
  },
  getBank: async () => {
    const result = await axios.post('/api/v1/banks/own')
    console.log(result?.data)
    return result?.data
  },
  addBank: async (data: CreateBankPayload) => {
    const result = await axios.post('/api/v1/banks/create', data)
    console.log(result.data)
    return result?.data?.result
  },
};
