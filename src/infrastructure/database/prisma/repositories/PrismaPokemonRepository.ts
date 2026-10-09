import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonRepository,
  ListPokemonsParams,
} from '@domain/repositories/pokemon-repository';
import { prisma } from '@infrastructure/database/prisma/prisma';

export class PrismaPokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        level: pokemon.level,
        types: pokemon.types,
        trainerId: pokemon.trainerId,
      },
    });
  }

  async findAll(): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany();

    return pokemons.map(
      (pokemon) =>
        new Pokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          level: pokemon.level,
          types: pokemon.types,
          trainerId: pokemon.trainerId,
        }),
    );
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id,
      },
    });

    if (!pokemon) {
      return null;
    }

    return new Pokemon({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      level: pokemon.level,
      types: pokemon.types,
      trainerId: pokemon.trainerId,
    });
  }

  async findByType(type: string): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {
          has: type,
        },
      },
    });

    return pokemons.map(
      (pokemon) =>
        new Pokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          level: pokemon.level,
          types: pokemon.types,
          trainerId: pokemon.trainerId,
        }),
    );
  }

  async findByTrainerId(trainerId: string): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        trainerId,
      },
    });

    return pokemons.map(
      (pokemon) =>
        new Pokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          level: pokemon.level,
          types: pokemon.types,
          trainerId: pokemon.trainerId,
        }),
    );
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return prisma.pokemon.count({
      where: {
        trainerId,
      },
    });
  }

  async list({ page, limit, type }: ListPokemonsParams): Promise<Pokemon[]> {
    const pokemons = await prisma.pokemon.findMany({
      where: type
        ? {
            types: {
              has: type,
            },
          }
        : undefined,

      skip: (page - 1) * limit,
      take: limit,
    });

    return pokemons.map(
      (pokemon) =>
        new Pokemon({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          level: pokemon.level,
          types: pokemon.types,
          trainerId: pokemon.trainerId,
        }),
    );
  }

  async update(pokemon: Pokemon): Promise<void> {
    await prisma.pokemon.update({
      where: {
        id: pokemon.id,
      },
      data: {
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        level: pokemon.level,
        types: pokemon.types,
        trainerId: pokemon.trainerId,
      },
    });
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    await prisma.pokemon.update({
      where: {
        id,
      },
      data: {
        level: newLevel,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }

  async count(type?: string): Promise<number> {
    return prisma.pokemon.count({
      where: type
        ? {
            types: {
              has: type,
            },
          }
        : undefined,
    });
  }
}
