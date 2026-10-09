import { Router } from 'express';

import { validateRequest } from '@infrastructure/http/middlewares/validateRequest';
import { searchPokemonSchema } from '@infrastructure/http/validators/pokedexSchemas';
import { makePokedexController } from '@main/factories/makePokedexController.factory';

const pokedexRoutes = Router();

const pokedexController = makePokedexController();

pokedexRoutes.get(
  '/search',
  validateRequest(searchPokemonSchema),
  (req, res) => {
    /*
      #swagger.tags = ['Pokedex']
      #swagger.summary = 'Buscar Pokémon na PokéAPI'
      #swagger.description = 'Busca um Pokémon pelo nome diretamente na PokéAPI e retorna os dados formatados.'

      #swagger.parameters['name'] = {
        in: 'query',
        description: 'Nome do Pokémon',
        required: true,
        type: 'string',
        example: 'pikachu'
      }

      #swagger.responses[200] = {
        description: 'Pokémon encontrado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Parâmetro name inválido'
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado na PokéAPI'
      }
    */

    return pokedexController.search(req, res);
  },
);

export { pokedexRoutes };
