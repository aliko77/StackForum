/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginFuncProp, IRegisterFuncProp, IUser, IVerifyFuncProp } from 'types';
import Cookies, { CookieSetOptions } from 'universal-cookie';

interface IAuthContextProps {
   user: IUser | null;
   accessToken: string | null;
   refreshToken: string | null;
   login: ILoginFuncProp;
   register: IRegisterFuncProp;
   logout: () => void;
   verify: IVerifyFuncProp;
}

const AuthCookieConfig: CookieSetOptions = {
   secure: true,
   // httpOnly: true, // Only Production
};

export const AuthContext = createContext<IAuthContextProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   logout: () => {},
   register: async () => {},
   verify: async () => {
      return {};
   },
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const cookies = new Cookies();
   const navigate = useNavigate();

   const [user, setUser] = useState(() => {
      const storedUser = cookies.get<IUser | null>('user');
      return storedUser ?? null;
   });

   const [accessToken, setAccessToken] = useState(() => {
      const storedAT = cookies.get<string | null>('accessToken');
      return storedAT ?? null;
   });

   const [refreshToken, setRefreshToken] = useState(() => {
      const storedRT = cookies.get<string | null>('refreshToken');
      return storedRT ?? null;
   });

   useEffect(() => {
      cookies.set('user', user, AuthCookieConfig);
      cookies.set('accessToken', accessToken, AuthCookieConfig);
      cookies.set('refreshToken', refreshToken, AuthCookieConfig);
   }, [user, accessToken, refreshToken]);

   const login: ILoginFuncProp = async (email, password) => {
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
         });
   };

   const logout = (): void => {
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
         });
   };

   const verify: IVerifyFuncProp = async (vcode, email) => {
      const response = await axiosService.post('/auth/verify/', {
         activation_code: vcode,
         email: email,
      });
      const { data } = response;
      const { status } = data;

      if (typeof status === 'boolean') {
         setUser((prevUser) => {
            if (!prevUser) return null;
            return {
               ...prevUser,
               is_verified: status,
            };
         });
      }
      return data;
   };

   const value = useMemo(() => {
      return {
         user,
         accessToken,
         refreshToken,
         login,
         logout,
         register,
         verify,
      };
   }, [user, login, logout, register]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
