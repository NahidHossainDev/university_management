import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
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
