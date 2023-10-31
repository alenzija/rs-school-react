import { ReactNode, useCallback, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import './app.scss';
import Layout from '../layout';

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
      ></Route>
    </Routes>
  );
};

export default App;
