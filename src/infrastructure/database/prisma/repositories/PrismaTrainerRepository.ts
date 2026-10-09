import { Trainer } from '@domain/entities/trainer';
import { ITrainerRepository } from '@domain/repositories/trainer-repository';
import { prisma } from '@infrastructure/database/prisma/prisma';

export class PrismaTrainerRepository implements ITrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    await prisma.trainer.create({
      data: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        city: trainer.city,
      },
    });
  }

  async findById(id: string): Promise<Trainer | null> {
    const trainer = await prisma.trainer.findUnique({
      where: {
        id,
      },
    });

    if (!trainer) {
      return null;
    }

    return new Trainer({
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      city: trainer.city,
    });
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const trainer = await prisma.trainer.findUnique({
      where: {
        email,
      },
    });

    if (!trainer) {
      return null;
    }

    return new Trainer({
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      city: trainer.city,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.trainer.delete({
      where: {
        id,
      },
    });
  }
}
