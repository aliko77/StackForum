import { useAuth } from 'hooks/useAuth';
import Unauthorized from 'pages/Unauthorized';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
   children: JSX.Element;
};

type AuthorizationProps = {
   permissions: Array<string>;
} & PrivateRouteProps;

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
   const { accessToken, user } = useAuth();

   if (!accessToken || !user) {
      return <Navigate to="/login/" state={{ path: location.pathname }} replace />;
   } else if (!location.pathname.includes('auth/verify') && user && !user.is_verified) {
      return <Navigate to="/auth/verify/" state={{ path: location.pathname }} replace />;
   }
   return children;
};

export const GuestRoute = ({ children }: PrivateRouteProps) => {
   const { accessToken, user } = useAuth();

   return accessToken || user ? <Navigate to="/" replace /> : children;
};

export const Authorization = ({ permissions, children }: AuthorizationProps) => {
   const { accessToken, user, isAllow } = useAuth();
   const location = useLocation();

   if (user && accessToken) {
      const isAllowed = isAllow(permissions);
      return isAllowed ? children : <Unauthorized />;
   }
   return <Navigate to="/login/" state={{ path: location.pathname }} replace />;
};
