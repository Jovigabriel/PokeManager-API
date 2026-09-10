import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDto';
import { Pokemon } from '@domain/entities/pokemon';
import { AppError } from '@domain/errors/app.error';

interface UpdatePokemonInput {
  id: string;
  data: UpdatePokemonDTO;
}

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(input: UpdatePokemonInput): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(input.id);

    if (!pokemon) {
      throw new AppError('Pokemon não encontrado no catalogo', 404);
    }

    const updatedPokemon = new Pokemon({
      id: pokemon.id,
      name: input.data.name,
      type: input.data.type,
      hp: input.data.hp,
      attack: input.data.attack,
      defense: input.data.defense,
    });

    await this.pokemonRepository.update(updatedPokemon);

    return updatedPokemon;
  }
}
