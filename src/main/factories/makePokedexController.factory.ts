import { SearchPokemonUseCase } from '@application/use-cases/searchPokemon';

import { PokedexController } from '@infrastructure/http/controllers/pokedexController';
import { PokeApiGateway } from '@infrastructure/providers/poke-api/PokeApiGateway';

const pokeApiGateway = new PokeApiGateway();

export function makePokedexController(): PokedexController {
  const searchPokemonUseCase = new SearchPokemonUseCase(pokeApiGateway);

  return new PokedexController(searchPokemonUseCase);
}
