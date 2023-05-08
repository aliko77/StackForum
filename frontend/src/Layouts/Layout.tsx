import Footer from 'components/Footer';
import Header from 'components/Header';
import { IChildrenProp } from 'types';

const Layout = ({ children }: IChildrenProp) => {
   return (
      <>
         <Header />
         <main className="content dark:bg-night-100">{children}</main>
         <Footer />
      </>
   );
};

export default Layout;
