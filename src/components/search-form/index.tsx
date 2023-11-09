import {
  ReactNode,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import { useNavigation } from 'react-router-dom';

import SearchContext from '../../context';

import './seacrh-form.scss';

const SearchForm = (): ReactNode => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  const searchContext = useContext(SearchContext);
  const [value, setValue] = useState(searchContext.searchPhrase);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    if (!target || !(target instanceof HTMLInputElement)) {
      return;
    }
    setValue(target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newSearchPhrase: string = inputRef.current?.value.trim() || '';
    // if (newSearchPhrase === '') {
    //   newSearchPhrase = null;
    //   localStorage.removeItem('searchPhrase');
    //   searchParams.delete('search');
    //   return;
    // }
    if (newSearchPhrase === searchContext.searchPhrase) {
      return;
    }
    // if (newSearchPhrase !== '') {
    //   setSearchParams({ ...searchParams, search: newSearchPhrase });
    // }
    localStorage.setItem('searchPhrase', newSearchPhrase);
    searchContext.setSearchPhrase(newSearchPhrase);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder="Enter a planet name"
      />
      <button type="submit" disabled={state === 'loading'}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
