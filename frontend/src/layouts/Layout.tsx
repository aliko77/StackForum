import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import UseColorScheme from 'hooks/useColorScheme';
import { useTheme } from 'hooks/useTheme';
import { useEffect } from 'react';
import { ReactChildrenProps } from 'types';

const Layout = ({ children }: ReactChildrenProps) => {
   const { theme } = useTheme();
   const { colorScheme } = UseColorScheme();

   useEffect(() => {
      if (theme === 'default') {
         document.body.className = colorScheme;
      } else {
         document.body.className = theme;
      }
   }, [theme, colorScheme]);

   return (
      <>
         <Header />
         <main className="content bg-white dark:bg-night-700">{children}</main>
         <Footer />
      </>
   );
};

export default Layout;
