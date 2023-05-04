import PageLoading from 'components/page-loading';
import Page from 'components/page';
import Header from 'components/header';
import Footer from 'components/footer';
import { Suspense } from 'react';
import { ReactChildrenResponse } from 'types';

const Root = ({ children }: ReactChildrenResponse) => {
   return (
      <Suspense fallback={<PageLoading />}>
         <Header />
         <Page>{children}</Page>
         <Footer />
      </Suspense>
   );
};

export default Root;
