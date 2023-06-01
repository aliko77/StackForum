import { axiosService } from 'api/axios/axios';
import { useAuth } from 'hooks/useAuth';
import { setAxiosPrivateHeaders } from './useAxiosPrivate';
import { AxiosError } from 'axios';

interface RefreshResponse {
   code?: string;
   access_token?: string;
   csrf_token?: string;
}

export const useRefreshToken = () => {
   const { setAccessToken, setCsrfToken } = useAuth();

   const refresh = async (): Promise<RefreshResponse | undefined> => {
      try {
         const { data, headers } = await axiosService.post('auth/token/refresh/');
         if (
            data.code &&
            (data.code === 'refresh_token_not_found' || data.code === 'token_not_valid')
         ) {
            return { code: data.code };
         }
         const { access: access_token } = data;
         const csrf_token = headers['x-csrftoken'];

         setAxiosPrivateHeaders(access_token, csrf_token);
         setAccessToken(access_token);
         setCsrfToken(csrf_token);
         return { access_token, csrf_token };
      } catch (error: unknown) {
         if (error instanceof AxiosError) {
            const { detail, code } = error?.response?.data ?? {};
            console.debug('[Error]', detail);
            return { code };
         }
      }
   };

   return refresh;
};
