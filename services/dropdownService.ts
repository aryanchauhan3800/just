import axios from './axios';
export const dropdownService = {
  getParties: async () => {
    const result = await axios.get('/api/v1/dropdown/parties');
    return result?.data?.result
  },
  getItems: async () => {
    const result = await axios.get('/api/v1/dropdown/items');
    return result?.data?.result
  }
};

