import React, { useState, useEffect } from 'react';
import { Result } from './interfaces/Result';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=99&offset=0'; // ALL POKEMONS

export const PokemonList = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<Result[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const result = await allPokemons();
      if (result) {
        setPokemons(result);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="pokemons-wrapper">
      {pokemons.map((pokemon: Result) => (
        <div key={pokemon.name} className="pokemon">
          <h3 className="pokemon__name">{pokemon.name}</h3>
          <p className="pokemon__url">{pokemon.url}</p>
        </div>
      ))}
    </div>
  );
};

const allPokemons = async (): Promise<Result[] | undefined> => {
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
};
