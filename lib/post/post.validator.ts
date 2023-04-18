import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

const CreatePostValSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  categories: Joi.array()
    .items(Joi.object({ id: Joi.string() }))
    .required(),
  averageRating: Joi.number().optional(),
});

export const createPostValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreatePostValSchema.validateAsync(req.body, { allowUnknown: true });
  } catch (err) {
    next(err);
  }

  next();
};
