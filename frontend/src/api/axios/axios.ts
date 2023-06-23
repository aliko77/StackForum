import axios from 'axios';
import { BACKEND_URL } from 'config';

export const axiosService = axios.create({
   baseURL: BACKEND_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

export const axiosPrivate = axios.create({
   baseURL: BACKEND_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});
