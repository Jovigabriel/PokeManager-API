import { Pokemon } from '@domain/entities/pokemon';
import {
  IPokemonRepository,
  ListPokemonsParams,
} from '@domain/repositories/pokemon-repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  public items: Pokemon[] = [];

  async create(pokemon: Pokemon): Promise<void> {
    this.items.push(pokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.items;
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.items.find((item) => item.id === id);

    return pokemon ?? null;
  }

  async findByType(type: string): Promise<Pokemon[]> {
    return this.items.filter((pokemon) =>
      pokemon.types.some(
        (pokemonType) => pokemonType.toLowerCase() === type.toLowerCase(),
      ),
    );
  }

  async findByTrainerId(trainerId: string): Promise<Pokemon[]> {
    return this.items.filter((pokemon) => pokemon.trainerId === trainerId);
  }

  async countByTrainerId(trainerId: string): Promise<number> {
    return this.items.filter((pokemon) => pokemon.trainerId === trainerId)
      .length;
  }

  async list({ page, limit, type }: ListPokemonsParams): Promise<Pokemon[]> {
    let pokemons = this.items;

    if (type) {
      pokemons = pokemons.filter((pokemon) =>
        pokemon.types.some(
          (pokemonType) => pokemonType.toLowerCase() === type.toLowerCase(),
        ),
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return pokemons.slice(start, end);
  }

  async count(type?: string): Promise<number> {
    if (!type) {
      return this.items.length;
    }

    return this.items.filter((pokemon) =>
      pokemon.types.some(
        (pokemonType) => pokemonType.toLowerCase() === type.toLowerCase(),
      ),
    ).length;
  }

  async update(pokemon: Pokemon): Promise<void> {
    const index = this.items.findIndex((item) => item.id === pokemon.id);

    if (index !== -1) {
      this.items[index] = pokemon;
    }
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    const pokemon = this.items.find((item) => item.id === id);

    if (pokemon) {
      pokemon.updateLevel(newLevel);
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
