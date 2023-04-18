import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body, categories, averageRating } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        body,
        averageRating,
        authorId: req.user!.id,
        categories,
      },
    });

    return res.json({
      status: "OK",
      statusCode: 200,
      message: "Success",
    });
  } catch (err) {
    next(err);
  }
};
