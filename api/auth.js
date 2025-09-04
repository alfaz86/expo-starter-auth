import axios from 'axios';

const BASE_API_URL = null;

const dummyLoginApiResponse = {
  data: {
    access_token:
      "xxx.xxx.xx-xx",
    user: {
      id: 1,
      email: "admin@example.com",
      name: "admin",
      role_id: 1,
      role: 'admin'
    },
  },
  message: "Successfully logged in",
  statusCode: 200,
  success: true,
};

export const loginApi = async ({ email, password }) => {
  if (BASE_API_URL === null) {
    return dummyLoginApiResponse;
  }
  const res = await axios.post(`${BASE_API_URL}/auth/login`, { email, password });
  return res.data;
};
