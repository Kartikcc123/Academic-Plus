import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import { store } from './redux/store';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '';

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

if (import.meta.env.PROD) {
  registerSW({
    onNeedRefresh() {
      console.log('New content available, refresh required.');
    },
    onOfflineReady() {
      console.log('App is ready to work offline.');
    },
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
