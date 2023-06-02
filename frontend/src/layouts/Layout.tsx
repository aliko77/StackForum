import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { ReactChildrenProps } from 'types';

const Layout = ({ children }: ReactChildrenProps) => {
   return (
      <>
         <Header />
         <main className="content dark:bg-night-100">{children}</main>
         <Footer />
      </>
   );
};

export default Layout;
