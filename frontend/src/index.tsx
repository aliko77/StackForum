import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <StrictMode>
      <RouterProvider router={Router} />
   </StrictMode>,
);
