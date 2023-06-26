import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import ScrollButton from 'components/ScrollButton';
import { AuthProvider } from 'contexts';
import UseColorScheme from 'hooks/useColorScheme';
import { useTheme } from 'hooks/useTheme';
import { StrictMode, useEffect } from 'react';
import { PersistLogin } from 'routes/PersistLogin';
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
         <AuthProvider>
            <PersistLogin>
               <Header />
               <StrictMode>
                  <main className="content bg-white dark:bg-night-700">{children}</main>
                  <ScrollButton />
               </StrictMode>
               <Footer />
            </PersistLogin>
         </AuthProvider>
      </>
   );
};

export default Layout;
