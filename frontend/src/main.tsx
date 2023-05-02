import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from 'store';
import './index.css';
import App from 'App';
import 'common/language/i18n';
import { AuthProvider } from 'contexts/AuthContext';

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <AuthProvider>
               <App />
            </AuthProvider>
         </PersistGate>
      </Provider>
   </React.StrictMode>,
);
