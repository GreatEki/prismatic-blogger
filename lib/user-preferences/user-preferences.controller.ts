import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { UnauthorizedError } from "@greateki-ticket-ms-demo/common";

export const setUserPreference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailUpdates } = req.body;

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });

    if (!user) throw new UnauthorizedError("Authorization Failure");

    const preference = await prisma.userPreferences.findUnique({
      where: { userId: user.id },
    });

    let result;

    if (!preference) {
      result = await prisma.userPreferences.create({
        data: {
          emailUpdates,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          user: true,
        },
      });
    }

    if (preference) {
      result = await prisma.userPreferences.update({
        where: {
          id: preference.id,
        },
        data: {
          emailUpdates,
        },
        include: {
          user: true,
        },
      });
    }

    return res.json({
      message: "User preference settings applied",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
