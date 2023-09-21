import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const categories = {
  get: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category`);
      return res.data;
    } catch (error) {}
  },
};

export default categories;
