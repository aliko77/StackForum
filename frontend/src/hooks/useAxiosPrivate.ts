import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { axiosPrivate } from 'api/axios/axios';

export const useAxiosPrivate = () => {
   const refresh = useRefreshToken();
   const { user, accessToken, setAccessToken, csrfToken } = useAuth();

   useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
         (config) => {
            if (!config.headers.Authorization) {
               config.headers['Authorization'] = `Bearer ${accessToken}`;
               config.headers['X-CSRFToken'] = csrfToken;
            }
            return config;
         },
         (error) => Promise.reject(error),
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
         (response) => response,
         async (error) => {
            const prevRequest = error.config;
            if (
               (error?.response?.status === 403 ||
                  (error?.response?.status === 401 &&
                     error?.response?.data?.code === 'token_not_valid')) &&
               !prevRequest?.sent
            ) {
               prevRequest.sent = true;
               const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
               setAccessToken(newAccessToken);
               prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
               prevRequest.headers['X-CSRFToken'] = newCSRFToken;
               return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
         },
      );

      return () => {
         axiosPrivate.interceptors.request.eject(requestIntercept);
         axiosPrivate.interceptors.response.eject(responseIntercept);
      };
   }, [accessToken, refresh, user]);

   return axiosPrivate;
};
