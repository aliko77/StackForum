import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ProfileProps, UserProps } from 'types';

type AccountVerifyProps = {
   vcode: string;
   email: string | undefined;
};
type RegisterProps = {
   username: string | undefined;
   email: string | undefined;
   password: string | undefined;
   confirm_password: string | undefined;
};

type AvatarProps = File;

export default function useUser() {
   const { setUser, user } = useAuth();
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

   const accountVerify = async ({ email, vcode }: AccountVerifyProps): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/verify/', {
            activation_code: vcode,
            email: email,
         });
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               is_verified: data.status,
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         return false;
      }
   };

   const accountVerifyResend = async (): Promise<boolean> => {
      try {
         const { status } = await axiosPrivate.post('/user/verify/resend/', {
            email: user?.email,
         });
         return status === 200 ? true : false;
      } catch (error) {
         return false;
      }
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
      try {
         const { data, status } = await axiosPrivate.post('/user/profile/update/', profile);
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               profile: data,
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         return false;
      }
   };

   const deleteProfileAvatar = async (): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/profile/avatar/delete/');
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               profile: {
                  ...prevState.profile,
                  avatar: data.avatar,
               },
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         return false;
      }
   };

   const updateProfileAvatar = async (avatar: AvatarProps): Promise<boolean> => {
      try {
         const formData = new FormData();
         formData.append('avatar', avatar);
         const { data, status } = await axiosPrivate.post(
            '/user/profile/avatar/update/',
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               profile: {
                  ...prevState.profile,
                  avatar: data.avatar,
               },
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         return false;
      }
   };

   return {
      getUser,
      accountVerify,
      accountVerifyResend,
      register,
      updateProfile,
      deleteProfileAvatar,
      updateProfileAvatar,
   };
}
