import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const transactions = {
  add: async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/transaction`, data);
      return res.data;
    } catch (error) {}
  },
  edit: async (id, data) => {
    try {
      const res = await axios.put(`${BASE_URL}/transaction/${id}`, data);
      return res.data;
    } catch (error) {}
  },
  delete: async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/transaction/${id}`);
      return res.data;
    } catch (error) {}
  },
};

export default transactions;
