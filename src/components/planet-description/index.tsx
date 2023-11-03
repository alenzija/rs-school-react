import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import SwapiService from '../../services/swapi-service';

import { IPlanetDescription } from '../../types/planet';

import closeImg from '../../assets/image/close.png';

import './planet-description.scss';

const PlanetDescription = (): ReactNode => {
  const params = useParams();
  const [planet, setPlanet] = useState<IPlanetDescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const name = params.name;
    if (!name) {
      return;
    }
    setLoading(true);
    setError(false);
    SwapiService.getPlanetByName(name)
      .then((planet) => setPlanet(planet))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.name]);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content =
    planet && !(error || loading) ? (
      <View data={planet} key={planet.name} />
    ) : (
      <></>
    );
  return (
    <div
      className="planet-description"
      style={{ display: loading || error || planet ? 'block' : 'none' }}
    >
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = (props: { data: IPlanetDescription }): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { name, climate, diameter, orbitalPeriod, population, terrain } =
    props.data;

  return (
    <>
      <div
        className="close-button"
        onClick={() => {
          navigate(`/?${queryParams.toString()}`);
        }}
      >
        <img className="close-button__img" src={closeImg} alt="close image" />
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Name: </span>
        {name}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Climate: </span>
        {climate}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Diametr: </span>
        {diameter}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Orbital period: </span>
        {orbitalPeriod}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Population: </span>
        {population}
      </div>
      <div className="planet__item">
        <span className="planet__item--title">Terrain: </span>
        {terrain}
      </div>
    </>
  );
};

export default PlanetDescription;
