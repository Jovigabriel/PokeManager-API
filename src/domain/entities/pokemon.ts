export interface PokemonProps {
  id: string;
  name: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  types: string[];
  trainerId: string | null;
  level?: number;
}

export class Pokemon {
  private props: PokemonProps;

  constructor(props: PokemonProps) {
    if (!props.name.trim()) {
      throw new Error('Pokemon name is required');
    }

    if (props.hp <= 0) {
      throw new Error('Pokemon HP must be greater than zero');
    }

    if (props.attack <= 0) {
      throw new Error('Pokemon attack must be greater than zero');
    }

    if (props.defense <= 0) {
      throw new Error('Pokemon defense must be greater than zero');
    }

    if (!props.types || props.types.length === 0) {
      throw new Error('Pokemon must have at least one type');
    }

    if (props.level !== undefined && props.level <= 0) {
      throw new Error('Pokemon level must be greater than zero');
    }

    this.props = {
      ...props,
      level: props.level ?? 1,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get image(): string {
    return this.props.image;
  }

  get hp(): number {
    return this.props.hp;
  }

  get attack(): number {
    return this.props.attack;
  }

  get defense(): number {
    return this.props.defense;
  }

  get types(): string[] {
    return this.props.types;
  }

  get trainerId(): string | null {
    return this.props.trainerId;
  }

  get level(): number {
    return this.props.level ?? 1;
  }

  removeTrainer(): void {
    this.props.trainerId = null;
  }

  updateLevel(newLevel: number): void {
    if (newLevel <= 0) {
      throw new Error('Pokemon level must be greater than zero');
    }

    this.props.level = newLevel;
  }
}
