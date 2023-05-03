import axios from 'axios';
import store from 'store';
import { setAuthTokens, setLogout } from 'store/slices/authSlice';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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
      }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshAuthLogic = async (failedRequest: any) => {
   const { refreshToken } = store.getState().auth;
   if (refreshToken !== null) {
      return axios
         .post(
            '/auth/refresh/',
            {
               refresh: refreshToken,
            },
            {
               baseURL: baseURL,
            },
         )
         .then((resp) => {
            const { access } = resp.data;
            failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
            store.dispatch(
               setAuthTokens({
                  accessToken: access,
                  refreshToken: refreshToken,
               }),
            );
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               store.dispatch(setLogout());
            }
         });
   }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export default axiosService;
