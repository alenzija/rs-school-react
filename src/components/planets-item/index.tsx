import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPlanet } from '../../types/planet';

import './planets-item.scss';

const PlanetsItem = (props: Readonly<IPlanet>): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { name, climate, terrain } = props;
  return (
    <div
      className="planet"
      onClick={() => {
        navigate(`/planets/${name}/?${queryParams.toString()}`);
      }}
    >
      <div className="planet__item">
        <span className="planet__item--title">Name:</span> {name}
      </div>
      {/* <div className="planet__item">
        <span className="planet__item--title">Population:</span> {population}
      </div> */}
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
