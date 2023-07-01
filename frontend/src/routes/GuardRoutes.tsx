import { useAuth } from 'hooks/useAuth';
import Unauthorized from 'pages/Unauthorized';
import { Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
   children: JSX.Element;
};

type AuthorizationProps = {
   permissions?: Array<string>;
} & PrivateRouteProps;

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
   const { accessToken, user } = useAuth();
   const location = useLocation();

   if (!accessToken) {
      return <Navigate to="/login/" state={{ path: location.pathname }} replace />;
   } else if (!location.pathname.includes('auth/verify') && !user?.is_verified) {
      return <Navigate to="/auth/verify/" state={{ path: location.pathname }} replace />;
   }
   return children;
};

export const GuestRoute = ({ children }: PrivateRouteProps) => {
   const { accessToken } = useAuth();

   return accessToken ? <Navigate to="/" replace /> : children;
};

export const Authorization = ({ permissions, children }: AuthorizationProps) => {
   const { user } = useAuth();
   const location = useLocation();

   if (user) {
      const userpermission = user.auth_groups;
      const isAllowed = permissions?.some((allowed) => userpermission.includes(allowed));
      return isAllowed ? children : <Unauthorized />;
   }
   return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};
