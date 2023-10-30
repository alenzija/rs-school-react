import { ReactNode } from 'react';
import Planet from '../../types/planet';

import './planets-item.scss';

const PlanetsItem = (props: Readonly<Planet>): ReactNode => {
  const { name, population, climate, terrain } = props;
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
};

export default PlanetsItem;
