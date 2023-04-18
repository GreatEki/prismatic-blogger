import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { BadRequestError } from "@greateki-ticket-ms-demo/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      select: {
        name: true,
        email: true,
        age: true,
        role: true,
        authoredPosts: true,
        favouritePosts: true,
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

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) throw new BadRequestError("Invalid credentials");

    const match = bcrypt.compareSync(password, user.password);

    if (!match) throw new BadRequestError("Invalid credentials");

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role,
      },
      process.env.JWT_KEY!
    );

    return res.cookie("access_token", token, { httpOnly: true }).json({
      status: "OK",
      statusCode: 200,
      message: "Sign in successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
