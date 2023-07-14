import { ElementType, lazy, ReactNode, Suspense, ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageLoading } from 'components/PageLoading';
import { GuestRoute, PrivateRoute } from 'routes/GuardRoutes';
import Layout from 'layouts/Layout';
import { admin_routes } from './AdminRouter';
import { QuestionTags } from 'pages/QuestionTags';

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
const ProfilSignature = lazy(() => import('pages/Profil/Signature'));
const SettingsPassword = lazy(() => import('pages/Settings/Password'));
const SettingsEmail = lazy(() => import('pages/Settings/Email'));
const SettingsLoginLogs = lazy(() => import('pages/Settings/LoginRecords'));
const SocialBlocked = lazy(() => import('pages/Social/Blocked'));
const SocialFriends = lazy(() => import('pages/Social/Friends'));
//404
const PageNotFound = lazy(() => import('pages/PageNotFound'));

export type RouteProps = {
   path: string;
   element: ReactNode;
};

const getRouteElement = (Component: ElementType): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <Layout>
         <Component />
      </Layout>
   </Suspense>
);

const routes: RouteProps[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login/', element: getRouteElement(Login) },
   { path: 'register/', element: getRouteElement(Register) },
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
      path: 'profil/imza/',
      element: getRouteElement(() => <PrivateRoute>{<ProfilSignature />}</PrivateRoute>),
   },
   {
      path: 'ayarlar/sifre/',
      element: getRouteElement(() => <PrivateRoute>{<SettingsPassword />}</PrivateRoute>),
   },
   {
      path: 'ayarlar/email/',
      element: getRouteElement(() => <PrivateRoute>{<SettingsEmail />}</PrivateRoute>),
   },
   {
      path: 'ayarlar/giris-kayitlari/',
      element: getRouteElement(() => <PrivateRoute>{<SettingsLoginLogs />}</PrivateRoute>),
   },
   {
      path: 'sosyal/engellenenler/',
      element: getRouteElement(() => <PrivateRoute>{<SocialBlocked />}</PrivateRoute>),
   },
   {
      path: 'sosyal/arkadaslar/',
      element: getRouteElement(() => <PrivateRoute>{<SocialFriends />}</PrivateRoute>),
   },
   {
      path: 'etiketler/',
      element: getRouteElement(QuestionTags),
   },
   ...admin_routes,
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
