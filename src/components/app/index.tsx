import { ReactNode } from 'react';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  defer,
} from 'react-router-dom';

import Layout from '../layout';
import PlanetDescription from '../planet-description';
import Page404 from '../404';

import { getPlanetList } from '../planets-list';
import { DeferredData } from '@remix-run/router/dist/utils';

import './app.scss';

const planetListLoader = async ({
  request,
}: {
  request: Request;
}): Promise<DeferredData> => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;
  return defer({ res: getPlanetList({ search, page }) });
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<Page404 />}
      loader={planetListLoader}
    >
      <Route path="/planets/:name" element={<PlanetDescription />} />
    </Route>
  )
);

const App = (): ReactNode => {
  // const [loading, setLoading] = useState(true);

  // const changeLoading = useCallback((value: boolean): void => {
  //   setLoading(value);
  // }, []);

  return <RouterProvider router={router} />;
};

export default App;
