import axios, { AxiosRequestConfig } from 'axios';
import { TResponseData } from '../types/response';

export const baseURL = import.meta.env.VITE_API_URL;

const axiosIns = axios.create({
  baseURL,
});

const request = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<TResponseData<T>> => {
  const { data } = await axiosIns.request<TResponseData<T>>(config);
  return data;
};

export default request;
