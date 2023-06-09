import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import {
  NotFoundError,
  UnauthorizedError,
} from "@greateki-ticket-ms-demo/common";
import { Paginate } from "../../interface/pagination";

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

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const { title, body, categories } = req.body;

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        body,
        categories: {
          connect: categories,
        },
      },
    });

    return res.json({
      message: "Post updated",
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

    const startIndex = skip;
    const endIndex = Number(page) * Number(limit);

    let results: Paginate = {
      nextPage: { page: 0, limit: 0 },
      prevPage: { page: 0, limit: 0 },
      count: 0,
      result: [],
    };

    results.count = await prisma.post.count();

    if (startIndex > 0) {
      results.prevPage = { page: Number(page) - 1, limit: take };
    }

    if (endIndex < results.count) {
      results.nextPage = { page: Number(page) + 1, limit: take };
    }

    results.result = await prisma["post"].findMany({
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
        categories: true,
      },
    });

    return res.json({
      message: "Posts returned successfully",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.delete({
      where: { id: postId },
    });

    if (!post) throw new NotFoundError("No post found");

    return res.json({
      message: "Post delete",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
