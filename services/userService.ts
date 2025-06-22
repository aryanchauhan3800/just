import axios from './axios';
export const userService = {
  getProfile: async () => {
    const result = await axios.get('/api/users/profile');
    return result?.data?.data
  },

};

