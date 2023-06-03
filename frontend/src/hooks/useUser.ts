import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { KeyValue } from 'types';

interface VerifyFunctionProps {
   (vcode: string, email: string | undefined): Promise<KeyValue>;
}
interface RegisterProps {
   (username: string, email: string, password: string, confirm_password: string): Promise<boolean>;
}

export default function useUser() {
   const { setUser } = useAuth();
   const axiosPrivate = useAxiosPrivate();

   async function getUser() {
      try {
         const { data } = await axiosPrivate.get('/user/@me');
         setUser(data);
         return data;
      } catch (error: unknown) {
         error instanceof AxiosError && console.debug('[Request]', error?.response);
         return false;
      }
   }

   const accountVerify: VerifyFunctionProps = async (vcode, email) => {
      const response = await axiosPrivate.post('/user/verify/', {
         activation_code: vcode,
         email: email,
      });
      const { status } = response.data;

      if (typeof status === 'boolean') {
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               is_verified: status,
            };
         });
      }
      return status;
   };

   const register: RegisterProps = async (username, email, password, confirm_password) => {
      const { status } = await axiosService.post('/auth/register/', {
         username: username,
         email: email,
         password: password,
         confirm_password: confirm_password,
      });
      return status === 201 ? true : false;
   };

   return { getUser, accountVerify, register };
}
