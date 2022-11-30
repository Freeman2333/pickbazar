import * as axios from 'axios';
import { toast } from 'react-toastify';

export const baseURL = process.env.REACT_APP_BASE_URL;
export const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    toast.error('error occured');
    return Promise.reject(error);
  },
);
