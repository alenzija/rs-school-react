import { Component } from 'react';

import Planet from '../../types/planet';
import PlanetsItem from '../planets-item';
import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';

type PlanetsListState = Readonly<{
  planets: Planet[];
  loading: boolean;
  error: boolean;
}>;

class PlanetsList extends Component<Readonly<object>, PlanetsListState> {
  state: PlanetsListState = {
    planets: [],
    loading: true,
    error: false,
  };

  componentDidMount(): void {
    SwapiService.getAllPlanets().then((data) => {
      this.setState({ planets: data, loading: false });
    });
  }

  render() {
    const { planets, loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div>
        {planets.map((planet) => (
          <PlanetsItem
            key={planet.name}
            name={planet.name}
            population={planet.population}
            climate={planet.climate}
            terrain={planet.terrain}
          />
        ))}
      </div>
    );
  }
}

export default PlanetsList;
