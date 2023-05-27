import { axiosService } from 'api/axios/axios';
import { useAuth } from 'hooks/useAuth';
import { setAxiosPrivateHeaders } from './useAxiosPrivate';
import { AxiosError } from 'axios';

export const useRefreshToken = () => {
   const { setAccessToken, setCsrfToken } = useAuth();

   const refresh = async () => {
      try {
         const { data, headers } = await axiosService.post('auth/token/refresh/');
         if (data.code && data.code === 'refresh_token_not_found') {
            return { code: data.code };
         }
         const xcsrf = headers['x-csrftoken'];
         setAxiosPrivateHeaders(data.access, xcsrf);
         setAccessToken(data.access);
         setCsrfToken(xcsrf);
         return { accessToken: data.access, csrfToken: xcsrf };
      } catch (error: unknown) {
         if (error instanceof AxiosError) {
            const { detail, code } = error?.response?.data ?? undefined;
            console.debug('[Error]', detail);
            return { code: code };
         }
      }
   };

   return refresh;
};
