import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App'; // Ensure you're importing App properly

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // TypeScript: Ensure correct type for root element
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
