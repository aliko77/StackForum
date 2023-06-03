import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ProfileProps, UserProps } from 'types';

type AccountVerifyProps = {
   vcode: string;
   email: string;
};
type RegisterProps = {
   username: string | undefined;
   email: string | undefined;
   password: string | undefined;
   confirm_password: string | undefined;
};

type AvatarProps = {
   avatar: string | undefined;
};

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

   const accountVerify = async (data: AccountVerifyProps): Promise<boolean> => {
      const response = await axiosPrivate.post('/user/verify/', {
         activation_code: data.vcode,
         email: data.email,
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

   const register = async (data: RegisterProps): Promise<boolean> => {
      const { status } = await axiosService.post('/auth/register/', {
         username: data.username,
         email: data.email,
         password: data.password,
         confirm_password: data.confirm_password,
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

   const updateProfileAvatar = async (avatar: AvatarProps): Promise<boolean> => {
      const { data, status } = await axiosPrivate.post('/user/profile/avatar/update/', avatar);
      setUser((prevState) => {
         if (!prevState) return undefined;
         return {
            ...prevState,
            profile: {
               avatar: data.avatar,
            },
         };
      });
      return status === 200 ? true : false;
   };

   return { getUser, accountVerify, register, updateProfile };
}
