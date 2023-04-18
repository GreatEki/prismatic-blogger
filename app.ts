import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { currentUser, requireAuth } from "./middlewares";

import { errorHandler, NotFoundError } from "@greateki-ticket-ms-demo/common";

import UserRouter from "./lib/user/user.router";
import { AppRouter } from "./router";

const app = express();

app.use(express.json());

dotenv.config();

app.use(currentUser);

app.use("/api/auth", UserRouter);

app.use(requireAuth);
app.use("/api/", AppRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
