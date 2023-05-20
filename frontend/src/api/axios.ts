import axios from 'axios';
import TokenService from 'services/TokenService';

const REACT_APP_BACKEND_URL = 'http://localhost:8000/api/v1';
const axiosService = axios.create({
   baseURL: REACT_APP_BACKEND_URL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
});

axiosService.interceptors.request.use(
   async (config) => {
      const token = TokenService.getCookieAccessToken();

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      console.debug('[Request]', (config.baseURL ?? 'baseUrl') + (config.url ?? 'url'));
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

axiosService.interceptors.response.use(
   (res) => {
      console.debug('[Response]', res);
      return res;
   },
   async (err) => {
      return Promise.reject(err);
   },
);

export default axiosService;
