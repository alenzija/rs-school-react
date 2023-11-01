import { ReactNode, useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './seacrh-form.scss';

type SearchFormProps = Readonly<{
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
  onChangePage: (value: number) => void;
}>;

const SearchForm = (props: Readonly<SearchFormProps>): ReactNode => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchPhrase, setSearchPhrase] = useState<string | null>(
    localStorage.getItem('searchPhrase')
  );

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const { onChangeLoading, loading, onChangePage } = props;

  useEffect(() => {
    if (searchPhrase) {
      localStorage.setItem('searchPhrase', searchPhrase);
    } else {
      localStorage.removeItem('searchPhrase');
    }
  }, [searchPhrase]);

  const updateSearchPhrase = (): void => {
    let newSearchPhrase: string | null = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === '') {
      newSearchPhrase = null;
      queryParams.delete('search');
    }
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    if (newSearchPhrase !== null) {
      queryParams.set('search', newSearchPhrase);
    }
    setSearchPhrase(newSearchPhrase);
    onChangePage(1);
    queryParams.set('page', '1');

    onChangeLoading(true);
    navigate({ search: queryParams.toString() });
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-form__input"
        ref={inputRef}
        defaultValue={searchPhrase ? searchPhrase : undefined}
        placeholder="Enter a planet name"
      />
      <button disabled={loading} onClick={updateSearchPhrase}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
