import { Component, createRef } from 'react';

import './seacrh-form.scss';

type SearchFormProps = Readonly<{
  loading: boolean;
  searchPhrase: string;
  onChangeSearchPhrase: (str: string) => void;
  onChangeLoading: (value: boolean) => void;
}>;

class SearchForm extends Component<SearchFormProps> {
  inputRef = createRef<HTMLInputElement>();

  private updateSearchPhrase = (): void => {
    const { searchPhrase, onChangeSearchPhrase, onChangeLoading } = this.props;
    const newSearchPhrase = this.inputRef.current?.value.trim() || '';
    if (newSearchPhrase === searchPhrase) {
      return;
    }
    onChangeSearchPhrase(newSearchPhrase.trim());
    onChangeLoading(true);
  };

  render() {
    const { searchPhrase, loading } = this.props;
    return (
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="search-form__input"
          ref={this.inputRef}
          defaultValue={searchPhrase}
          placeholder="Enter a planet name"
        />
        <button disabled={loading} onClick={this.updateSearchPhrase}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
