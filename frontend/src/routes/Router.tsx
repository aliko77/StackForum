import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('pages/home'));
const PageNotFound = lazy(() => import('pages/not-found'));
const Login = lazy(() => import('pages/login'));

const Router = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<Home />}>
         <Route path="login" element={<Login />} />
         <Route path="*" element={<PageNotFound />} />,
      </Route>,
   ),
);

export default Router;
