import { Trainer } from '@domain/entities/trainer';

export interface IPgTrainerRepository {
  create(trainer: Trainer): Promise<void>;
  update(trainer: Trainer): Promise<void>;
  findById(id: string): Promise<Trainer | null>;
  findByEmail(email: string): Promise<Trainer | null>;
}
