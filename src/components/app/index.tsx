import { ReactNode, useCallback, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Layout from '../layout';
import PlanetDescription from '../planet-description';

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
    </Routes>
  );
};

export default App;
