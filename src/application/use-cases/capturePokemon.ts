import { randomUUID } from 'crypto';

import { Pokemon } from '@domain/entities/pokemon';
import { ConflictError } from '@domain/errors/conflict.error';
import { NotFoundError } from '@domain/errors/not-found.error';
import { IPokeApiGateway } from '@domain/gateways/poke-api-gateway';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

interface CapturePokemonInput {
  trainerId: string;
  pokemonName: string;
}

export class CapturePokemonUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private pokemonRepository: IPokemonRepository,
    private pokeApiGateway: IPokeApiGateway,
  ) {}

  async execute({
    trainerId,
    pokemonName,
  }: CapturePokemonInput): Promise<Pokemon> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    const pokemonCount =
      await this.pokemonRepository.countByTrainerId(trainerId);

    if (pokemonCount >= 6) {
      throw new ConflictError(
        'O treinador já possui o limite máximo de 6 Pokémons em seu time.',
      );
    }

    const pokemonData = await this.pokeApiGateway.findByName(pokemonName);

    const pokemon = new Pokemon({
      id: randomUUID(),
      name: pokemonData.name,
      image: pokemonData.image,
      hp: pokemonData.hp,
      attack: pokemonData.attack,
      defense: pokemonData.defense,
      types: pokemonData.types,
      trainerId,
    });

    await this.pokemonRepository.create(pokemon);

    return pokemon;
  }
}
