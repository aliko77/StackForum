import { Dispatch, SetStateAction, createContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosService } from 'api/axios/axios';
import { IReactChildren, ILoginFunc, IRegisterFunc, IUser, IVerifyFunc } from 'types';
import { AxiosError } from 'axios';

interface IAuthContext {
   user?: IUser;
   setUser: Dispatch<SetStateAction<IUser | undefined>>;
   accessToken?: string;
   setAccessToken: Dispatch<SetStateAction<string | undefined>>;
   refreshToken?: string;
   setRefreshToken: Dispatch<SetStateAction<string | undefined>>;
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

   const [user, setUser] = useState<IUser>();
   const [accessToken, setAccessToken] = useState<string>();
   const [refreshToken, setRefreshToken] = useState<string>();
   const [csrfToken, setCsrfToken] = useState<string>();

   useEffect(() => {
      accessToken && console.log('accessToken:', accessToken);
      refreshToken && console.log('refreshToken:', refreshToken);
      csrfToken && console.log('csrfToken:', csrfToken);
   }, [accessToken, refreshToken, csrfToken]);

   const login: ILoginFunc = async (email, password) => {
      const { data, headers } = await axiosService.post('/auth/login/', {
         email: email,
         password: password,
      });
      const { access_token, refresh_token } = data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setCsrfToken(headers['X-CSRFToken']);
      navigate('/');
   };

   const logout = async (): Promise<void> => {
      try {
         await axiosService.post(
            '/auth/logout/',
            {},
            {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            },
         );
      } catch (error: AxiosError | unknown) {
         error instanceof AxiosError && console.log(error?.response?.data);
      } finally {
         setAccessToken(undefined);
         setRefreshToken(undefined);
         setCsrfToken(undefined);
         setUser(undefined);
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
      const { access_token } = data;
      setAccessToken(access_token);
      setCsrfToken(headers['X-CSRFToken']);
      navigate('/auth/verify');
   };

   //TODO
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
         refreshToken,
         setRefreshToken,
         csrfToken,
         setCsrfToken,
         login,
         logout,
         register,
         verify,
      };
   }, [user, accessToken, refreshToken, csrfToken]);

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
