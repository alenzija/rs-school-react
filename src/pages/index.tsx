import { LeftSidePanel } from '@/components/left-side-panel';
import { Pagination } from '@/components/pagination';
import { PlanetsList } from '@/components/planet-list';
import { SearchForm } from '@/components/search-form';
import { SwapiService } from '@/services/swapi-service';
import { IPlanet, IPlanetsData } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

export const getServerSideProps = (async ({ query }) => {
  const page = query && 'page' in query ? +query.page! : 1;
  const searchPhrase =
    query && 'search' in query ? (query.search as string) : '';
  const name = query && 'name' in query ? (query.name as string) : undefined;

  const planetsData = await SwapiService.getPlanets(page, searchPhrase);
  const planet = name ? await SwapiService.getPlanetByName(name) : null;
  return { props: { planetsData, planet } };
}) satisfies GetServerSideProps<{
  planetsData: IPlanetsData;
  planet: IPlanet | null;
}>;

const Home = ({
  planetsData,
  planet,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listLoading, setListLoading] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);

  const changeListLoading = (value: boolean) => {
    setListLoading(value);
  };

  const changePanelLoading = (value: boolean) => {
    setPanelLoading(value);
  };

  return (
    <>
      <div className="container">
        <SearchForm loading={listLoading} onChangeLoading={changeListLoading} />
        <PlanetsList
          planets={planetsData.planets}
          listLoading={listLoading}
          onChangePanelLoading={changePanelLoading}
        />
        <Pagination
          nextPage={planetsData.nextPage}
          loading={listLoading}
          onChangeLoading={changeListLoading}
        />
      </div>
      {!!planet && <LeftSidePanel planet={planet} loading={panelLoading} />}
    </>
  );
};

export default Home;
