import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { currentUser, requireAuth } from "./middlewares";

import { errorHandler, NotFoundError } from "@greateki-ticket-ms-demo/common";

import UserRouter from "./lib/user/user.router";
import { AppRouter } from "./router";

const app = express();

app.set("trust proxy", true); //this is to allow request into app when we provision a reverse proxy either via an ingress controller or load balancer
app.use(express.json());

dotenv.config();

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // disabling secure mode for test env
  })
);

app.use(currentUser);

app.use("/api/auth", UserRouter);

app.use(requireAuth);
app.use("/api/", AppRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
