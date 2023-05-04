import { RouterProvider } from 'react-router-dom';
import Root from 'routes/Root';
import Router from 'routes/Router';

const App: React.FC = () => {
   return (
      <Root>
         <RouterProvider router={Router} />;
      </Root>
   );
};

export default App;
