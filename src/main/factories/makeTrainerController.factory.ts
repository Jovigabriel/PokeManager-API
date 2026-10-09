import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { DeleteTrainerUseCase } from '@application/use-cases/deleteTrainer';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeam';

import { PrismaPokemonRepository } from '@infrastructure/database/prisma/repositories/PrismaPokemonRepository';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/repositories/PrismaTrainerRepository';
import { TrainerController } from '@infrastructure/http/controllers/trainerController';
import { PokeApiGateway } from '@infrastructure/providers/poke-api/PokeApiGateway';

const trainerRepository = new PrismaTrainerRepository();
const pokemonRepository = new PrismaPokemonRepository();
const pokeApiGateway = new PokeApiGateway();

export function makeTrainerController(): TrainerController {
  const createTrainerUseCase = new CreateTrainerUseCase(trainerRepository);

  const capturePokemonUseCase = new CapturePokemonUseCase(
    trainerRepository,
    pokemonRepository,
    pokeApiGateway,
  );

  const getTrainerTeamUseCase = new GetTrainerTeamUseCase(
    trainerRepository,
    pokemonRepository,
  );

  const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository);

  return new TrainerController(
    createTrainerUseCase,
    capturePokemonUseCase,
    getTrainerTeamUseCase,
    deleteTrainerUseCase,
  );
}
