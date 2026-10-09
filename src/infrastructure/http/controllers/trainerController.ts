import { Request, Response } from 'express';

import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { DeleteTrainerUseCase } from '@application/use-cases/deleteTrainer';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeam';

export class TrainerController {
  constructor(
    private createTrainerUseCase: CreateTrainerUseCase,
    private capturePokemonUseCase: CapturePokemonUseCase,
    private getTrainerTeamUseCase: GetTrainerTeamUseCase,
    private deleteTrainerUseCase: DeleteTrainerUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, city } = req.body;

    const trainer = await this.createTrainerUseCase.execute({
      name,
      email,
      city,
    });

    return res.status(201).json({
      message: 'Treinador criado com sucesso!',
      data: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        city: trainer.city,
      },
    });
  }

  async capture(req: Request, res: Response): Promise<Response> {
    const trainerId = String(req.params.trainerId);
    const { pokemonName } = req.body;

    const pokemon = await this.capturePokemonUseCase.execute({
      trainerId,
      pokemonName,
    });

    return res.status(201).json({
      message: 'Pokémon capturado com sucesso!',
      data: {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        types: pokemon.types,
        trainerId: pokemon.trainerId,
      },
    });
  }

  async team(req: Request, res: Response): Promise<Response> {
    const trainerId = String(req.params.trainerId);

    const team = await this.getTrainerTeamUseCase.execute({
      trainerId,
    });

    const formattedTeam = team.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      types: pokemon.types,
      trainerId: pokemon.trainerId,
    }));

    return res.status(200).json({
      data: formattedTeam,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const trainerId = String(req.params.trainerId);

    await this.deleteTrainerUseCase.execute({
      trainerId,
    });

    return res.status(204).send();
  }
}
