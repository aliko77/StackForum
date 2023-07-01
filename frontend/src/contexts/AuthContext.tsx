import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import { setAxiosPrivateHeaders, useAxiosPrivate } from 'hooks/useAxiosPrivate';
import { ReactChildrenProps, UserProps } from 'types';

type LoginFunctionProps = {
   (email: string, password: string): Promise<void>;
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
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: ReactChildrenProps) => {
   const navigate = useNavigate();
   const axiosPrivateI = useAxiosPrivate();
   const location = useLocation();

   const [user, setUser] = useState<UserProps>();
   const [accessToken, setAccessToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();

   const login: LoginFunctionProps = async (email, password) => {
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

      if (location.state.from) {
         navigate(location.state.from);
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
