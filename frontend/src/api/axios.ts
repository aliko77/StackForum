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
      // const { accessToken } = store.getState().auth;
      // TODO
      // if (accessToken !== null) {
      //    config.headers.Authorization = 'Bearer ' + accessToken;
      // }
      console.debug('[Request]', (config.baseURL ?? 'baseUrl') + (config.url ?? 'url'));
      return config;
   },
   (error) => {
      Promise.reject(error);
   },
);

axiosService.interceptors.response.use(
   (res) => {
      console.debug('[Response]', res);
      return res;
   },
   (err) => {
      if (err.code !== 'ERR_NETWORK') {
         console.log(err.response.data.detail);
      }
      return Promise.reject(err);
   },
);

export default axiosService;
