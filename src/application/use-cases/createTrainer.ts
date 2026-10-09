import { randomUUID } from 'crypto';

import { CreateTrainerDTO } from '@application/dtos/createTrainerDto';
import { ConflictError } from '@domain/errors/conflict.error';
import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';

export class CreateTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    const trainerAlreadyExists = await this.trainerRepository.findByEmail(
      data.email,
    );

    if (trainerAlreadyExists) {
      throw new ConflictError(
        'Já existe um treinador cadastrado com este e-mail.',
      );
    }

    const trainer = new Trainer({
      id: randomUUID(),
      name: data.name,
      email: data.email,
      city: data.city,
    });

    await this.trainerRepository.create(trainer);

    return trainer;
  }
}
