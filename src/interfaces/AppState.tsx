import { Result } from './Result';

export interface AppState {
  searchTerm: string;
  results: Result | null;
  error: string | null;
  isLoading: boolean;
}
