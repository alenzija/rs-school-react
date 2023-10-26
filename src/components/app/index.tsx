import StapiService from '../../services/swapi-service';
import ErrorMessage from '../error-message';
import Spinner from '../spinner';

import './app.scss';

function App() {
  StapiService.getAllPlanets().then(console.log);
  return (
    <>
      <Spinner />
      <ErrorMessage />
    </>
  );
}

export default App;
