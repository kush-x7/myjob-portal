import { API_ENDPOINT } from "config/api";
import { axiosInstance } from "config/axios";

export const showJobsAvailable = async (page) => {
  const res = await axiosInstance.get(API_ENDPOINT.AVAILABLE_JOB, {
    params: {
      page: page
    }
  });
  return res.data;
};

export const applyJob = async (jobId) => {
  await axiosInstance.post(API_ENDPOINT.APPLY_JOB, {
    jobId
  });
};

export const showJobsApplied = async (page) => {
  const res = await axiosInstance.get(API_ENDPOINT.APPLIED_JOB, {
    params: {
      page: page
    }
  });

  return res.data;
};
