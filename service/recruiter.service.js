import { API_ENDPOINT } from "config/api";
import { axiosInstance } from "config/axios";

export const showJobsPosted = async (page) => {
  const res = await axiosInstance.get(API_ENDPOINT.VIEW_JOBS, {
    params: {
      page: page
    }
  });
  return res.data;
};

export const viewApplication = async (id) => {
  const res = await axiosInstance.get(`${API_ENDPOINT.VIEW_JOBS}/${id}/candidates`);
  return res.data.data;
};

export const postJob = async (postData) => {
  const res = await axiosInstance.post(API_ENDPOINT.CREATE_job, postData);
  return res;
};
