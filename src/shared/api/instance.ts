import axios from "axios";

import { ACCESS_TOKEN } from "@shared/constants";

export const api = axios.create({
  baseURL: process.env.BASE_API_URL
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
