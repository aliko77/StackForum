import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ProfileProps, UserProps } from 'types';

interface AccountVerifyProps {
   vcode: string;
   email: string | undefined;
}
interface RegisterProps {
   username: string;
   email: string;
   password: string;
   confirm_password: string;
}

export default function useUser() {
   const { setUser } = useAuth();
   const axiosPrivate = useAxiosPrivate();

   const getUser = async (): Promise<UserProps | boolean> => {
      try {
         const { data } = await axiosPrivate.get('/user/@me');
         setUser(data);
         return data;
      } catch (error: unknown) {
         error instanceof AxiosError && console.debug('[Request]', error?.response);
         return false;
      }
   };

   const accountVerify = async ({ vcode, email }: AccountVerifyProps): Promise<boolean> => {
      const response = await axiosPrivate.post('/user/verify/', {
         activation_code: vcode,
         email: email,
      });
      const { status } = response.data;
      setUser((prevState) => {
         if (!prevState) return undefined;
         return {
            ...prevState,
            is_verified: status,
         };
      });
      return status;
   };

   const register = async ({
      username,
      email,
      password,
      confirm_password,
   }: RegisterProps): Promise<boolean> => {
      const { status } = await axiosService.post('/auth/register/', {
         username: username,
         email: email,
         password: password,
         confirm_password: confirm_password,
      });
      return status === 201 ? true : false;
   };

   const updateProfile = async (profile: ProfileProps): Promise<boolean> => {
      const { data, status } = await axiosPrivate.post('/user/profile/update/', profile);
      setUser((prevState) => {
         if (!prevState) return undefined;
         return {
            ...prevState,
            profile: data.profile,
         };
      });
      return status === 200 ? true : false;
   };

   return { getUser, accountVerify, register, updateProfile };
}
