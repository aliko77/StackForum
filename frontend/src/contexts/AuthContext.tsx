import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import {
   IReactChildren,
   ILoginFunc,
   IRegisterFunc,
   IUser,
   IVerifyFunc,
   IUpdateUserFunc,
} from 'types';
import { AxiosError } from 'axios';
import { setAxiosPrivateHeaders, useAxiosPrivate } from 'hooks/useAxiosPrivate';
interface IAuthContext {
   user: IUser | undefined;
   setUser: Dispatch<SetStateAction<IUser | undefined>>;
   accessToken?: string;
   setAccessToken: Dispatch<SetStateAction<string | undefined>>;
   csrfToken?: string;
   setCsrfToken: Dispatch<SetStateAction<string | undefined>>;
   login: ILoginFunc;
   register: IRegisterFunc;
   logout: () => void;
   verify: IVerifyFunc;
   updateProfile: IUpdateUserFunc;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IReactChildren) => {
   const navigate = useNavigate();
   const axiosPrivateI = useAxiosPrivate();

   const [user, setUser] = useState<IUser>();
   const [accessToken, setAccessToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();

   const login: ILoginFunc = async (email, password) => {
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

   const register: IRegisterFunc = async (username, email, password, confirm_password) => {
      const { status } = await axiosService.post('/auth/register/', {
         username: username,
         email: email,
         password: password,
         confirm_password: confirm_password,
      });
      return status;
   };

   const verify: IVerifyFunc = async (vcode, email) => {
      const response = await axiosService.post('/user/verify/', {
         activation_code: vcode,
         email: email,
      });
      const { data } = response;
      const { status } = data;

      if (typeof status === 'boolean') {
         setUser((prevState: IUser | undefined) => {
            if (!prevState) return undefined;
            return {
               ...prevState,
               is_verified: status,
            };
         });
      }
      return data;
   };

   const updateProfile: IUpdateUserFunc = async (data) => {
      console.log(data);
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
         register,
         verify,
         updateProfile,
      };
   }, [user, accessToken, csrfToken]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
