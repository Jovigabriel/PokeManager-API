import { Router } from 'express';

const swaggerRoutes = Router();

swaggerRoutes.get('/api/v1/pokemons', (_req, _res) => {
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
  example: 'electric'
}

    #swagger.responses[200] = {
      description: 'Lista de Pokémons retornada com sucesso'
    }

    #swagger.responses[400] = {
      description: 'Parâmetros de consulta inválidos'
    }
  */
});

swaggerRoutes.get('/api/v1/pokemons/:id', (_req, _res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Buscar Pokémon por ID'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID do Pokémon'
    }

    #swagger.responses[200] = {
      description: 'Pokémon encontrado com sucesso'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado'
    }
  */
});

swaggerRoutes.patch('/api/v1/pokemons/:id/level', (_req, _res) => {
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
});

swaggerRoutes.post('/api/v1/pokemons', (_req, _res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Cadastrar Pokémon'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreatePokemonDTO"
          }
        }
      }
    }

    #swagger.responses[201] = {
      description: 'Pokémon criado com sucesso'
    }

    #swagger.responses[400] = {
      description: 'Dados inválidos'
    }
  */
});

swaggerRoutes.put('/api/v1/pokemons/:id', (_req, _res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Atualizar Pokémon'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID do Pokémon'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdatePokemonDTO"
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
  */
});

swaggerRoutes.delete('/api/v1/pokemons/:id', (_req, _res) => {
  /*
    #swagger.tags = ['Pokemons']
    #swagger.summary = 'Remover Pokémon'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      description: 'ID do Pokémon'
    }

    #swagger.responses[204] = {
      description: 'Pokémon removido com sucesso'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado'
    }
  */
});

swaggerRoutes.get('/api/v1/pokedex/search', (_req, _res) => {
  /*
    #swagger.tags = ['Pokedex']
    #swagger.summary = 'Buscar Pokémon na PokéAPI'
    #swagger.description = 'Busca um Pokémon pelo nome diretamente na PokéAPI.'

    #swagger.parameters['name'] = {
      in: 'query',
      required: true,
      description: 'Nome do Pokémon',
      type: 'string',
      example: 'pikachu'
  }

    #swagger.responses[200] = {
      description: 'Pokémon encontrado com sucesso'
    }

    #swagger.responses[400] = {
      description: 'Nome inválido'
    }

    #swagger.responses[404] = {
      description: 'Pokémon não encontrado na PokéAPI'
    }
  */
});

swaggerRoutes.post('/api/v1/trainers', (_req, _res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Cadastrar treinador'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateTrainerDTO"
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
});

swaggerRoutes.post('/api/v1/trainers/:trainerId/captures', (_req, _res) => {
  /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Capturar Pokémon'
      #swagger.description = 'Busca o Pokémon na PokéAPI e adiciona ao time do treinador.'

      #swagger.parameters['trainerId'] = {
        in: 'path',
        required: true,
        description: 'ID do treinador'
      }

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CapturePokemonDTO"
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
        description: 'Limite máximo de 6 Pokémons atingido'
      }
    */
});

swaggerRoutes.get('/api/v1/trainers/:trainerId/team', (_req, _res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Listar time do treinador'

    #swagger.parameters['trainerId'] = {
      in: 'path',
      required: true,
      description: 'ID do treinador'
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
});

swaggerRoutes.delete('/api/v1/trainers/:trainerId', (_req, _res) => {
  /*
    #swagger.tags = ['Trainers']
    #swagger.summary = 'Excluir treinador'
    #swagger.description = 'Exclui o treinador e mantém os Pokémons cadastrados, removendo a associação com o treinador.'

    #swagger.parameters['trainerId'] = {
      in: 'path',
      required: true,
      description: 'ID do treinador',
      type: 'string'
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
});

export { swaggerRoutes };
