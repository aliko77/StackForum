import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';
import './index.css';
import App from 'App';
import 'common/language/i18n';
import { AuthProvider } from 'contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <AuthProvider>
            <App />
         </AuthProvider>
      </Provider>
   </React.StrictMode>,
);
