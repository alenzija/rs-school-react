import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import { useGetAllPlanetsQuery } from '../../services/swapi-service-redux';

import './pagination.scss';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPhrase = useSelector((state: RootState) => state.search.value);
  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

  const {
    data: planetsData,
    error,
    isFetching,
  } = useGetAllPlanetsQuery({ page, searchPhrase });

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
        disabled={page === 1 || isFetching || !!error}
        onClick={toPrevPage}
      >
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button
        role="to-next-page"
        disabled={!planetsData?.next || isFetching || !!error}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
