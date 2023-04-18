import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { UnauthorizedError } from "@greateki-ticket-ms-demo/common";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body, categories, averageRating } = req.body;

    const author = await prisma.user.findFirst({
      where: { id: req.user!.id },
    });

    if (!author) throw new UnauthorizedError("Authorization Failure");

    const post = await prisma.post.create({
      data: {
        title,
        body,
        averageRating,
        categories: {
          connect: categories,
        },
        author: {
          connect: {
            id: author.id,
          },
        },
      },
    });

    return res.json({
      status: "OK",
      statusCode: 200,
      message: "Success",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
