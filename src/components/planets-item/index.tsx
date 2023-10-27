import { Component } from 'react';
import Planet from '../../types/planet';

import './planets-item.scss';

class PlanetsItem extends Component<Readonly<Planet>> {
  render() {
    const { name, population, climate, terrain } = this.props;
    return (
      <div className="planet">
        <div className="planet__item">
          <span className="planet__item--title">Name:</span> {name}
        </div>
        <div className="planet__item">
          <span className="planet__item--title">Population:</span> {population}
        </div>
        <div className="planet__item">
          <span className="planet__item--title">Climate:</span> {climate}
        </div>
        <div className="planet__item">
          <span className="planet__item--title">Terrain:</span> {terrain}
        </div>
      </div>
    );
  }
}

export default PlanetsItem;
