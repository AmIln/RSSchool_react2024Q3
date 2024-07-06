import React from 'react';
import Loading from '../Loading';
import { Result } from '../interfaces/Result';

interface SearchResultsProps {
  results: Result | null;
  error: string | null;
  isLoading: boolean;
}

class SearchResults extends React.Component<SearchResultsProps> {
  render(): JSX.Element {
    const { results, error, isLoading } = this.props;

    return (
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
      </div>
    );
  }
}

export default SearchResults;
