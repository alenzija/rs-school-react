import { PlanetsList } from '@/components/planet-list';
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
  return <PlanetsList data={planetsData} />;
};

export default Home;
