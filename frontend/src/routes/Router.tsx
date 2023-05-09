import {ElementType, lazy, ReactNode, Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';

import PageLoading from 'components/PageLoading';
import Layout from 'layouts/Layout';
import {AuthProvider} from 'contexts/AuthContext';
import {PrivateRoute, GuestRoute} from 'routes/GuardRoutes';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Home = lazy(() => import('pages/Home'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));

interface IRoutes {
   path: string;
   element: ReactNode;
}

type TGuard = 'Guest' | 'Private';

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
                     <GuestRoute>
                        <Component/>
                     </GuestRoute>
                  )}
               </>
            )}
         </Layout>
      </AuthProvider>
   </Suspense>
);

const routes: IRoutes[] = [
   {path: '/', element: getRouteElement(Home)},
   {path: 'login', element: getRouteElement(Login, 'Guest')},
   {path: 'register', element: getRouteElement(Register, 'Guest')},
   {path: '*', element: getRouteElement(PageNotFound)},
];

export default createBrowserRouter(routes);
