import axios from 'axios';

const REACT_APP_BACKEND_URL = 'http://localhost:8000/api/v1';

export const axiosService = axios.create({
   baseURL: REACT_APP_BACKEND_URL,
   headers: {
      'Content-Type': 'application/json',
   },
});

export const axiosPrivate = axios.create({
   baseURL: REACT_APP_BACKEND_URL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true,
});
