import { AuthContext } from 'contexts/AuthContext';
import { useContext, useDebugValue } from 'react';

export const useAuth = () => {
   const { user } = useContext(AuthContext);
   useDebugValue(user, (user) => (user ? 'Logged In' : 'Logged Out'));
   return useContext(AuthContext);
};
