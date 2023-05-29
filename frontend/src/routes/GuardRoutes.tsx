import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

type IPrivateRoute = {
   children: JSX.Element;
   verify?: boolean;
};

export const PrivateRoute = ({ children, verify }: IPrivateRoute) => {
   const { accessToken } = useAuth();
   const location = useLocation();

   const nav_state: object = {
      from: location.pathname,
   };

   if (!accessToken) {
      return <Navigate to="/login/" state={nav_state} replace />;
   } else if (verify && location.pathname != '/auth/verify') {
      return <Navigate to="/auth/verify/" state={nav_state} replace />;
   }
   return children;
};

export const GuestRoute = ({ children }: IPrivateRoute) => {
   const { accessToken } = useAuth();

   return accessToken ? <Navigate to="/" replace /> : children;
};
