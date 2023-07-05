import { ElementType, ReactElement, Suspense } from 'react';
import { RouteProps } from './Router';
import { PageLoading } from 'components/PageLoading';
import Layout from 'layouts/Layout';
import { Authorization, PrivateRoute } from './GuardRoutes';
import MainTopics from 'pages/Admin/MainTopics';
import PERMISSIONS from 'permissions/Permissions';
import AdminHome from 'pages/Admin';

const getAdminRouteElement = (Component: ElementType, permissions: string[] = []): ReactElement => (
   <Suspense fallback={<PageLoading />}>
      <Layout>
         <PrivateRoute>
            <Authorization permissions={permissions}>
               <Component />
            </Authorization>
         </PrivateRoute>
      </Layout>
   </Suspense>
);

export const admin_routes: RouteProps[] = [
   {
      path: 'admin/dashboard/',
      element: getAdminRouteElement(() => <AdminHome />, [PERMISSIONS.COMA]),
   },
   {
      path: 'admin/konu-etiketleri/',
      element: getAdminRouteElement(() => <MainTopics />, [PERMISSIONS.COMA, PERMISSIONS.MOD]),
   },
];
