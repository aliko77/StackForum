import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import { AxiosError } from 'axios';
import { setAxiosPrivateHeaders, useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ReactChildrenProps, UserProps } from 'types';

interface LoginFunctionProps {
   (email: string, password: string): Promise<void>;
}

interface IAuthContext {
   user: UserProps | undefined;
   setUser: Dispatch<SetStateAction<UserProps | undefined>>;
   accessToken?: string;
   setAccessToken: Dispatch<SetStateAction<string | undefined>>;
   csrfToken?: string;
   setCsrfToken: Dispatch<SetStateAction<string | undefined>>;
   login: LoginFunctionProps;
   logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: ReactChildrenProps) => {
   const navigate = useNavigate();
   const axiosPrivateI = useAxiosPrivate();

   const [user, setUser] = useState<UserProps>();
   const [accessToken, setAccessToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();

   const login: LoginFunctionProps = async (email, password) => {
      const { data, headers } = await axiosService.post('/auth/token/', {
         email: email,
         password: password,
      });
      const { access, user } = data;
      const xcsrfToken = headers['x-csrftoken'];
      setAxiosPrivateHeaders(access, xcsrfToken);
      setAccessToken(access);
      setCsrfToken(xcsrfToken);
      setUser(user);
      user.is_verified ? navigate('/') : navigate('/auth/verify/');
   };

   const logout = async (): Promise<void> => {
      try {
         await axiosPrivateI.post('/auth/logout/');
      } catch (error: unknown) {
         error instanceof AxiosError && console.debug('[Error]', error.response?.data);
      } finally {
         setAxiosPrivateHeaders(undefined, undefined);
         setAccessToken(undefined);
         setCsrfToken(undefined);
         setUser(undefined);
      }
   };

   const value = useMemo(() => {
      return {
         user,
         setUser,
         accessToken,
         setAccessToken,
         csrfToken,
         setCsrfToken,
         login,
         logout,
      };
   }, [user, accessToken, csrfToken]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
