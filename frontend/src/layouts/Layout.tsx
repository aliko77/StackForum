import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { IReactChildren } from 'types';

const Layout = ({ children }: IReactChildren) => {
   return (
      <>
         <Header />
         <main className="content dark:bg-night-100">{children}</main>
         <Footer />
      </>
   );
};

export default Layout;
