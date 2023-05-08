/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { AxiosError } from 'axios';
import { createContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginFuncProp, IUser } from 'types';
import { useLocalStorage } from 'usehooks-ts';

interface IAuthContextProps {
   user: IUser | null;
   accessToken: string | null;
   refreshToken: string | null;
   login: ILoginFuncProp;
   logout: () => void;
   error: string | null;
}

export const AuthContext = createContext<IAuthContextProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   logout: () => {},
   error: null,
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const navigate = useNavigate();
   const [user, setUser] = useLocalStorage<IUser | null>('user', null);
   const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
   const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);
   const [error, setError] = useState<string | null>(null);
   const location = useLocation();

   const login: ILoginFuncProp = async (email, password) => {
      setError(null);
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
            navigate(location.state?.from ?? '/', { replace: true });
         })
         .catch((error: AxiosError) => {
            const responseData = error.response?.data as { detail: string };
            setError(responseData?.detail || 'Bir hata oluştu daha sonra tekrar deneyin.');
         });
   };

   const logout = () => {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      navigate('/');
   };

   const value: IAuthContextProps = useMemo(() => {
      return {
         user,
         error,
         accessToken,
         refreshToken,
         login,
         logout,
      };
   }, [user, login, logout]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
