import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AppError } from '@domain/errors/app.error';
import { ConflictError } from '@domain/errors/conflict.error';
import { NotFoundError } from '@domain/errors/not-found.error';

export function mapPrismaError(error: PrismaClientKnownRequestError): AppError {
  switch (error.code) {
    case 'P2002':
      return new ConflictError(
        'Já existe um registro com um valor que deve ser único.',
      );

    case 'P2003':
      return new AppError(
        'Relacionamento inválido. O recurso associado não existe.',
        400,
      );

    case 'P2025':
      return new NotFoundError('Registro não encontrado.');

    default:
      return new AppError('Erro ao acessar o banco de dados.', 500);
  }
}
