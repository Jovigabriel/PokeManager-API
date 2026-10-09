import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonsUseCase } from '@application/use-cases/listPokemons';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';
import { UpdatePokemonLevelUseCase } from '@application/use-cases/updatePokemonLevel';

import { PrismaPokemonRepository } from '@infrastructure/database/prisma/repositories/PrismaPokemonRepository';
import { PokemonController } from '@infrastructure/http/controllers/pokemonController';

const pokemonRepository = new PrismaPokemonRepository();

export function makePokemonController(): PokemonController {
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);

  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);

  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);

  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);

  const updatePokemonLevelUseCase = new UpdatePokemonLevelUseCase(
    pokemonRepository,
  );

  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);

  return new PokemonController(
    listPokemonsUseCase,
    getPokemonByIdUseCase,
    createPokemonUseCase,
    updatePokemonUseCase,
    updatePokemonLevelUseCase,
    deletePokemonUseCase,
  );
}
