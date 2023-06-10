import axios from 'axios';

const REACT_APP_BACKEND_URL = 'http://localhost:8000/v1';

export const axiosService = axios.create({
   baseURL: REACT_APP_BACKEND_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

export const axiosPrivate = axios.create({
   baseURL: REACT_APP_BACKEND_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});
