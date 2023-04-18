import { Request, Response, NextFunction } from "express";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({
      status: "OK",
      statusCode: 200,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};
