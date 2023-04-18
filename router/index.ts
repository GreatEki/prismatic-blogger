import { Router } from "express";
import UserRouter from "../lib/user/user.router";

const router = Router();

router.use("/user", UserRouter);

export default router;
