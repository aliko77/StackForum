import useAuth from 'hooks/useAuth';
import { createContext, useContext, useState } from 'react';

interface ChildrenProps {
   children: React.ReactNode | React.ReactNode[];
}

const AuthContext = createContext({});

const AuthProvider = ({ children }: ChildrenProps) => {
   const user = useAuth();
   const [auth, setAuth] = useState({});

   return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
