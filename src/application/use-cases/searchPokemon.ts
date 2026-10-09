import {
  IPokeApiGateway,
  PokeApiPokemonData,
} from '@domain/gateways/poke-api-gateway';

interface SearchPokemonInput {
  name: string;
}

export class SearchPokemonUseCase {
  constructor(private pokeApiGateway: IPokeApiGateway) {}

  async execute({ name }: SearchPokemonInput): Promise<PokeApiPokemonData> {
    const pokemon = await this.pokeApiGateway.findByName(name);

    return pokemon;
  }
}
