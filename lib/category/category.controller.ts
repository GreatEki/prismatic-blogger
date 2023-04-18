import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import {
  BadRequestError,
  NotFoundError,
} from "@greateki-ticket-ms-demo/common";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // confirm category title is unique
    const { name } = req.body;

    const category = await prisma.category.findFirst({ where: { name } });

    if (category)
      throw new BadRequestError("Category with same name already exists");

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json({
      status: "Created",
      statusCode: 201,
      message: "New Category Added",
      data: newCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany();

    return res.json({
      message: "categories fetched successfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.categoryId;
  try {
    const category = await prisma.category.findFirst({ where: { id } });

    if (!category) throw new NotFoundError("Category not found");

    return res.json({
      message: "category fetched successfully",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};
