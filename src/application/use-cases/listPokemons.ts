import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface ListPokemonsInput {
  type?: string;
}

export class ListPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(input: ListPokemonsInput): Promise<Pokemon[]> {
    if (input.type) {
      return this.pokemonRepository.findByType(input.type);
    }

    return this.pokemonRepository.findAll();
  }
}
