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

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const posts = await prisma.post.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            age: true,
            role: true,
          },
        },
      },
    });

    return res.json({
      message: "Posts returned successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};
