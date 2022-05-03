import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const unserializedUser = Cookies.get("user");

    if (unserializedUser) {
      const user = JSON.parse(unserializedUser);
      if (user?.token) config.headers.Authorization = user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
