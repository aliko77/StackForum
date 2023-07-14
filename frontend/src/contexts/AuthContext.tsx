import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import { setAxiosPrivateHeaders, useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ReactChildrenProps, UserProps } from 'types';

type LoginFunctionProps = {
   (email: string, password: string, state?: { path: string }): Promise<void>;
};

type AuthContextProps = {
   user?: UserProps;
   setUser: Dispatch<SetStateAction<UserProps | undefined>>;
   accessToken?: string;
   setAccessToken: Dispatch<SetStateAction<string | undefined>>;
   csrfToken?: string;
   setCsrfToken: Dispatch<SetStateAction<string | undefined>>;
   login: LoginFunctionProps;
   logout: () => void;
   isAllow: (perms: string[]) => boolean;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: ReactChildrenProps) => {
   const navigate = useNavigate();
   const axiosPrivateI = useAxiosPrivate();

   const [user, setUser] = useState<UserProps>();
   const [accessToken, setAccessToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();
   const [searchParams] = useSearchParams();

   const login: LoginFunctionProps = async (email, password, state) => {
      const { data, headers } = await axiosService.post('/auth/token/', {
         email: email,
         password: password,
      });
      const { access, user: _user } = data;
      const xcsrfToken = headers['x-csrftoken'];
      setAxiosPrivateHeaders(access, xcsrfToken);
      setAccessToken(access);
      setCsrfToken(xcsrfToken);
      setUser(_user);

      if (state && state.path) {
         navigate(state.path);
      } else if (searchParams.has('registered')) {
         navigate('/auth/verify/');
      } else {
         navigate('/');
      }
   };

   const logout = async (): Promise<void> => {
      try {
         await axiosPrivateI.post('/auth/logout/');
      } finally {
         setAxiosPrivateHeaders(undefined, undefined);
         setAccessToken(undefined);
         setCsrfToken(undefined);
         setUser(undefined);
      }
   };

   const isAllow = (perms: string[]) => {
      if (!user) return false;
      if (user.is_staff) return true;
      return perms.some((element) => user.auth_groups.includes(element));
   };

   const value = useMemo(() => {
      return {
         user,
         isAllow,
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
