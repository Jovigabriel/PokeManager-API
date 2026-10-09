import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDto';
import { Pokemon } from '@domain/entities/pokemon';
import { NotFoundError } from '@domain/errors/not-found.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

interface UpdatePokemonInput {
  id: string;
  data: UpdatePokemonDTO;
}

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute({ id, data }: UpdatePokemonInput): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError('Pokémon não encontrado no catálogo.');
    }

    const updatedPokemon = new Pokemon({
      id: pokemon.id,
      name: data.name,
      image: data.image,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      types: data.types,
      trainerId: data.trainerId,
    });

    await this.pokemonRepository.update(updatedPokemon);

    return updatedPokemon;
  }
}
