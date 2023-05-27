import { axiosService } from 'api/axios/axios';
import { AxiosError } from 'axios';
import { useRefreshToken } from 'hooks/useRefreshToken';

export const useVerifyToken = () => {
   const refresh = useRefreshToken();
   const verify = async () => {
      try {
         const { data } = await axiosService.post('auth/token/verify/');
         if (data.code && data.code === 'acces_token_not_found') {
            return false;
         }
         return true;
      } catch (error: unknown) {
         if (error instanceof AxiosError) {
            const { detail, code } = error?.response?.data ?? undefined;
            console.debug('[Error]', detail);
            if (code === 'token_not_valid') {
               await refresh();
            }
            return true;
         }
      }
   };
   return verify;
};
