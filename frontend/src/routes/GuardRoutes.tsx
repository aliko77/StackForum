import { IChildrenProp } from 'types';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
   const { user } = useAuth();
   if (!user) {
      return <Navigate to="/login" replace />;
   }
   return children;
};

export const PublicRoute = ({ children }: IChildrenProp) => {
   const { user } = useAuth();

   if (user) {
      return <Navigate to="/" replace />;
   }

   return <>{children}</>;
};
