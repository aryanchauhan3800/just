import axios from './axios';
export const idService = {
  getInvoiceNumber: async () => {
    const result = await axios.get('/api/v1/id/getInvoiceNumber');
    return result?.data?.result
  }
};
