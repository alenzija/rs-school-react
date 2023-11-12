import { IPlanet } from '../../types';

import './planet.scss';

interface PlanetProps {
  planet: IPlanet;
  usedFields: string[];
}

export const Planet: React.FC<PlanetProps> = ({ planet, usedFields }) => {
  return (
    <>
      {usedFields.map((field, index) => {
        return (
          <div className="planet" key={index}>
            <span className="planet--title">{field}:</span>{' '}
            {field in planet ? planet[field] : `No ${field}`}
          </div>
        );
      })}
    </>
  );
};
