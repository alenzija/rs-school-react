import StapiService from '../../services/swapi-service';
import PlanetsList from '../planets-list';

import './app.scss';

function App() {
  StapiService.getAllPlanets().then(console.log);
  return (
    <>
      <PlanetsList />
    </>
  );
}

export default App;
