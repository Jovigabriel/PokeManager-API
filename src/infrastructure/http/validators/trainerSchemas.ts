import { z } from 'zod';

export const createTrainerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    city: z.string().min(1, 'A cidade é obrigatória.'),
  }),
});

export const capturePokemonSchema = z.object({
  params: z.object({
    trainerId: z.string().uuid('trainerId inválido.'),
  }),

  body: z.object({
    pokemonName: z.string().min(1, 'O nome do Pokémon é obrigatório.'),
  }),
});

export const trainerIdParamSchema = z.object({
  params: z.object({
    trainerId: z.string().uuid('trainerId inválido.'),
  }),
});
