/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginFuncProp, IRegisterFuncProp, IUser, IVerifyFuncProp } from 'types';
import { useLocalStorage } from 'usehooks-ts';

interface IAuthContextProps {
   user: IUser | null;
   accessToken: string | null;
   refreshToken: string | null;
   login: ILoginFuncProp;
   register: IRegisterFuncProp;
   logout: () => void;
   verify: IVerifyFuncProp;
   resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps>({
   user: null,
   accessToken: null,
   refreshToken: null,
   login: async () => {},
   logout: () => {},
   register: async () => {},
   verify: async () => {},
   resetPassword: async () => {},
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
            navigate('/account/verify');
         });
   };

   const verify: IVerifyFuncProp = async (vcode, email) => {
      await axiosService
         .post('/account/verify/', {
            vcode: vcode,
            email: email,
         })
         .then(({ data }) => {
            const { status } = data;
            if (status) {
               setUser((prevUser) => {
                  if (!prevUser) return null;
                  return {
                     ...prevUser,
                     is_verified: false,
                  };
               });
            }
         });
   };

   const resetPassword = async (email: string): Promise<void> => {
      await axiosService.post('/account/reset-password/', {
         email: email,
      });
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
         resetPassword,
      };
   }, [user, login, logout, register]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
