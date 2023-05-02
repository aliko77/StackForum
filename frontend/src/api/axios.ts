import axios from 'axios';

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
      console.debug(
         '[Response]',
         (res.config.baseURL ?? 'baseUrl') + (res.config.url ?? 'url'),
         res.status,
         res.data,
      );
      return Promise.resolve(res);
   },
   (err) => {
      if (err.code !== 'ERR_NETWORK') {
         throw new Error(err.response.data.message);
      }
      return Promise.reject(err);
   },
);

export default axiosService;
