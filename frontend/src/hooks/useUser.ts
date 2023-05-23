import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

export default function useUser() {
   const { setUser } = useAuth();
   const axiosPrivate = useAxiosPrivate();

   async function getUser() {
      try {
         const { data } = await axiosPrivate.get('/user/');
         setUser(data);
      } catch (error: unknown) {
         error instanceof AxiosError && console.debug('[Request]', error?.response);
      }
   }

   return getUser;
}
