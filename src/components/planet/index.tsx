//import { useLocation, useNavigate } from 'react-router-dom';
import { IPlanet } from '../../types';

import './planet.scss';

interface PlanetProps {
  planet: IPlanet;
  usedFields: string[];
}

export const Planet: React.FC<PlanetProps> = ({ planet, usedFields }) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);

  // const { name, climate, terrain, active } = props;
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
      {/* <div className="planet__item">
        <span className="planet__item--title">Name:</span> {name}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Climate:</span> {climate}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Terrain:</span> {terrain}
      </div> */}
    </>
  );
};
