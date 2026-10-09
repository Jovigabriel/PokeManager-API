import { z } from 'zod';

const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export const listPokemonsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(50).default(10),

    type: z
      .string()
      .transform((value) => value.toLowerCase())
      .pipe(z.enum(pokemonTypes))
      .optional(),
  }),
});

export const updatePokemonLevelSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),

  body: z.object({
    level: z.coerce.number().int().positive(),
  }),
});
