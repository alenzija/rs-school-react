import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './pagination.scss';
import { RootState } from '../../store';
import { useGetAllPlanetsQuery } from '../../services/swapi-service-redux';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPhrase = useSelector((state: RootState) => state.search.value);
  // const { state } = useNavigation();
  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  const {
    data: planetsData,
    error,
    isLoading,
  } = useGetAllPlanetsQuery({ page, searchPhrase });
  console.log('>>>', {
    planetsData,
  });

  // const { planetsData } = useContext(AppContext);

  const toPrevPage = () => {
    const newSearchParams = { ...searchParams, page: `${page - 1}` };
    setSearchParams(newSearchParams);
  };

  const toNextPage = () => {
    const newSearchParams = { ...searchParams, page: `${page + 1}` };
    setSearchParams(newSearchParams);
  };

  return (
    <div className="pagination">
      <button
        role="to-prev-page"
        disabled={page === 1 || isLoading || !!error}
        onClick={toPrevPage}
      >
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button
        role="to-next-page"
        disabled={!planetsData?.next || isLoading || !!error}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
