import {
  IPokeApiGateway,
  PokeApiPokemonData,
} from '@domain/gateways/poke-api-gateway';
import { NotFoundError } from '@domain/errors/not-found.error';

interface PokeApiResponse {
  name: string;
  sprites: {
    front_default: string | null;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export class PokeApiGateway implements IPokeApiGateway {
  async findByName(name: string): Promise<PokeApiPokemonData> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    );

    if (!response.ok) {
      throw new NotFoundError('Pokémon não encontrado na PokéAPI.');
    }

    const data = (await response.json()) as PokeApiResponse;

    const hp =
      data.stats.find((item) => item.stat.name === 'hp')?.base_stat ?? 0;

    const attack =
      data.stats.find((item) => item.stat.name === 'attack')?.base_stat ?? 0;

    const defense =
      data.stats.find((item) => item.stat.name === 'defense')?.base_stat ?? 0;

    const types = data.types.map((item) => item.type.name);

    return {
      name: data.name,
      image: data.sprites.front_default ?? '',
      hp,
      attack,
      defense,
      types,
    };
  }
}
