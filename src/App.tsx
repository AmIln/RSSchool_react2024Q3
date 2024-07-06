import React from 'react';
import './App.css';
import { PokemonList } from './PokemonList';
import { AppState } from './interfaces/AppState';
import Loading from './Loading';

const API_SEARCH = 'https://pokeapi.co/api/v2/pokemon/'; // POKEMON

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

  handleSearch = (): void => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.searchResults(trimmedSearchTerm);
  };

  searchResults = async (term: string): Promise<void> => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`${API_SEARCH}${term}`);
      if (response.status === 404) {
        this.setState({
          error: 'Failed to search results. Please try again later.',
          results: null,
          isLoading: false,
        });
        return;
      }
      const data = await response.json();
      this.setState({ results: data, error: null, isLoading: false });
      localStorage.setItem('searchTerm', term);
    } catch (err) {
      this.setState({
        error: 'Failed to search results. Please try again later.',
        results: null,
        isLoading: false,
      });
    }
  };

  triggerError = (): void => {
    this.setState({ error: 'This is a manually triggered error.' });
  };

  render(): JSX.Element {
    const { searchTerm, results, error, isLoading } = this.state;

    return (
      <div className="app">
        <div className="top-section">
          <input
            className="search"
            type="text"
            value={searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            placeholder="Enter search term"
          />
          <button onClick={this.handleSearch}>Search</button>
          <button onClick={this.triggerError}>Trigger Error</button>
        </div>
        <div className="bottom-section">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div className="error">{error}</div>
          ) : results ? (
            <div key={results.name} className="result">
              <h3 className="result__name">{results.name}</h3>
              <span className="result__id">id: {results.id}</span>
              <span className="result__height">height: {results.height}</span>
              <span className="result__weight">weight: {results.weight}</span>
            </div>
          ) : (
            <div>No results found.</div>
          )}
          <PokemonList></PokemonList>
        </div>
      </div>
    );
  }
}

export default App;
