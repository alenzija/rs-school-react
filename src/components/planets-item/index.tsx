import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlanet } from '../../types/planet';

import './planets-item.scss';

const PlanetsItem = (props: Readonly<IPlanet>): ReactNode => {
  const navigate = useNavigate();
  const { name, population, climate, terrain } = props;
  return (
    <div
      className="planet"
      onClick={() => {
        navigate(`/planets/${name}`);
      }}
    >
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
