import { axiosService } from 'api/axios/axios';
import { useAuth } from 'hooks/useAuth';
import { setAxiosPrivateHeaders } from './useAxiosPrivate';

export const useRefreshToken = () => {
   const { setAccessToken, setCsrfToken } = useAuth();

   const refresh = async () => {
      const { data, headers } = await axiosService.post('auth/refresh-token/');
      if (data.code && data.code === 'token_not_valid') {
         return data;
      }
      const xcsrf = headers['x-csrftoken'];
      setAxiosPrivateHeaders(data.access, xcsrf);
      setAccessToken(data.access);
      setCsrfToken(xcsrf);
      return { accessToken: data.access, csrfToken: xcsrf };
   };

   return refresh;
};
