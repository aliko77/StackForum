/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { AxiosError } from 'axios';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginFuncProp, IRegisterFuncProp, IUser } from 'types';
import { useLocalStorage } from 'usehooks-ts';

interface IAuthContextProps {
   user: IUser | null;
   accessToken: string | null;
   refreshToken: string | null;
   login: ILoginFuncProp;
   register: IRegisterFuncProp;
   logout: () => void;
}

interface IExtraProps {
   message: string | null;
   errors: string[] | null;
   isVerified: () => boolean;
}

export const AuthContext = createContext<IAuthContextProps & IExtraProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   logout: () => {},
   register: async () => {},
   message: null,
   errors: null,
   isVerified: () => false,
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const navigate = useNavigate();
   const [user, setUser] = useLocalStorage<IUser | null>('user', null);
   const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
   const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);
   const [message, setMessage] = useState<null | string>(null);
   const [errors, setErrors] = useState<null | string[]>(null);
   const location = useLocation();

   useEffect(() => {
      setMessage(null);
      setErrors(null);
   }, [location]);

   const login: ILoginFuncProp = async (email, password) => {
      setMessage(null);
      setErrors(null);
      await axiosService
         .post('/auth/login/', {
            email: email,
            password: password,
         })
         .then(({ data }) => {
            const { user, accessToken, refreshToken } = data;
            setUser(user);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
         })
         .catch((error: AxiosError) => {
            const responseData = error.response?.data as { detail: string };
            const resErrors = responseData?.detail
               ? 'Email veya şifre yanlış.'
               : 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.';
            setMessage(resErrors);
         });
   };

   const logout = () => {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      navigate('/');
   };

   const register: IRegisterFuncProp = async (
      email,
      password,
      confirm_password,
      first_name,
      last_name,
   ) => {
      setMessage(null);
      setErrors(null);
      await axiosService
         .post('/auth/register/', {
            email: email,
            password: password,
            confirm_password: confirm_password,
            first_name: first_name,
            last_name: last_name,
         })
         .then(({ data }) => {
            const { user, accessToken, refreshToken } = data;
            setUser(user);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            navigate('/auth/verify');
         })
         .catch((error: AxiosError) => {
            const resErrors = error.response?.data as string[];
            setErrors(resErrors ?? ['Bir hata oluştu. Lütfen tekrar deneyiniz.']);
         });
   };

   const isVerified = () => {
      return user?.is_verified || false;
   };

   const value = useMemo(() => {
      return {
         user,
         message,
         errors,
         accessToken,
         refreshToken,
         login,
         logout,
         register,
         isVerified,
      };
   }, [user, login, logout, register, isVerified]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
