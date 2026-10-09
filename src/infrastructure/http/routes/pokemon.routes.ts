import { Router } from 'express';

import { validateRequest } from '@infrastructure/http/middlewares/validateRequest';
import {
  listPokemonsSchema,
  updatePokemonLevelSchema,
} from '@infrastructure/http/validators/pokemonSchemas';
import { makePokemonController } from '@main/factories/makePokemonController.factory';

const pokemonRoutes = Router();

const pokemonController = makePokemonController();

pokemonRoutes.get('/', validateRequest(listPokemonsSchema), (req, res) => {
  /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Listar Pokémons'
      #swagger.description = 'Lista os Pokémons cadastrados com paginação e filtro opcional por tipo.'

      #swagger.parameters['page'] = {
        in: 'query',
        description: 'Número da página',
        required: false,
        type: 'integer',
        example: 1
      }

      #swagger.parameters['limit'] = {
        in: 'query',
        description: 'Quantidade de Pokémons por página',
        required: false,
        type: 'integer',
        example: 10
      }

      #swagger.parameters['type'] = {
        in: 'query',
        description: 'Filtra os Pokémons pelo tipo',
        required: false,
        type: 'string',
        example: 'fire'
      }

      #swagger.responses[200] = {
        description: 'Lista de Pokémons retornada com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Parâmetros de consulta inválidos'
      }
    */

  return pokemonController.list(req, res);
});

pokemonRoutes.get('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Buscar Pokémon por ID'
    #swagger.description = 'Retorna um Pokémon específico a partir do ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string',
      example: '25'
    }

    #swagger.responses[200] = {
      description: 'Pokémon encontrado com sucesso'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado'
    }
  */

  return pokemonController.getById(req, res);
});

pokemonRoutes.post('/', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cadastrar Pokémon'
    #swagger.description = 'Adiciona um novo Pokémon ao catálogo local.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/CreatePokemonDTO"
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'Pokémon criado com sucesso'
    }

    #swagger.responses[400] = {
      description: 'Dados inválidos ou ID já cadastrado'
    }
  */

  return pokemonController.create(req, res);
});

pokemonRoutes.put('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualizar Pokémon'
    #swagger.description = 'Atualiza os dados de um Pokémon existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string',
      example: '25'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/UpdatePokemonDTO"
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Pokémon atualizado com sucesso'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado'
    }

    #swagger.responses[400] = {
      description: 'Dados inválidos'
    }
  */

  return pokemonController.update(req, res);
});

pokemonRoutes.patch(
  '/:id/level',
  validateRequest(updatePokemonLevelSchema),
  (req, res) => {
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualizar nível do Pokémon'
      #swagger.description = 'Atualiza apenas o nível de um Pokémon específico.'

      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do Pokémon',
        required: true,
        type: 'string',
        example: '25'
      }

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["level"],
              properties: {
                level: {
                  type: "integer",
                  example: 10
                }
              }
            }
          }
        }
      }

      #swagger.responses[200] = {
        description: 'Nível atualizado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Nível inválido'
      }

      #swagger.responses[404] = {
        description: 'Pokémon não encontrado'
      }
    */

    return pokemonController.updateLevel(req, res);
  },
);

pokemonRoutes.delete('/:id', (req, res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remover Pokémon'
    #swagger.description = 'Remove um Pokémon do catálogo pelo ID.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do Pokémon',
      required: true,
      type: 'string',
      example: '25'
    }

    #swagger.responses[204] = {
      description: 'Pokémon removido com sucesso'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado'
    }
  */

  return pokemonController.delete(req, res);
});

export { pokemonRoutes };
