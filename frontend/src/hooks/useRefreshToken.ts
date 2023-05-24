import { axiosService } from 'api/axios/axios';
import { useAuth } from 'hooks/useAuth';

export const useRefreshToken = () => {
   const { setAccessToken, setCsrfToken } = useAuth();

   const refresh = async () => {
      const { data, headers } = await axiosService.post('auth/refresh-token/');
      if (data.code && data.code === 'token_not_valid') {
         return data;
      }
      setAccessToken(data.access);
      setCsrfToken(headers['x-csrftoken']);
      return { accessToken: data.access, csrfToken: headers['x-csrftoken'] };
   };

   return refresh;
};
