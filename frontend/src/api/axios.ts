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
   async (err) => {
      const originalRequest = err.config;
      const refreshToken = TokenService.getLocalRefreshToken();
      if (
         err.response.status === 401 &&
         err.response.data.code === 'token_not_valid' &&
         refreshToken &&
         !originalRequest._retry
      ) {
         originalRequest._retry = true;
         const response = await axiosService.post('/auth/refresh/', {
            refresh: refreshToken,
         });
         const newAccessToken = response.data.access;
         localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
         return await axiosService(originalRequest);
      }
      return Promise.reject(err);
   },
);

export default axiosService;
