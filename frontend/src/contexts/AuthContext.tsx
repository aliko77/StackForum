import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IChildrenProp } from 'types';
import { useLocalStorage } from 'usehooks-ts';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: IChildrenProp) => {
   const [user, setUser] = useLocalStorage('user', {});
   const navigate = useNavigate();

   // call this function when you want to authenticate the user
   const login = async (data: any) => {
      setUser((prevValue: object) => !prevValue);
      navigate('/profile');
   };

   const logout = () => {
      setUser(null);
      navigate('/', { replace: true });
   };

   const value = useMemo(
      () => ({
         user,
         login,
         logout,
      }),
      [user],
   );
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   return useContext(AuthContext);
};
