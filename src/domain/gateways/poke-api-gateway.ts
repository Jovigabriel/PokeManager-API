export interface PokeApiPokemonData {
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  types: string[]; //pode ter mais de um tipo
}

export interface IPokeApiGateway {
  findByName(name: string): Promise<PokeApiPokemonData>;
}
