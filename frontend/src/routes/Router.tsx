import { ElementType, lazy, ReactNode, Suspense, ReactElement, StrictMode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageLoading } from 'components/PageLoading';
import { AuthProvider } from 'contexts/AuthContext';
import { PersistLogin } from 'routes/PersistLogin';
import { GuestRoute, PrivateRoute } from 'routes/GuardRoutes';
import Layout from 'layouts/Layout';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const AuthVerify = lazy(() => import('pages/Auth/Verify'));
const PasswordReset = lazy(() => import('pages/Auth/Password/Reset'));
const PasswordChange = lazy(() => import('pages/Auth/Password/Change'));
const ControlPanel = lazy(() => import('pages/ControlPanel'));
const ProfilEdit = lazy(() => import('pages/Profil/Edit'));
const ProfilCustomize = lazy(() => import('pages/Profil/Customize'));
const ProfilAvatar = lazy(() => import('pages/Profil/Avatar'));
const ProfilPassword = lazy(() => import('pages/Profil/Password'));
//404
const PageNotFound = lazy(() => import('pages/PageNotFound'));

type RouteProps = {
   path: string;
   element: ReactNode;
};

const getRouteElement = (Component: ElementType): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <AuthProvider>
         <PersistLogin>
            <StrictMode>
               <Layout>
                  <Component />
               </Layout>
            </StrictMode>
         </PersistLogin>
      </AuthProvider>
   </Suspense>
);

const routes: RouteProps[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login/', element: getRouteElement(() => <GuestRoute>{<Login />}</GuestRoute>) },
   { path: 'register/', element: getRouteElement(() => <GuestRoute>{<Register />}</GuestRoute>) },
   {
      path: 'auth/password/reset/',
      element: getRouteElement(() => <GuestRoute>{<PasswordReset />}</GuestRoute>),
   },
   {
      path: 'auth/password/change/:uid/:token/',
      element: getRouteElement(() => <GuestRoute>{<PasswordChange />}</GuestRoute>),
   },
   {
      path: 'auth/verify/',
      element: getRouteElement(() => <PrivateRoute>{<AuthVerify />}</PrivateRoute>),
   },
   {
      path: 'kontrol-paneli/',
      element: getRouteElement(() => <PrivateRoute>{<ControlPanel />}</PrivateRoute>),
   },
   {
      path: 'profil/duzenle/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilEdit />}</PrivateRoute>),
   },
   {
      path: 'profil/ozellestir/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilCustomize />}</PrivateRoute>),
   },
   {
      path: 'profil/avatar/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilAvatar />}</PrivateRoute>),
   },
   {
      path: 'profil/sifre/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilPassword />}</PrivateRoute>),
   },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
