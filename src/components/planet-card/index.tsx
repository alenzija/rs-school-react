import { useRouter } from 'next/router';

import { Planet } from '../planet';

import { IPlanet } from '../../types';

import { SHORT_PLANETS_FIELDS } from '../../consts';

import styles from './planet-card.module.scss';

type PlanetCardProps = {
  planet: IPlanet;
  active: boolean;
  onChangePanelLoading: (value: boolean) => void;
};

export const PlanetCard: React.FC<PlanetCardProps> = ({
  planet,
  active,
  onChangePanelLoading,
}) => {
  const { push, query } = useRouter();
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
        if (query.name === planet.name) {
          return;
        }
        onChangePanelLoading(true);
        push({
          query: { ...query, name: planet.name },
        }).then(() => {
          onChangePanelLoading(false);
        });
      }}
    >
      <Planet planet={planet} usedFields={SHORT_PLANETS_FIELDS} />
    </div>
  );
};
