import Axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { ACCESS_TOKEN } from "@shared/constants";

export const api = Axios.create({
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
      localStorage.removeItem(ACCESS_TOKEN);
    }
    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const source = Axios.CancelToken.source();
  const promise = api({
    ...config,
    ...options,
    cancelToken: source.token
  });
  return promise;
};
