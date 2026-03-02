import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';
import { registerSW } from 'virtual:pwa-register';

// Set default API URL (Vite proxy handles the localhost:5000 part in dev mode)
axios.defaults.baseURL = 'http://localhost:5000';

const updateSW = registerSW({
  onNeedRefresh() { console.log('New content available, refresh required.'); },
  onOfflineReady() { console.log('App is ready to work offline.'); },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);