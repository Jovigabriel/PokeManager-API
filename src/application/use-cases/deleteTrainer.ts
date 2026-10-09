import { ITrainerRepository } from '@domain/repositories/trainer-repository';

interface DeleteTrainerInput {
  trainerId: string;
}

export class DeleteTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute({ trainerId }: DeleteTrainerInput): Promise<void> {
    await this.trainerRepository.delete(trainerId);
  }
}
