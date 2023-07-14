import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { useAuth } from 'hooks/useAuth';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { useState } from 'react';
import { BlockedUsersProps, FriendsProps, LoginRecordsProps, ProfileProps, UserProps } from 'types';

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

type ChangePasswordProps = {
   password: string;
   new_password: string;
   new_confirm_password: string;
};

type ChangeEmailProps = {
   password: string;
   new_email: string;
};

type SignatureProps = {
   signature: string | undefined;
};

type BlockedUserProps = {
   username: string;
};

type BlockedUserReturnProps = Promise<
   | {
        username: string;
        avatar: string;
        blocked_at: string;
        blocked: boolean;
     }
   | boolean
>;
type FriendProps = {
   username: string;
};

type FriendReturnProps = Promise<
   | {
        username: string;
        avatar: string;
        friendship_at: string;
        friendship: boolean;
     }
   | boolean
>;

export default function useUser() {
   const { setUser, user, logout } = useAuth();
   const axiosPrivate = useAxiosPrivate();
   const [errors, setErrors] = useState<null | string[]>(null);

   const getUser = async (): Promise<UserProps | boolean> => {
      try {
         const { data } = await axiosPrivate.get('/user/@me/');
         setErrors(null);
         setUser(data);
         return data;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const accountVerify = async ({ email, vcode }: AccountVerifyProps): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/auth/verify/', {
            activation_code: vcode,
            email: email,
         });
         setErrors(null);
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               is_verified: data.status,
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const accountVerifyResend = async (): Promise<boolean> => {
      try {
         const { status } = await axiosPrivate.post('/auth/verify/resend/', {
            email: user?.email,
         });
         setErrors(null);
         return status === 200 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const register = async (data: RegisterProps): Promise<boolean> => {
      try {
         const { status } = await axiosService.post('/auth/register/', {
            username: data.username,
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
         });
         setErrors(null);
         return status === 201 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const updateProfile = async (profile: ProfileProps): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/profile/update/', profile);
         setErrors(null);
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               profile: data,
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const deleteAvatar = async (): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/avatar/delete/');
         setErrors(null);
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
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const updateAvatar = async (avatar: AvatarProps): Promise<boolean> => {
      try {
         const formData = new FormData();
         formData.append('avatar', avatar);
         const { data, status } = await axiosPrivate.post('/user/avatar/update/', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         setErrors(null);
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
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const changePassword = async (passwords: ChangePasswordProps): Promise<boolean> => {
      try {
         const { status } = await axiosPrivate.post('/auth/password/change/', passwords);
         setErrors(null);
         if (status === 200) {
            logout();
            return true;
         }
         return false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const changeEmail = async (emails: ChangeEmailProps): Promise<boolean> => {
      try {
         const { status } = await axiosPrivate.post('/user/email/change/', emails);
         setErrors(null);
         if (status === 200) {
            logout();
            return true;
         }
         return false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const updateSignature = async (signature: SignatureProps): Promise<boolean> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/signature/update/', signature);
         setErrors(null);
         setUser((prevState) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               profile: {
                  ...prevState.profile,
                  signature: data.signature,
               },
            };
         });
         return status === 200 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const getLastLoginRecords = async (): Promise<LoginRecordsProps> => {
      try {
         const { data, status } = await axiosPrivate.get('/user/last-login-records/');
         setErrors(null);
         return status === 200 ? data : [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      }
   };

   const getBlockedUsers = async (): Promise<BlockedUsersProps> => {
      try {
         const { data, status } = await axiosPrivate.get('/user/blocked-users/');
         setErrors(null);
         return status === 200 ? data : [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      }
   };

   const blockUserByUsername = async (
      username: BlockedUserProps,
   ): Promise<BlockedUserReturnProps> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/blocked-users/', username);
         setErrors(null);
         return status === 200 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const unBlockUserByUsername = async (
      username: BlockedUserProps,
   ): Promise<BlockedUserProps | boolean> => {
      try {
         const { data, status } = await axiosPrivate.delete('/user/blocked-users/', {
            data: username,
         });
         setErrors(null);
         return status === 200 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const getUserFriends = async (): Promise<FriendsProps> => {
      try {
         const { data, status } = await axiosPrivate.get('/user/friends/');
         setErrors(null);
         if (status === 200) return data;
         return [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      }
   };

   const addFriendByUsername = async (username: FriendProps): Promise<FriendReturnProps> => {
      try {
         const { data, status } = await axiosPrivate.post('/user/friends/', username);
         setErrors(null);
         return status === 200 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   const removeFriendByUsername = async (username: FriendProps): Promise<FriendProps | boolean> => {
      try {
         const { data, status } = await axiosPrivate.delete('/user/friends/', { data: username });
         setErrors(null);
         return status === 200 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      }
   };

   return {
      errors,
      getUser,
      accountVerify,
      accountVerifyResend,
      register,
      updateProfile,
      deleteAvatar,
      updateAvatar,
      changePassword,
      changeEmail,
      updateSignature,
      getLastLoginRecords,
      blockUserByUsername,
      getBlockedUsers,
      unBlockUserByUsername,
      getUserFriends,
      addFriendByUsername,
      removeFriendByUsername,
   };
}
