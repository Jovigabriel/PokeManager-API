import { Pokemon } from '@domain/entities/pokemon';
import { NotFoundError } from '@domain/errors/not-found.error';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

interface GetTrainerTeamInput {
  trainerId: string;
}

export class GetTrainerTeamUseCase {
  constructor(
    private trainerRepository: ITrainerRepository,
    private pokemonRepository: IPokemonRepository,
  ) {}

  async execute({ trainerId }: GetTrainerTeamInput): Promise<Pokemon[]> {
    const trainer = await this.trainerRepository.findById(trainerId);

    if (!trainer) {
      throw new NotFoundError('Treinador não encontrado.');
    }

    const team = await this.pokemonRepository.findByTrainerId(trainerId);

    return team;
  }
}
