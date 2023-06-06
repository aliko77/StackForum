import { ElementType, lazy, ReactNode, Suspense, ReactElement } from 'react';
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
const PasswordForgot = lazy(() => import('pages/Auth/Password/Forgot'));
const PasswordReset = lazy(() => import('pages/Auth/Password/Reset'));
const ControlPanel = lazy(() => import('pages/ControlPanel'));
const ProfilEdit = lazy(() => import('pages/Profil/Edit'));
const ProfilCustomize = lazy(() => import('pages/Profil/Customize'));
const ProfilAvatar = lazy(() => import('pages/Profil/Avatar'));
const ProfilPassword = lazy(() => import('pages/Profil/Password'));
const ProfilEmail = lazy(() => import('pages/Profil/Email'));
const ProfilSignature = lazy(() => import('pages/Profil/Signature'));
const ProfilLoginLogs = lazy(() => import('pages/Profil/LoginLogs'));
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
            <Layout>
               <Component />
            </Layout>
         </PersistLogin>
      </AuthProvider>
   </Suspense>
);

const routes: RouteProps[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login/', element: getRouteElement(() => <GuestRoute>{<Login />}</GuestRoute>) },
   { path: 'register/', element: getRouteElement(() => <GuestRoute>{<Register />}</GuestRoute>) },
   {
      path: 'auth/password/forgot/',
      element: getRouteElement(() => <GuestRoute>{<PasswordForgot />}</GuestRoute>),
   },
   {
      path: 'auth/password/reset/:uid/:token/',
      element: getRouteElement(() => <GuestRoute>{<PasswordReset />}</GuestRoute>),
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
   {
      path: 'profil/email/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilEmail />}</PrivateRoute>),
   },
   {
      path: 'profil/imza/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilSignature />}</PrivateRoute>),
   },
   {
      path: 'profil/giris-kayitlari/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilLoginLogs />}</PrivateRoute>),
   },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
