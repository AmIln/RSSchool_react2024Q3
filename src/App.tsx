import React from 'react';
import './App.css';
import { PokemonList } from './pokemonList/PokemonList';
import { AppState } from './interfaces/AppState';
import SearchInput from './search/SearchInput';
import SearchResults from './search/SearchResults';
import { handleSearch, triggerError } from './search/searchFunctions';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: null,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => {
        this.searchResults(savedSearchTerm);
      });
    }
  }

  searchResults = async (term: string): Promise<void> => {
    this.setState({ isLoading: true });
    const { results, error } = await handleSearch(term);
    this.setState({ results, error, isLoading: false });
    if (!error) {
      localStorage.setItem('searchTerm', term);
    }
  };

  handleSearch = (): void => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.searchResults(trimmedSearchTerm);
  };

  handleTriggerError = (): void => {
    const error = triggerError();
    this.setState({ error });
  };

  render(): JSX.Element {
    const { searchTerm, results, error, isLoading } = this.state;

    return (
      <div className="app">
        <SearchInput
          searchTerm={searchTerm}
          onSearchTermChange={(term) => this.setState({ searchTerm: term })}
          onSearch={this.handleSearch}
        />
        <button className="error-trigger" onClick={this.handleTriggerError}>
          Trigger Error
        </button>
        <SearchResults results={results} error={error} isLoading={isLoading} />
        <PokemonList />
      </div>
    );
  }
}

export default App;
