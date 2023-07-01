import { ElementType, ReactElement, Suspense } from 'react';
import { RouteProps } from './Router';
import { PageLoading } from 'components/PageLoading';
import Layout from 'layouts/Layout';
import { Authorization, PrivateRoute } from './GuardRoutes';
import MainTopics from 'pages/Admin/MainTopics';
import PERMISSIONS from 'permissions/Permissions';
import AdminPanel from 'layouts/AdminPanel';
import AdminHome from 'pages/Admin';

const getAdminRouteElement = (Component: ElementType, permissions?: string[]): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <Layout>
         <PrivateRoute>
            <AdminPanel>
               <Authorization permissions={permissions}>
                  <Component />
               </Authorization>
            </AdminPanel>
         </PrivateRoute>
      </Layout>
   </Suspense>
);

export const admin_routes: RouteProps[] = [
   {
      path: 'admin/',
      element: getAdminRouteElement(() => <AdminHome />, [PERMISSIONS.MOD]),
   },
   {
      path: 'admin/ana-konu-basliklari/',
      element: getAdminRouteElement(() => <MainTopics />),
   },
];
