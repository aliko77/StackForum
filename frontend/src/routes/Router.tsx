import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/page-loading/PageLoading';
import Page from 'components/page/Page';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

import paths from 'routes/paths';

const Home = lazy(() => import('pages/home/Home'));
const PageNotFound = lazy(() => import('pages/not-found/NotFound'));
const Login = lazy(() => import('pages/login/Login'));

interface Routes {
   path: string;
   element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
   <Suspense fallback={<PageLoading />}>
      <Header />
      <Page>
         <Component />
      </Page>
      <Footer />
   </Suspense>
);

const routes: Routes[] = [
   { path: paths.HOME, element: getRouteElement(Home) },
   { path: paths.LOGIN, element: getRouteElement(Login) },
   { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
