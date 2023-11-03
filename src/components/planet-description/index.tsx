import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Spinner from '../spinner';
import ErrorMessage from '../error-message';

import SwapiService from '../../services/swapi-service';

import { IPlanetDescription } from '../../types/planet';

import closeImg from '../../assets/image/close.png';

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
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = (props: { data: IPlanetDescription }): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { name, climate, diameter, orbitalPeriod, population, terrain } =
    props.data;

  return (
    <div>
      <button
        onClick={() => {
          navigate(`/?${queryParams.toString()}`);
        }}
      >
        <img src={closeImg} alt="close image" />
      </button>
      <div>
        <span>Name: </span>
        {name}
      </div>
      <div>
        <span>Climated: </span>
        {climate}
      </div>
      <div>
        <span>Diametr: </span>
        {diameter}
      </div>
      <div>
        <span>Orbital period: </span>
        {orbitalPeriod}
      </div>
      <div>
        <span>Population: </span>
        {population}
      </div>
      <div>
        <span>Terrain: </span>
        {terrain}
      </div>
    </div>
  );
};

export default PlanetDescription;
