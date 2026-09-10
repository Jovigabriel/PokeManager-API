import path from 'path';

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'PokéManager API',
    description:
      'API para gerenciamento de um catálogo local de Pokémons utilizando Node.js, TypeScript, Express e Clean Architecture.',
  },

  servers: [
    {
      url: 'http://localhost:3333/api/v1/pokemons',
      description: 'Servidor local',
    },
  ],

  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de Pokémons',
    },
  ],

  definitions: {
    Pokemon: {
      id: '25',
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      attack: 55,
      defense: 40,
    },

    CreatePokemonDTO: {
      $id: '25',
      $name: 'Pikachu',
      $type: 'Electric',
      $hp: 35,
      $attack: 55,
      $defense: 40,
    },

    UpdatePokemonDTO: {
      $name: 'Pikachu Fortalecido',
      $type: 'Electric',
      $hp: 50,
      $attack: 65,
      $defense: 45,
    },

    ErrorResponse: {
      message: 'Pokémon não encontrado no catálogo.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [
  path.resolve(__dirname, '../../infrastructure/http/routes/pokemon.routes.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
