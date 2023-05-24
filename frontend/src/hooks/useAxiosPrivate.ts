import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { axiosPrivate } from 'api/axios/axios';

export const useAxiosPrivate = () => {
   const { accessToken, csrfToken, user } = useAuth();
   const refresh = useRefreshToken();

   useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
         (config) => {
            return config;
         },
         (error) => Promise.reject(error),
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
         (response) => response,
         async (error) => {
            const prevRequest = error.config;
            if (
               error?.response?.data?.code === 'token_not_valid' &&
               (error?.response?.status === 403 || error?.response?.status === 401) &&
               !prevRequest?.sent
            ) {
               prevRequest.sent = true;
               const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
               prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
               prevRequest.headers['x-csrftoken'] = newCSRFToken;
               return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
         },
      );

      return () => {
         axiosPrivate.interceptors.request.eject(requestIntercept);
         axiosPrivate.interceptors.response.eject(responseIntercept);
      };
   }, [accessToken, csrfToken, refresh, user]);

   return axiosPrivate;
};

export const setAxiosPrivateHeaders = (access: string | undefined, xcsrf: string | undefined) => {
   if (access) axiosPrivate.defaults.headers['Authorization'] = `Bearer ${access}`;
   else delete axiosPrivate.defaults.headers['Authorization'];
   if (xcsrf) axiosPrivate.defaults.headers['x-csrftoken'] = xcsrf;
   else delete axiosPrivate.defaults.headers['x-csrftoken'];
};
