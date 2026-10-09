import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface ListPokemonsInput {
  page: number;
  limit: number;
  type?: string;
}

interface ListPokemonsOutput {
  data: Pokemon[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(input: ListPokemonsInput): Promise<ListPokemonsOutput> {
    const [pokemons, total] = await Promise.all([
      this.pokemonRepository.list({
        page: input.page,
        limit: input.limit,
        type: input.type,
      }),
      this.pokemonRepository.count(input.type),
    ]);

    return {
      data: pokemons,
      meta: {
        page: input.page,
        limit: input.limit,
        total,
      },
    };
  }
}
