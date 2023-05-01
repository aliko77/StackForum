import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';
import { Theme } from 'store/slices/appSlice';

const App: React.FC = () => {
   const { theme } = useSelector((state: RootState) => state.app);

   useEffect(() => {
      if (theme === Theme.Dark) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, []);

   return <RouterProvider router={Router} />;
};

export default App;
