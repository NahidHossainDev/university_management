import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params, cookies } = req;
    try {
      await schema.parseAsync({
        body,
        query,
        params,
        cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
