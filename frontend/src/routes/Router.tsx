import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/PageLoading';
import Layout from 'layouts/Layout';

const Login = lazy(() => import('pages/Login'));
const Home = lazy(() => import('pages/Home'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

interface IRoutes {
   path: string;
   element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
   <Suspense fallback={<PageLoading />}>
      <Layout>
         <Component />
      </Layout>
   </Suspense>
);

const routes: IRoutes[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login', element: getRouteElement(Login) },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
