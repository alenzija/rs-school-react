import { ReactNode, useRef } from 'react';

import './seacrh-form.scss';

type SearchFormProps = Readonly<{
  loading: boolean;
  searchPhrase: string;
  onChangeSearchPhrase: (str: string) => void;
  onChangeLoading: (value: boolean) => void;
}>;

const SearchForm = (props: Readonly<SearchFormProps>): ReactNode => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchPhrase, onChangeSearchPhrase, onChangeLoading, loading } =
    props;

  const updateSearchPhrase = (): void => {
    const newSearchPhrase = inputRef.current?.value.trim() || '';
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    onChangeSearchPhrase(newSearchPhrase.trim());
    onChangeLoading(true);
  };

  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-form__input"
        ref={inputRef}
        defaultValue={searchPhrase}
        placeholder="Enter a planet name"
      />
      <button disabled={loading} onClick={updateSearchPhrase}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
