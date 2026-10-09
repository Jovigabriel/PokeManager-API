import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export function validateRequest(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction): void => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  };
}
