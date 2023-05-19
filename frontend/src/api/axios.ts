import axios from 'axios';
import TokenService from 'services/TokenService';

const baseURL = 'http://localhost:8000/api/v1';
const axiosService = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosService.interceptors.request.use(
   async (config) => {
      const token = TokenService.getLocalAccessToken();

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
   (err) => {
      return Promise.reject(err);
   },
);

export default axiosService;
