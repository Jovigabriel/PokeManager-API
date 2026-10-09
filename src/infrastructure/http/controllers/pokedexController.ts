import { Request, Response } from 'express';

import { SearchPokemonUseCase } from '@application/use-cases/searchPokemon';

export class PokedexController {
  constructor(private searchPokemonUseCase: SearchPokemonUseCase) {}

  async search(req: Request, res: Response): Promise<Response> {
    const name = String(req.query.name);

    const pokemon = await this.searchPokemonUseCase.execute({
      name,
    });

    return res.status(200).json({
      data: {
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        types: pokemon.types,
      },
    });
  }
}
