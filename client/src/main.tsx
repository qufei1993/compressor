import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AppContextProviders from './contexts';
import { store } from './store';
import App from './App';
import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root as Element).render(
  <React.StrictMode>
    <AppContextProviders>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProviders>
  </React.StrictMode>
);
