import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import { Provider } from 'react-redux';
import store from 'stores';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Provider store={store}>
      <RouterProvider router={Router} />
   </Provider>,
);
