import { ElementType, lazy, ReactNode, Suspense, ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/PageLoading';
import Layout from 'layouts/Layout';
import { AuthProvider } from 'contexts/AuthContext';
import { GuestRoute } from 'routes/GuardRoutes';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

interface IRoutes {
   path: string;
   element: ReactNode;
}

const getRouteElement = (Component: ElementType): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <AuthProvider>
         <Layout>
            <Component />
         </Layout>
      </AuthProvider>
   </Suspense>
);

const routes: IRoutes[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login', element: getRouteElement(() => <GuestRoute>{<Login />}</GuestRoute>) },
   { path: 'register', element: getRouteElement(() => <GuestRoute>{<Register />}</GuestRoute>) },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
