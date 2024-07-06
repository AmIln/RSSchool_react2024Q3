import { Result } from '../interfaces/Result';

const API_SEARCH = 'https://pokeapi.co/api/v2/pokemon/'; // POKEMON

export const handleSearch = async (
  term: string,
): Promise<
  { error: string; results: null } | { results: Result; error: null }
> => {
  try {
    const response = await fetch(`${API_SEARCH}${term}`);
    if (response.status === 404) {
      return {
        error: 'Failed to search results. Please try again later.',
        results: null,
      };
    }
    const data = await response.json();
    return { results: data, error: null };
  } catch (err) {
    return {
      error: 'Failed to search results. Please try again later.',
      results: null,
    };
  }
};

export const triggerError = (): string => {
  return 'This is a manually triggered error.';
};
