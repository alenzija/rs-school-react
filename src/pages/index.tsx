import { Pagination } from '@/components/pagination';
import { PlanetsList } from '@/components/planet-list';
import { SearchForm } from '@/components/search-form';
import { SwapiService } from '@/services/swapi-service';
import { IPlanetsData } from '@/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ query }) => {
  const page = query && 'page' in query ? +query.page! : 1;
  const name = query && 'search' in query ? (query.search as string) : '';

  const planetsData = await SwapiService.getPlanets(page, name);
  return { props: { planetsData } };
}) satisfies GetServerSideProps<{
  planetsData: IPlanetsData;
}>;

const Home = ({
  planetsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <SearchForm />
      <PlanetsList data={planetsData} />
      <Pagination nextPage={planetsData.nextPage} />
    </>
  );
};

export default Home;
