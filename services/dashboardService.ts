import { InvoiceFiltersState,Invoice } from '@/types/dashboardAndInvoiceTypes';
import axios from './axios';
import { objectToQueryParams } from '@/helpers/queryParams.helper';
import { InvoicePrintBody } from '@/types/invoice-types';

export const dashboardService = {
  getAttributes: async (filter) => {
    const result = await axios.post('/api/v1/dashboard/attributes',filter);
    console.log(result?.data?.result);
    return result?.data?.result
  },
  getSalesExpenseGraph: async (filter) => {
    const result = await axios.post('/api/v1/dashboard/salesExpenseGraph',filter);
    console.log(result?.data?.result);
    return result?.data?.result
  },
  getExpensePieChart: async (filter) => {
    const result = await axios.post('/api/v1/dashboard/expensePieChart',filter);
    console.log(result?.data?.result);
    return result?.data?.result
  },
};
