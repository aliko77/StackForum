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
   message: object | null;
}

export const AuthContext = createContext<IAuthContextProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   register: async () => {},
   logout: () => {},
   message: null,
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const navigate = useNavigate();
   const [user, setUser] = useLocalStorage<IUser | null>('user', null);
   const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
   const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);
   const [message, setMessage] = useState<object | null>(null);
   const location = useLocation();

   useEffect(() => {
      setMessage(null);
   }, [location]);

   const login: ILoginFuncProp = async (email, password) => {
      setMessage(null);
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
            setMessage({
               error: responseData?.detail || 'Bir hata oluştu daha sonra tekrar deneyin.',
            });
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
            navigate(location.state?.from ?? '/', { replace: true });
         })
         .catch((error: AxiosError) => {
            setMessage(error.response?.data || { error: 'Bir hata oluştu.' });
         });
   };

   const value: IAuthContextProps = useMemo(() => {
      return {
         user,
         message,
         accessToken,
         refreshToken,
         login,
         logout,
         register,
      };
   }, [user, login, logout, register]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
