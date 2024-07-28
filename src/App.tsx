import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import { PokemonList } from './pokemonList/PokemonList';
import { AppState } from './interfaces/AppState';
import SearchInput from './search/SearchInput';
import SearchResults from './search/SearchResults';
import { handleSearch } from './search/searchFunctions';
import ErrorPage from './ErrorPage/ErrorPage';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: null,
      error: false,
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
    try {
      const { results } = await handleSearch(term);
      this.setState({ results, error: false, isLoading: false });
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      console.error('Error in searchResults:', error);
      this.setState({ error: true, isLoading: false });
    }
  };

  handleSearch = (): void => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.searchResults(trimmedSearchTerm);
  };

  handleTriggerError = (): void => {
    try {
      throw new Error('Triggered error');
    } catch (error) {
      console.error('Triggered error:', error);
      this.setState({ error: true });
    }
  };

  render(): JSX.Element {
    const { searchTerm, results, error, isLoading } = this.state;

    return (
      <ErrorBoundary fallbackRender={() => <ErrorPage></ErrorPage>}>
        {!error && (
          <>
            <div className="app">
              <SearchInput
                searchTerm={searchTerm}
                onSearchTermChange={(term) =>
                  this.setState({ searchTerm: term })
                }
                onSearch={this.handleSearch}
              />
              <button
                className="error-trigger"
                onClick={this.handleTriggerError}
              >
                Trigger Error
              </button>
              <SearchResults
                results={results}
                error={error}
                isLoading={isLoading}
              />
              <PokemonList />
            </div>
          </>
        )}
        <ErrorPage></ErrorPage>
      </ErrorBoundary>
    );
  }
}

export default App;
