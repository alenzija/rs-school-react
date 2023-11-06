import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './pagination.scss';

type PaginationProps = {
  hasNextPage: boolean;
  // loading: boolean;
  // onChangeLoading: (value: boolean) => void;
  // page: number;
  // onChangePage: (value: number) => void;
};

const Pagination = (props: PaginationProps): ReactNode => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const hasPage = queryParams.get('page');
  const page = hasPage ? +hasPage : 1;

  const { hasNextPage } = props;

  // useEffect(() => {
  //   queryParams.set('page', page.toString());
  //   navigate({ search: queryParams.toString() });
  // }, [navigate, queryParams, page]);

  const toPrevPage = () => {
    // const newSearchParams = { ...searchParams, page: `${page - 1}` };
    // setSearchParams(newSearchParams);
    // onChangeLoading(true);
    queryParams.set('page', `${page - 1}`);
    navigate({ search: queryParams.toString() });
  };

  const toNextPage = () => {
    // const newSearchParams = { ...searchParams, page: `${page + 1}` };
    // setSearchParams(newSearchParams);
    queryParams.set('page', `${page + 1}`);
    navigate({ search: queryParams.toString() });
    //onChangeLoading(true);
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={toPrevPage}>
        {'<'}
      </button>
      <button disabled={true}>{page}</button>
      <button disabled={!hasNextPage} onClick={toNextPage}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
