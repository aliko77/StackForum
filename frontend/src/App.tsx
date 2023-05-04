import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';

const App: React.FC = () => {
   return <RouterProvider router={Router} />;
};

export default App;
