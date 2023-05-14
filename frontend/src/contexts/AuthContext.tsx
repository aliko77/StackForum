/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const AuthContext = createContext<IAuthContextProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   logout: () => {},
   register: async () => {},
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const navigate = useNavigate();
   const [user, setUser] = useLocalStorage<IUser | null>('user', null);
   const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
   const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

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
      await axiosService
         .post('/auth/register/', {
            email: email,
            password: password,
            confirm_password: confirm_password,
            first_name: first_name,
            last_name: last_name,
         })
         .then(({ data }) => {
            console.log(data);
            const { user, accessToken, refreshToken } = data;
            setUser(user);
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            // navigate('/account/verify');
         });
   };

   const isVerified = () => {
      return user?.is_verified || false;
   };

   const value = useMemo(() => {
      return {
         user,
         accessToken,
         refreshToken,
         login,
         logout,
         register,
         isVerified,
      };
   }, [user, login, logout, register]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
