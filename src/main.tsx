import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import PlanetDescription, {
  planetDescriptionLoader,
} from './components/planet-description';
import Page404 from './components/404';

import { planetListLoader } from './components/planets-list';

import './index.css';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<Page404 />}
      loader={planetListLoader}
    >
      <Route
        path="/planets/:name"
        element={<PlanetDescription />}
        loader={planetDescriptionLoader}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
