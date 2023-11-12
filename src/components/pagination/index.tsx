import { useContext } from 'react';
import { useNavigation, useSearchParams } from 'react-router-dom';

import { AppContext } from '../../context';

import './pagination.scss';

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  const { planetsData } = useContext(AppContext);

  const hasPage = searchParams.get('page');
  const page = hasPage ? +hasPage : 1;

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
        disabled={page === 1 || state === 'loading'}
        onClick={toPrevPage}
      >
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button
        role="to-next-page"
        disabled={!planetsData.nextPage || state === 'loading'}
        onClick={toNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};
