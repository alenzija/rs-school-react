import { ReactNode, useCallback, useState } from 'react';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Layout from '../layout';
import PlanetDescription from '../planet-description';
import Page404 from '../404';

import './app.scss';

const App = (): ReactNode => {
  const [loading, setLoading] = useState(true);

  const changeLoading = useCallback((value: boolean): void => {
    setLoading(value);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout loading={loading} onChangeLoading={changeLoading} />}
        errorElement={<Page404 />}
      >
        <Route path="/planets/:name" element={<PlanetDescription />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
