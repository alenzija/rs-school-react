import { useLocation, useNavigate } from 'react-router-dom';

import { Planet } from '../planet';

import { IPlanet } from '../../types';

import { SHORT_PLANETS_FIELDS } from '../../consts';

import './planet-card.scss';

export const PlanetCard: React.FC<{ planet: IPlanet; active: boolean }> = ({
  planet,
  active,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  return (
    <div
      role="card"
      key={planet.name}
      className={active ? 'planet-card active' : 'planet-card'}
      onClick={() => {
        navigate(`/planets/${planet.name}/?${queryParams.toString()}`);
      }}
    >
      <Planet planet={planet} usedFields={SHORT_PLANETS_FIELDS} />
    </div>
  );
};
