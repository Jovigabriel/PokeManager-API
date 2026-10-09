export interface TrainerProps {
  id: string;
  name: string;
  email: string;
  city: string;
}

export class Trainer {
  private props: TrainerProps;

  constructor(props: TrainerProps) {
    if (!props.name.trim()) {
      throw new Error('O nome do treinador é obrigatório.');
    }

    if (!props.email.trim()) {
      throw new Error('O e-mail do treinador é obrigatório.');
    }

    if (!props.city.trim()) {
      throw new Error('A cidade do treinador é obrigatória.');
    }

    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get city(): string {
    return this.props.city;
  }
}
