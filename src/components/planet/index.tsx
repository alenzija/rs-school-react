import { IPlanet } from '../../types';

import styles from './planet.module.scss';

interface PlanetProps {
  planet: IPlanet;
  usedFields: string[];
}

export const Planet: React.FC<PlanetProps> = ({ planet, usedFields }) => {
  return (
    <>
      {usedFields.map((field, index) => {
        return (
          <div className={styles.planet} key={index}>
            <span className={styles['planet-title']}>{field}:</span>
            {field in planet ? planet[field] : `No ${field}`}
          </div>
        );
      })}
    </>
  );
};
