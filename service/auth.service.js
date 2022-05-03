import { API_ENDPOINT } from "config/api";
import { axiosInstance } from "config/axios";

export const login = async (userData) => {
  const res = await axiosInstance.post(API_ENDPOINT.LOGIN, userData);
  const { name, userRole, id, token } = res.data.data;
  return { name, userRole, id, token };
};

export const reset = async (userData) => {
  const token = localStorage.getItem("resetToken");
  // We are using 3 dots for destructuring are useData object
  // Reason -> We will be sending only one object to the server
  //        -> If we don't destructure then userData will be sent as an object and token as string
  await axiosInstance.post(API_ENDPOINT.RESET, { ...userData, token });
};

export const forget = async (userData) => {
  const res = await axiosInstance.get(API_ENDPOINT.FORGOT, {
    params: {
      email: userData
    }
  });
  const { token } = res.data.data;
  return token;
};

export const signUp = async (userData) => {
  const res = await axiosInstance.post(API_ENDPOINT.SIGNUP, userData);
  const { name, userRole, id, token } = res.data.data;
  return { name, userRole, id, token };
};
