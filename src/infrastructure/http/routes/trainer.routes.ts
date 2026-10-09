import { Router } from 'express';

import { validateRequest } from '@infrastructure/http/middlewares/validateRequest';
import {
  capturePokemonSchema,
  createTrainerSchema,
  trainerIdParamSchema,
} from '@infrastructure/http/validators/trainerSchemas';
import { makeTrainerController } from '@main/factories/makeTrainerController.factory';

const trainerRoutes = Router();

const trainerController = makeTrainerController();

trainerRoutes.post('/', validateRequest(createTrainerSchema), (req, res) => {
  /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Cadastrar treinador'
      #swagger.description = 'Cria um novo treinador Pokémon.'

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "city"],
              properties: {
                name: {
                  type: "string",
                  example: "Ash Ketchum"
                },
                email: {
                  type: "string",
                  example: "ash@email.com"
                },
                city: {
                  type: "string",
                  example: "Pallet"
                }
              }
            }
          }
        }
      }

      #swagger.responses[201] = {
        description: 'Treinador criado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Dados inválidos'
      }

      #swagger.responses[409] = {
        description: 'Já existe um treinador com este e-mail'
      }
    */

  return trainerController.create(req, res);
});

trainerRoutes.post(
  '/:trainerId/captures',
  validateRequest(capturePokemonSchema),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Capturar Pokémon'
      #swagger.description = 'Busca o Pokémon na PokéAPI e o adiciona ao time do treinador.'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        description: 'ID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["pokemonName"],
              properties: {
                pokemonName: {
                  type: "string",
                  example: "pikachu"
                }
              }
            }
          }
        }
      }

      #swagger.responses[201] = {
        description: 'Pokémon capturado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'Dados inválidos'
      }

      #swagger.responses[404] = {
        description: 'Treinador ou Pokémon não encontrado'
      }

      #swagger.responses[409] = {
        description: 'Treinador já possui o limite máximo de 6 Pokémons'
      }
    */

    return trainerController.capture(req, res);
  },
);

trainerRoutes.get(
  '/:trainerId/team',
  validateRequest(trainerIdParamSchema),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Listar time do treinador'
      #swagger.description = 'Retorna os Pokémons associados ao treinador.'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        description: 'ID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.responses[200] = {
        description: 'Time retornado com sucesso'
      }

      #swagger.responses[400] = {
        description: 'trainerId inválido'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }
    */

    return trainerController.team(req, res);
  },
);

trainerRoutes.delete(
  '/:trainerId',
  validateRequest(trainerIdParamSchema),
  (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Excluir treinador'
      #swagger.description = 'Exclui o treinador e mantém os Pokémons cadastrados, removendo a associação com o treinador.'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        description: 'ID do treinador',
        required: true,
        type: 'string',
        format: 'uuid'
      }

      #swagger.responses[204] = {
        description: 'Treinador excluído com sucesso'
      }

      #swagger.responses[400] = {
        description: 'trainerId inválido'
      }

      #swagger.responses[404] = {
        description: 'Treinador não encontrado'
      }
    */

    return trainerController.delete(req, res);
  },
);

export { trainerRoutes };
