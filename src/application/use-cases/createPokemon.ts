import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { CreatePokemonDTO } from '@application/dtos/createPokemonDto';
import { AppError } from '@domain/errors/app.error';

export class CreatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const existe = await this.pokemonRepository.findById(data.id);

    if (existe) {
      throw new AppError('Pokemon com este ID já está cadastrado', 404);
    }

    const pokemon = new Pokemon({
      id: data.id,
      name: data.name,
      type: data.type,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
    });

    await this.pokemonRepository.create(pokemon);

    return pokemon;
  }
}
