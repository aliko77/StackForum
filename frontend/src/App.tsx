import Footer from 'components/footer/Footer';
import Header from 'components/header';
import Page from 'components/page/Page';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';

const App: React.FC = () => {
   return (
      <>
         <Header />
         <Page>
            <RouterProvider router={Router} />
         </Page>
         <Footer />
      </>
   );
};

export default App;
