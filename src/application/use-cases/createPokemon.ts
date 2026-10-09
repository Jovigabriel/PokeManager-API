import { CreatePokemonDTO } from '@application/dtos/createPokemonDto';
import { Pokemon } from '@domain/entities/pokemon';
import { ConflictError } from '@domain/errors/conflict.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonAlreadyExists = await this.pokemonRepository.findById(data.id);

    if (pokemonAlreadyExists) {
      throw new ConflictError('Pokémon com este ID já está cadastrado.');
    }

    if (data.trainerId) {
      const pokemonCount = await this.pokemonRepository.countByTrainerId(
        data.trainerId,
      );

      if (pokemonCount >= 6) {
        throw new ConflictError(
          'O treinador já possui o limite máximo de 6 Pokémons em seu time.',
        );
      }
    }

    const pokemon = new Pokemon({
      id: data.id,
      name: data.name,
      image: data.image,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      types: data.types,
      trainerId: data.trainerId,
    });

    await this.pokemonRepository.create(pokemon);

    return pokemon;
  }
}
