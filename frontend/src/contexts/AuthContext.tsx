import axiosService from 'api/axios';
import { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProp, ILoginProp } from 'types';
import { useLocalStorage } from 'usehooks-ts';
import { useState } from 'react';

interface IAuthContextType {
   user: object | null;
   tokens: {
      access: string | null;
      refresh: string | null;
   };
   loading: boolean;
   login: (data: ILoginProp) => Promise<void>;
   logout: () => void;
}

export const AuthContext = createContext<IAuthContextType>({
   user: null,
   tokens: {
      access: null,
      refresh: null,
   },
   loading: false,
   login: async () => {
      //
   },
   logout: () => {
      //
   },
});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useLocalStorage('user', null);
   const [tokens, setTokens] = useLocalStorage('tokens', { access: null, refresh: null });
   const navigate = useNavigate();

   const login = async (data: ILoginProp) => {
      setLoading(true);
      try {
         const response = await axiosService.post('/auth/login/', data);
         setUser(response.data);
         navigate('/profile');
      } catch (error) {
         console.log(error);
      } finally {
         // setLoading(false);
      }
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
         loading,
         login,
         logout,
      }),
      [user],
   );
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
