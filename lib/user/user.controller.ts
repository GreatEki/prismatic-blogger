import { Request, Response, NextFunction } from "express";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("This is create user route");
  } catch (err) {
    next(err);
  }
};
