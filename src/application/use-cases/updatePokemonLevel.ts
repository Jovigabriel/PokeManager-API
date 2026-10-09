import { Pokemon } from '@domain/entities/pokemon';
import { AppError } from '@domain/errors/app.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface UpdatePokemonLevelInput {
  id: string;
  level: number;
}

export class UpdatePokemonLevelUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute({ id, level }: UpdatePokemonLevelInput): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new AppError('Pokémon não encontrado.', 404);
    }

    pokemon.updateLevel(level);

    await this.pokemonRepository.updateLevel(id, level);

    return pokemon;
  }
}
