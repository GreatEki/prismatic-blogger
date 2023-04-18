import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { BadRequestError } from "@greateki-ticket-ms-demo/common";

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
