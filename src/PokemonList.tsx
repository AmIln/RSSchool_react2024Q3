import React from 'react';
import { Result } from './interfaces/Result';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=99&offset=0'; // ALL POKEMONS

interface PokemonListState {
  pokemons: Result[];
}

export class PokemonList extends React.Component<object, PokemonListState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
    };
  }

  async componentDidMount(): Promise<void> {
    const result = await this.allPokemons();
    if (result) {
      this.setState({ pokemons: result });
    }
  }

  async allPokemons(): Promise<Result[] | undefined> {
    try {
      const response = await fetch(API_URL);
      if (response.status === 404) {
        return;
      }

      const data = await response.json();
      return data.results;
    } catch (err) {
      console.log(err);
    }
  }

  render(): JSX.Element {
    return (
      <div className="pokemons-wrapper">
        {this.state.pokemons.map((pokemon: Result) => (
          <div key={pokemon.name} className="pokemon">
            <h3 className="pokemon__name">{pokemon.name}</h3>
            <p className="pokemon__url">{pokemon.url}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default PokemonList;
