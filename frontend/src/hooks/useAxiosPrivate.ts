import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { axiosPrivate } from 'api/axios/axios';

export const useAxiosPrivate = () => {
   const { accessToken, csrfToken, user } = useAuth();
   const refresh = useRefreshToken();

   useEffect(() => {
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
         axiosPrivate.interceptors.response.eject(responseIntercept);
      };
   }, [accessToken, csrfToken, refresh, user]);

   return axiosPrivate;
};

export const setAxiosPrivateHeaders = (access: string | undefined, xcsrf: string | undefined) => {
   const { common } = axiosPrivate.defaults.headers;
   if (access) {
      common['Authorization'] = `Bearer ${access}`;
   } else {
      delete common['Authorization'];
   }
   if (xcsrf) {
      common['x-csrftoken'] = xcsrf;
   } else {
      delete common['x-csrftoken'];
   }
};
