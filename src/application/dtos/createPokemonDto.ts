export interface CreatePokemonDTO {
  id: string;
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  types: string[];
  trainerId: string | null;
}
