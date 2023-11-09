import { createContext } from 'react';

const SearchContext = createContext({
  searchPhrase: '',
  setSearchPhrase: (value: string): void => {
    console.log(value);
  },
});

export default SearchContext;
