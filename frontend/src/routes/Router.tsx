import {ElementType, lazy, ReactNode, Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';

import PageLoading from 'components/PageLoading';
import Layout from 'layouts/Layout';
import {AuthProvider} from 'contexts/AuthContext';
import {PrivateRoute, PublicRoute} from 'routes/GuardRoutes';

const Login = lazy(() => import('pages/Login'));
const Home = lazy(() => import('pages/Home'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

interface IRoutes {
   path: string;
   element: ReactNode;
}

type TGuard = 'Public' | 'Private';

const getRouteElement = (
   Component: ElementType,
   guard: TGuard | null = null,
): ReactNode => (
   <Suspense fallback={<PageLoading/>}>
      <AuthProvider>
         <Layout>
            {guard === null ? (
               <Component/>
            ) : (
               <>
                  {guard === 'Private' ? (
                     <PrivateRoute>
                        <Component/>
                     </PrivateRoute>
                  ) : (
                     <PublicRoute>
                        <Component />
                     </PublicRoute>
                  )}
               </>
            )}
         </Layout>
      </AuthProvider>
   </Suspense>
);

const routes: IRoutes[] = [
   { path: '/', element: getRouteElement(Home) },
   { path: 'login', element: getRouteElement(Login) },
   { path: '*', element: getRouteElement(PageNotFound) },
];

export default createBrowserRouter(routes);
