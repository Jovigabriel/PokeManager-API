import { Trainer } from '@domain/entities/trainer';
import { AppError } from '@domain/errors/app.error';

import { IPgTrainerRepository } from './IPgTrainerRepository';
import { pool as postgresPool } from '../pg';

interface TrainerRow {
  id: string;
  name: string;
  email: string;
  city: string;
}

function toDomain(row: TrainerRow): Trainer {
  return new Trainer({
    id: row.id,
    name: row.name,
    email: row.email,
    city: row.city,
  });
}

export class PgTrainerRepository implements IPgTrainerRepository {
  async create(trainer: Trainer): Promise<void> {
    const query = `
      INSERT INTO "Trainer" (
        "id",
        "name",
        "email",
        "city"
      )
      VALUES ($1, $2, $3, $4)
    `;

    try {
      await postgresPool.query(query, [
        trainer.id,
        trainer.name,
        trainer.email,
        trainer.city,
      ]);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }

      throw error;
    }
  }

  async update(trainer: Trainer): Promise<void> {
    const query = `
      UPDATE "Trainer"
      SET
        "name" = $1,
        "email" = $2,
        "city" = $3
      WHERE "id" = $4
    `;

    try {
      await postgresPool.query(query, [
        trainer.name,
        trainer.email,
        trainer.city,
        trainer.id,
      ]);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new AppError(
          'Já existe um Treinador cadastrado com este e-mail.',
          409,
        );
      }

      throw error;
    }
  }

  async findById(id: string): Promise<Trainer | null> {
    const query = `
      SELECT
        "id",
        "name",
        "email",
        "city"
      FROM "Trainer"
      WHERE "id" = $1
      LIMIT 1
    `;

    const result = await postgresPool.query<TrainerRow>(query, [id]);

    const trainer = result.rows[0];

    if (!trainer) {
      return null;
    }

    return toDomain(trainer);
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const query = `
      SELECT
        "id",
        "name",
        "email",
        "city"
      FROM "Trainer"
      WHERE "email" = $1
      LIMIT 1
    `;

    const result = await postgresPool.query<TrainerRow>(query, [email]);

    const trainer = result.rows[0];

    if (!trainer) {
      return null;
    }

    return toDomain(trainer);
  }
}
