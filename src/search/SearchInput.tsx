import React from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

class SearchInput extends React.Component<SearchInputProps> {
  render(): JSX.Element {
    const { searchTerm, onSearchTermChange, onSearch } = this.props;

    return (
      <div className="top-section">
        <input
          className="search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Enter search term"
        />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  }
}

export default SearchInput;
