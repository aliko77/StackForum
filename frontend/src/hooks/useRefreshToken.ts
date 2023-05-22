import { axiosService } from '../api/axios/axios';
import { useAuth } from 'hooks/useAuth';

export const useRefreshToken = () => {
   const { setAccessToken, setCsrfToken } = useAuth();

   const refresh = async () => {
      const response = await axiosService.post(
         'auth/refresh-token/',
         {},
         {
            withCredentials: true,
         },
      );
      setAccessToken(response.data.access);
      setCsrfToken(response.headers['X-CSRFToken']);

      return { accessToken: response.data.access, csrfToken: response.headers['X-CSRFToken'] };
   };

   return refresh;
};
