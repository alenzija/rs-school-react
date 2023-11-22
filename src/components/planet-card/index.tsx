import { Planet } from '../planet';

import { IPlanet } from '../../types';

import { SHORT_PLANETS_FIELDS } from '../../consts';

import styles from './planet-card.module.scss';

export const PlanetCard: React.FC<{ planet: IPlanet; active: boolean }> = ({
  planet,
  active,
}) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);

  return (
    <div
      role="card"
      key={planet.name}
      className={active ? styles['planet-card active'] : styles['planet-card']}
      onClick={() => {
        console.log('>>>CLICK ON THE CARD');
        // navigate(`/planets/${planet.name}/?${queryParams.toString()}`);
      }}
    >
      <Planet planet={planet} usedFields={SHORT_PLANETS_FIELDS} />
    </div>
  );
};
