import { Component } from 'react';

import Planet from '../../types/planet';

class PlanetsItem extends Component<Planet> {
  render() {
    const { name, population, climate, terrain } = this.props;
    return (
      <div key={name}>
        <div>Name {name}</div>
        <div>Population {population}</div>
        <div>Climate {climate}</div>
        <div>Terrain {terrain}</div>
      </div>
    );
  }
}

export default PlanetsItem;
