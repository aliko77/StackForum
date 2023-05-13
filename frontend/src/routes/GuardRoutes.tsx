import { useAuth } from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

type IPrivateRoute = {
   children: JSX.Element;
   verify?: boolean;
};

export const PrivateRoute = ({ children, verify }: IPrivateRoute) => {
   const { user } = useAuth();
   const location = useLocation();
   const navState: object = {
      from: location.pathname,
   };

   if (!user) {
      return <Navigate to="/login" state={navState} replace />;
   } else if (verify && location.pathname != '/account/verify') {
      return <Navigate to="/account/verify" state={navState} replace />;
   }

   return children;
};

export const GuestRoute = ({ children }: IPrivateRoute) => {
   const { user } = useAuth();
   if (user) {
      return <Navigate to="/" replace />;
   }

   return children;
};
