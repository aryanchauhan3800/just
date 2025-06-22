import axios from './axios'; // uses the configured axiosInstance
import { PartyFiltersState } from '@/types/party-types';

interface Address {
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

interface Party {
  name: string;
  partyType: 'BUSINESS' | 'INDIVIDUAL';
  contactNumber: string;
  countryCode: string;
  email?: string;
  gstin?: string;
  pan?: string;
  billing: Address;
  shipping: string[]; // if each entry is a plain string
}

export const partyService = {
  create: async (data: Party) => {
    const res = await axios.post('/api/v1/party/create', data);
    return res?.data?.result;
  },

  getAll: async (filters: PartyFiltersState) => {
    const res = await axios.post('/api/v1/party/own', filters);
    return res?.data?.result;
  },

  getOne: async (id: string) => {
    const res = await axios.get(`/api/v1/party/${id}`);
    return res?.data?.result;
  },

  update: async (id: string, data: Partial<Party>) => {
    const res = await axios.put(`/api/v1/party/${id}`, data);
    return res?.data?.result;
  },
};
