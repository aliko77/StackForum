import axios from 'axios';
import store from 'store';

const baseURL = 'http://localhost:8000/api';

const axiosService = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosService.interceptors.request.use(
   async (config) => {
      const { token } = store.getState().auth;
      if (token !== null) {
         config.headers.Authorization = 'Bearer ' + token;
         config.withCredentials = true;
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
