import { Component, createRef } from 'react';

type SearchFormState = Readonly<{ serachPhrase: string }>;

class SearchForm extends Component<Readonly<object>, SearchFormState> {
  state: SearchFormState = {
    serachPhrase: localStorage.getItem('searchPhrase') || '',
  };

  inputRef = createRef<HTMLInputElement>();

  private updateSearchPhrase(): void {
    const newSearchPhrase = this.inputRef.current?.value;
    if (!newSearchPhrase) {
      return;
    }
    localStorage.setItem('searchPhrase', newSearchPhrase);
    this.setState({
      serachPhrase: newSearchPhrase,
    });
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef} defaultValue={this.state.serachPhrase} />
        <button onClick={() => this.updateSearchPhrase()}>Search</button>
      </div>
    );
  }
}

export default SearchForm;
