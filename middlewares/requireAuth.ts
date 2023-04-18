import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@greateki-ticket-ms-demo/common";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user)
    throw new UnauthorizedError("Authorization Failed, Please sign in");
};
