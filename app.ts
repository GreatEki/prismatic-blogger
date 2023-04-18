import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import dotenv from "dotenv";
import path from "path";

import { errorHandler, NotFoundError } from "@greateki-ticket-ms-demo/common";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
