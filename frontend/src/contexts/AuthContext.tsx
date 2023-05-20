/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axiosService from 'api/axios';
import { IReactChildren, ILoginFunc, IRegisterFunc, IUser, IVerifyFunc } from 'types';

interface IAuthContext {
   user: IUser | null;
   accessToken: string | null;
   refreshToken: string | null;
   login: ILoginFunc;
   register: IRegisterFunc;
   logout: () => void;
   verify: IVerifyFunc;
}

const AuthCookieConfig: { secure: boolean } = {
   secure: true,
   // httpOnly: true, // Only Production
};

export const AuthContext = createContext<IAuthContext>({
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

export const AuthProvider = ({ children }: IReactChildren) => {
   const [cookies, setCookies] = useCookies();
   const navigate = useNavigate();

   const [user, setUser] = useState(() => {
      const storedUser = cookies.user ?? null;
      return storedUser;
   });

   const [accessToken, setAccessToken] = useState(() => {
      const storedAT = cookies.accessToken ?? null;
      return storedAT ?? null;
   });

   const [refreshToken, setRefreshToken] = useState(() => {
      const storedRT = cookies.refreshToken ?? null;
      return storedRT ?? null;
   });

   useEffect(() => {
      if (user) setCookies('user', user, AuthCookieConfig);
      else setCookies('user', '');
      if (accessToken) setCookies('accessToken', accessToken, AuthCookieConfig);
      else setCookies('accessToken', '');
      if (refreshToken) setCookies('refreshToken', refreshToken, AuthCookieConfig);
      else setCookies('refreshToken', '');
   }, [user, accessToken, refreshToken]);

   const login: ILoginFunc = async (email, password) => {
      const response = await axiosService.post('/auth/login/', {
         email: email,
         password: password,
      });
      const { data } = response;
      const { user, accessToken, refreshToken } = data;
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
   };

   const logout = async (): Promise<void> => {
      try {
         await axiosService.post('/auth/logout/', {
            refreshToken: refreshToken,
         });
      } finally {
         setUser(null);
         setAccessToken(null);
         setRefreshToken(null);
         navigate('/');
      }
   };

   const register: IRegisterFunc = async (
      email,
      password,
      confirm_password,
      first_name,
      last_name,
   ) => {
      const response = await axiosService.post('/auth/register/', {
         email: email,
         password: password,
         confirm_password: confirm_password,
         first_name: first_name,
         last_name: last_name,
      });
      const { data } = response;
      const { user, accessToken, refreshToken } = data;
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate('/auth/verify');
   };

   const verify: IVerifyFunc = async (vcode, email) => {
      const response = await axiosService.post('/auth/verify/', {
         activation_code: vcode,
         email: email,
      });
      const { data } = response;
      const { status } = data;

      if (typeof status === 'boolean') {
         setUser((prevUser: unknown) => {
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
