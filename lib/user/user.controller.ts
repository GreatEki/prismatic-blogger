import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { BadRequestError } from "@greateki-ticket-ms-demo/common";
import bcrypt from "bcrypt";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, age } = req.body;

    // check if email exist
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) throw new BadRequestError("Email is already taken");

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
        age,
      },
    });

    return res.json({
      status: "Created",
      statusCode: 201,
      message: "User created",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};
