import { ReactNode, useCallback, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from '../layout';
import PlanetDescription from '../planet-description';
import Page404 from '../404';

import './app.scss';

const App = (): ReactNode => {
  const [loading, setLoading] = useState(true);

  const changeLoading = useCallback((value: boolean): void => {
    setLoading(value);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout loading={loading} onChangeLoading={changeLoading} />}
      >
        <Route path="/planets/:name" element={<PlanetDescription />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
