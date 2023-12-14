import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPlanet } from '../../types/planet';

import './planets-item.scss';

interface PlanetItemProps extends IPlanet {
  active: boolean;
}

const PlanetsItem = (props: PlanetItemProps): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { name, climate, terrain, active } = props;
  return (
    <div
      className={active ? 'planet active' : 'planet'}
      onClick={() => {
        navigate(`/planets/${name}/?${queryParams.toString()}`);
      }}
    >
      <div className="planet__item">
        <span className="planet__item--title">Name:</span> {name}
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
