import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@domain/errors/app.error';
import { mapPrismaError } from '@infrastructure/database/prisma/prismaErrorMapper';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Erro de validação.',
      errors: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    const mappedError = mapPrismaError(error);

    return res.status(mappedError.statusCode).json({
      status: 'error',
      statusCode: mappedError.statusCode,
      message: mappedError.message,
    });
  }

  console.error('[Uncaught Exception]:', error);

  return res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Erro interno no servidor.',
  });
}
