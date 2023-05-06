/* eslint-disable @typescript-eslint/no-empty-function */
import axiosService from 'api/axios';
import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginProp } from 'types';
import { useLocalStorage } from 'usehooks-ts';

interface IAuthContextType {
   user: object | null;
   tokens: {
      access: string | null;
      refresh: string | null;
   };
   login: (data: ILoginProp) => Promise<void>;
   logout: () => void;
}

export const AuthContext = createContext<IAuthContextType>({
   user: null,
   tokens: {
      access: null,
      refresh: null,
   },
   login: async () => {},
   logout: () => {},
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const [user, setUser] = useLocalStorage('user', null);
   const [tokens, setTokens] = useLocalStorage('tokens', { access: null, refresh: null });
   const navigate = useNavigate();

   const login = async (data: ILoginProp) => {
      const response = await axiosService.post('/auth/login/', data);
      setUser(response.data);
      // navigate('/');
   };

   const logout = () => {
      setUser(null);
      setTokens({ access: null, refresh: null });
      navigate('/', { replace: true });
   };

   const value = useMemo(
      () => ({
         user,
         tokens,
         login,
         logout,
      }),
      [user],
   );
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
