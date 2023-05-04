import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { ReactChildrenResponse } from 'types';

const PrivateRoute = ({ children }: ReactChildrenResponse) => {
   const { isAuth } = useAuth();
   const location = useLocation();
   return <>{isAuth ? children : <Navigate to={'/login'} replace state={{ location }} />}</>;
};
export default PrivateRoute;
