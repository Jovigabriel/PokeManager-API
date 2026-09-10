import { AppError } from '@domain/errors/app.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface DeletePokemonInput {
  id: string;
}

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(input: DeletePokemonInput): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(input.id);

    if (!pokemon) {
      throw new AppError('Pokemon não encontrado no catalogo', 404);
    }

    await this.pokemonRepository.delete(input.id);
  }
}
