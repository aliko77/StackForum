import { ElementType, lazy, ReactNode, Suspense, ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PageLoading } from 'components/PageLoading';
import Layout from 'layouts/Layout';
import { AuthProvider } from 'contexts/AuthContext';
import { GuestRoute, PrivateRoute } from 'routes/GuardRoutes';
import { CookiesProvider } from 'react-cookie';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const AuthVerify = lazy(() => import('pages/Auth/Verify'));
const PasswordReset = lazy(() => import('pages/Auth/Password/Reset'));
const PasswordChange = lazy(() => import('pages/Auth/Password/Change'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

interface IRoutes {
   path: string;
   element: ReactNode;
}

const getRouteElement = (Component: ElementType): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <CookiesProvider>
         <AuthProvider>
            <Layout>
               <Component />
            </Layout>
         </AuthProvider>
      </CookiesProvider>
   </Suspense>
);

const routes: IRoutes[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login', element: getRouteElement(() => <GuestRoute>{<Login />}</GuestRoute>) },
   { path: 'register', element: getRouteElement(() => <GuestRoute>{<Register />}</GuestRoute>) },
   {
      path: 'auth/password/reset',
      element: getRouteElement(() => <GuestRoute>{<PasswordReset />}</GuestRoute>),
   },
   {
      path: '/auth/password/change/:uid/:token',
      element: getRouteElement(() => <GuestRoute>{<PasswordChange />}</GuestRoute>),
   },
   {
      path: 'auth/verify',
      element: getRouteElement(() => <PrivateRoute>{<AuthVerify />}</PrivateRoute>),
   },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
