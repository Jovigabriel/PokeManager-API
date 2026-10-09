import { Pokemon } from '@domain/entities/pokemon';

export interface ListPokemonsParams {
  page: number;
  limit: number;
  type?: string;
}

export interface IPokemonRepository {
  create(pokemon: Pokemon): Promise<void>;
  findAll(): Promise<Pokemon[]>;
  findById(id: string): Promise<Pokemon | null>;
  findByType(type: string): Promise<Pokemon[]>;
  findByTrainerId(trainerId: string): Promise<Pokemon[]>;
  countByTrainerId(trainerId: string): Promise<number>;
  list(params: ListPokemonsParams): Promise<Pokemon[]>;
  count(type?: string): Promise<number>;
  update(pokemon: Pokemon): Promise<void>;
  updateLevel(id: string, newLevel: number): Promise<void>;
  delete(id: string): Promise<void>;
}
