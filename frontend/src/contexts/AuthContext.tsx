import { Dispatch, SetStateAction, createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import { IReactChildren, ILoginFunc, IRegisterFunc, IUser, IVerifyFunc } from 'types';
import { AxiosError } from 'axios';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';
interface IAuthContext {
   user?: IUser;
   setUser: Dispatch<SetStateAction<IUser | undefined>>;
   accessToken?: string;
   setAccessToken: Dispatch<SetStateAction<string | undefined>>;
   csrfToken?: string;
   setCsrfToken: Dispatch<SetStateAction<string | undefined>>;
   login: ILoginFunc;
   register: IRegisterFunc;
   logout: () => void;
   verify: IVerifyFunc;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IReactChildren) => {
   const navigate = useNavigate();
   const axiosPrivateI = useAxiosPrivate();

   const [user, setUser] = useState<IUser>();
   const [accessToken, setAccessToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();

   const login: ILoginFunc = async (email, password) => {
      const { data, headers } = await axiosService.post('/auth/login/', {
         email: email,
         password: password,
      });
      const { access_token, user } = data;
      setAccessToken(access_token);
      setCsrfToken(headers['x-csrftoken']);
      setUser(user);
      navigate('/');
   };

   const logout = async (): Promise<void> => {
      try {
         await axiosPrivateI.post('/auth/logout/');
         setAccessToken(undefined);
         setCsrfToken(undefined);
         setUser(undefined);
      } catch (error: unknown) {
         error instanceof AxiosError && console.debug('[Error]', error.response?.data);
      }
   };

   const register: IRegisterFunc = async (
      email,
      password,
      confirm_password,
      first_name,
      last_name,
   ) => {
      const { data, headers } = await axiosService.post('/auth/register/', {
         email: email,
         password: password,
         confirm_password: confirm_password,
         first_name: first_name,
         last_name: last_name,
      });
      const { access_token, user } = data;
      setAccessToken(access_token);
      setCsrfToken(headers['x-csrftoken']);
      setUser(user);
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
            if (!prevUser) return undefined;
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
         setUser,
         accessToken,
         setAccessToken,
         csrfToken,
         setCsrfToken,
         login,
         logout,
         register,
         verify,
      };
   }, [user, accessToken, csrfToken]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
