import { Outlet } from 'react-router-dom';
import Header from 'components/header';
import Footer from 'components/footer';

const Layout = () => {
   return (
      <>
         <Header />
         <main className="content dark:bg-night">
            <Outlet />
         </main>
         <Footer />
      </>
   );
};

export default Layout;
