import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const budget = {
  get: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/budget/${id}`);
      if (res.data) {
        return res.data;
      }
    } catch (error) {}
  },
};

export default budget;
