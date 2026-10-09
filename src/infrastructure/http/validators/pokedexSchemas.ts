import { z } from 'zod';

export const searchPokemonSchema = z.object({
  query: z.object({
    name: z.string().min(1, 'O nome do Pokémon é obrigatório.'),
  }),
});
