import { Planet } from '../planet';

import { IPlanet } from '../../types';

import { SHORT_PLANETS_FIELDS } from '../../consts';

import styles from './planet-card.module.scss';
import { useRouter } from 'next/router';

export const PlanetCard: React.FC<{ planet: IPlanet; active: boolean }> = ({
  planet,
  active,
}) => {
  const { push, query } = useRouter();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);

  return (
    <div
      role="card"
      key={planet.name}
      className={
        active
          ? `${styles['planet-card']} ${styles['active']}`
          : styles['planet-card']
      }
      onClick={() => {
        push({
          query: { ...query, name: planet.name },
        });
      }}
    >
      <Planet planet={planet} usedFields={SHORT_PLANETS_FIELDS} />
    </div>
  );
};
