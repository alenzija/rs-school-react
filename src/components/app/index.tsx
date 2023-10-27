import StapiService from '../../services/swapi-service';
import PlanetsList from '../planets-list';

import './app.scss';

function App() {
  StapiService.getAllPlanets().then(console.log);
  return (
    <div className="container">
      <PlanetsList />
    </div>
  );
}

export default App;
