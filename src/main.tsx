import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './index.css';
import ErrorBoundary from './components/error-boundary';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
