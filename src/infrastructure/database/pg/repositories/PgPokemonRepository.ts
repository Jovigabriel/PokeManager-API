import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonRepository,
  ListPokemonsParams,
} from '@domain/repositories/pokemon-repository';
import { pool } from '@infrastructure/database/pg/pg';

interface PokemonRow {
  id: string;
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  level: number;
  types: string[];
  trainerId: string | null;
}

function toDomain(row: PokemonRow): Pokemon {
  return new Pokemon({
    id: row.id,
    name: row.name,
    image: row.image,
    hp: row.hp,
    attack: row.attack,
    defense: row.defense,
    level: row.level,
    types: row.types,
    trainerId: row.trainerId,
  });
}

export class PgPokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<void> {
    await pool.query(
      `
        INSERT INTO "Pokemon"
          (
            "id",
            "name",
            "image",
            "hp",
            "attack",
            "defense",
            "level",
            "types",
            "trainerId"
          )
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        pokemon.id,
        pokemon.name,
        pokemon.image,
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.level,
        pokemon.types,
        pokemon.trainerId,
      ],
    );
  }

  async findAll(): Promise<Pokemon[]> {
    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
      `,
    );

    return result.rows.map(toDomain);
  }

  async findById(id: string): Promise<Pokemon | null> {
    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
        WHERE "id" = $1
        LIMIT 1
      `,
      [id],
    );

    const pokemon = result.rows[0];

    return pokemon ? toDomain(pokemon) : null;
  }

  async findByType(type: string): Promise<Pokemon[]> {
    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
        WHERE EXISTS (
          SELECT 1
          FROM unnest("types") AS pokemon_type
          WHERE LOWER(pokemon_type) = LOWER($1)
        )
      `,
      [type],
    );

    return result.rows.map(toDomain);
  }

  async findByTrainerId(trainerId: string): Promise<Pokemon[]> {
    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
        WHERE "trainerId" = $1
      `,
      [trainerId],
    );

    return result.rows.map(toDomain);
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    const result = await pool.query<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM "Pokemon"
        WHERE "trainerId" = $1
      `,
      [trainerId],
    );

    return Number(result.rows[0].count);
  }

  async list({ page, limit, type }: ListPokemonsParams): Promise<Pokemon[]> {
    const offset = (page - 1) * limit;

    if (type) {
      const result = await pool.query<PokemonRow>(
        `
          SELECT
            "id",
            "name",
            "image",
            "hp",
            "attack",
            "defense",
            "level",
            "types",
            "trainerId"
          FROM "Pokemon"
          WHERE EXISTS (
            SELECT 1
            FROM unnest("types") AS pokemon_type
            WHERE LOWER(pokemon_type) = LOWER($1)
          )
          LIMIT $2
          OFFSET $3
        `,
        [type, limit, offset],
      );

      return result.rows.map(toDomain);
    }

    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
        LIMIT $1
        OFFSET $2
      `,
      [limit, offset],
    );

    return result.rows.map(toDomain);
  }

  async update(pokemon: Pokemon): Promise<void> {
    await pool.query(
      `
        UPDATE "Pokemon"
        SET
          "name" = $2,
          "image" = $3,
          "hp" = $4,
          "attack" = $5,
          "defense" = $6,
          "level" = $7,
          "types" = $8,
          "trainerId" = $9
        WHERE "id" = $1
      `,
      [
        pokemon.id,
        pokemon.name,
        pokemon.image,
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.level,
        pokemon.types,
        pokemon.trainerId,
      ],
    );
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    await pool.query(
      `
        UPDATE "Pokemon"
        SET "level" = $2
        WHERE "id" = $1
      `,
      [id, newLevel],
    );
  }

  async delete(id: string): Promise<void> {
    await pool.query(
      `
        DELETE FROM "Pokemon"
        WHERE "id" = $1
      `,
      [id],
    );
  }

  async count(type?: string): Promise<number> {
    if (type) {
      const result = await pool.query<{ count: string }>(
        `
          SELECT COUNT(*) AS count
          FROM "Pokemon"
          WHERE EXISTS (
            SELECT 1
            FROM unnest("types") AS pokemon_type
            WHERE LOWER(pokemon_type) = LOWER($1)
          )
        `,
        [type],
      );

      return Number(result.rows[0].count);
    }

    const result = await pool.query<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM "Pokemon"
      `,
    );

    return Number(result.rows[0].count);
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    const result = await pool.query<PokemonRow>(
      `
        SELECT
          "id",
          "name",
          "image",
          "hp",
          "attack",
          "defense",
          "level",
          "types",
          "trainerId"
        FROM "Pokemon"
        WHERE "name" ILIKE $1
      `,
      [`%${term}%`],
    );

    return result.rows.map(toDomain);
  }
}
