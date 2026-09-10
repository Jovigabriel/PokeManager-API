// Pokemon precisa ter nome, id, type, hp, attack, defense

export interface PokemonsProps {
  id: string;
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
}

export class Pokemon {
  private props: PokemonsProps;

  constructor(props: PokemonsProps) {
    if (props.hp <= 0) {
      throw new Error('HP deve ser maior que 0');
    }

    if (props.attack <= 0) {
      throw new Error('Attack deve ser maior que 0');
    }

    if (props.defense <= 0) {
      throw new Error('Defense deve ser maior que 0');
    }

    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get type() {
    return this.props.type;
  }

  get hp() {
    return this.props.hp;
  }

  get name() {
    return this.props.name;
  }

  get attack() {
    return this.props.attack;
  }

  get defense() {
    return this.props.defense;
  }
}
