import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/page-loading';
import Page from 'components/page';
import Header from 'components/header';
import Footer from 'components/footer';

import paths from 'routes/paths';

const Home = lazy(() => import('pages/home'));
const PageNotFound = lazy(() => import('pages/not-found'));
const Login = lazy(() => import('pages/login'));

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
