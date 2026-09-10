import { Pokemon } from '@domain/entities/pokemon';
import { AppError } from '@domain/errors/app.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface GetPokemonByIdInput {
  id: string;
}

export class GetPokemonByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(input: GetPokemonByIdInput): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(input.id); // procuro dentro do repositorio de pokemons um pokemon com esse id

    if (!pokemon) {
      throw new AppError('Pokemon não encontrado no catalogo', 404);
    }

    return pokemon;
  }
}
