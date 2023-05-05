import Layout from 'pages/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import NoPage from 'pages/not-found/NotFound';

// import PageLoading from 'components/page-loading/PageLoading';
// import { Suspense} from 'react';

const Home = lazy(() => import('pages/home'));
const Login = lazy(() => import('pages/login'));

const App: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
         </Route>
      </Routes>
   );
};

export default App;
