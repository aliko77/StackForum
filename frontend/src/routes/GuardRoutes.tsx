import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

type IPrivateRoute = {
   children: JSX.Element;
};

export const PrivateRoute = ({ children }: IPrivateRoute) => {
   const { user } = useAuth();
   const location = useLocation();

   const navState: object = {
      from: location.pathname,
   };

   if (!user) {
      return <Navigate to="/login" state={navState} replace />;
   }
   return children;
};

export const PublicRoute = ({ children }: IPrivateRoute) => {
   const { user } = useAuth();
   if (user) {
      return <Navigate to="/" replace />;
   }
   return children;
};
