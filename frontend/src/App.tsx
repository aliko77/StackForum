import useTheme from 'hooks/useTheme';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import { Theme } from 'types';

const App: React.FC = () => {
   const { theme } = useTheme();
   if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
   } else {
      document.documentElement.classList.remove('dark');
   }
   return <RouterProvider router={Router} />;
};

export default App;
