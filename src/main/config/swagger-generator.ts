import path from 'path';

import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '2.0.0',
    title: 'PokéManager API',
    description:
      'API para gerenciamento de treinadores e Pokémons, com integração à PokéAPI, utilizando Node.js, TypeScript, Express, Prisma e Clean Architecture.',
  },

  servers: [
    {
      url: 'http://localhost:3333',
      description: 'Servidor local',
    },
  ],

  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de Pokémons',
    },
    {
      name: 'Trainers',
      description: 'Endpoints de gerenciamento de treinadores',
    },
    {
      name: 'Pokedex',
      description: 'Endpoints de consulta à PokéAPI',
    },
  ],

  definitions: {
    Pokemon: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'pikachu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      hp: 35,
      attack: 55,
      defense: 40,
      types: ['electric'],
      trainerId: '550e8400-e29b-41d4-a716-446655440001',
    },

    CreatePokemonDTO: {
      $id: '550e8400-e29b-41d4-a716-446655440000',
      $name: 'pikachu',
      $image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      $hp: 35,
      $attack: 55,
      $defense: 40,
      $types: ['electric'],
      trainerId: null,
    },

    UpdatePokemonDTO: {
      $name: 'pikachu',
      $image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      $hp: 40,
      $attack: 60,
      $defense: 45,
      $types: ['electric'],
      trainerId: null,
    },

    Trainer: {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Ash Ketchum',
      email: 'ash@email.com',
      city: 'Pallet',
    },

    CreateTrainerDTO: {
      $name: 'Ash Ketchum',
      $email: 'ash@email.com',
      $city: 'Pallet',
    },

    CapturePokemonDTO: {
      $pokemonName: 'pikachu',
    },

    PokedexPokemon: {
      name: 'pikachu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      hp: 35,
      attack: 55,
      defense: 40,
      types: ['electric'],
    },

    ErrorResponse: {
      status: 'error',
      statusCode: 404,
      message: 'Recurso não encontrado.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [path.resolve(__dirname, 'swagger-routes.ts')];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
