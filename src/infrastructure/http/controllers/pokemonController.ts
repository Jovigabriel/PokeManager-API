import { Request, Response } from 'express';

import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonsUseCase } from '@application/use-cases/listPokemons';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/updatePokemonLevel';

export class PokemonController {
  constructor(
    private listPokemonsUseCase: ListPokemonsUseCase,
    private getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private createPokemonUseCase: CreatePokemonUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private updatePokemonLevelUseCase: UpdatePokemonLevelUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit, type } = req.query;

    const result = await this.listPokemonsUseCase.execute({
      page: Number(page ?? 1),
      limit: Number(limit ?? 10),
      type: type ? String(type).toLowerCase() : undefined,
    });

    const formattedPokemons = result.data.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      level: pokemon.level,
      types: pokemon.types,
      trainerId: pokemon.trainerId,
    }));

    return res.status(200).json({
      data: formattedPokemons,
      meta: result.meta,
    });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);

    const pokemon = await this.getPokemonByIdUseCase.execute({
      id,
    });

    return res.status(200).json({
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

  async create(req: Request, res: Response): Promise<Response> {
    const { id, name, image, hp, attack, defense, types, trainerId } = req.body;

    const pokemon = await this.createPokemonUseCase.execute({
      id,
      name,
      image,
      hp,
      attack,
      defense,
      types,
      trainerId,
    });

    return res.status(201).json({
      message: 'Pokémon criado com sucesso!',
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

  async update(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);

    const { name, image, hp, attack, defense, types, trainerId } = req.body;

    const pokemon = await this.updatePokemonUseCase.execute({
      id,
      data: {
        name,
        image,
        hp,
        attack,
        defense,
        types,
        trainerId,
      },
    });

    return res.status(200).json({
      message: 'Pokémon atualizado com sucesso!',
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

  async updateLevel(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);
    const { level } = req.body;

    const pokemon = await this.updatePokemonLevelUseCase.execute({
      id,
      level: Number(level),
    });

    return res.status(200).json({
      message: 'Nível do Pokémon atualizado com sucesso!',
      data: {
        id: pokemon.id,
        name: pokemon.name,
        level: pokemon.level,
      },
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = String(req.params.id);

    await this.deletePokemonUseCase.execute({
      id,
    });

    return res.status(204).send();
  }
}
