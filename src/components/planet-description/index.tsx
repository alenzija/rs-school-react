import { ReactNode, useEffect, useState } from 'react';

import SwapiService from '../../services/swapi-service';
import { useParams } from 'react-router-dom';
import { IPlanetDescription } from '../../types/planet';

const PlanetDescription = (): ReactNode => {
  const params = useParams();
  const [planet, setPlanet] = useState<IPlanetDescription | null>(null);

  useEffect(() => {
    const name = params.name;
    if (!name) {
      return;
    }
    SwapiService.getPlanetByName(name).then((planet) => setPlanet(planet));
  }, [params.name]);

  // const { name, climate, diametr, orbitalPeriod, population, terrain, films } =
  //   props;
  const content = planet ? <View data={planet} /> : <></>;
  return <>{content}</>;
};

const View = (props: { data: IPlanetDescription }): ReactNode => {
  const { name, climate, diameter, orbitalPeriod, population, terrain, films } =
    props.data;
  // {
  //   name: 'name',
  //   climate: 'climate',
  //   diameter: 'diameter',
  //   orbitalPeriod: 'orbitalPeriod',
  //   population: 'population',
  //   terrain: 'terrain',
  //   films: [],
  // };
  return (
    <div>
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
      <div>
        <div>FILMS</div>
        <ul>
          {films.map((film: string) => {
            SwapiService.getFilm(film);
            return <></>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default PlanetDescription;
