import { Router } from "express";
import PostRouter from "../lib/post/post.router";

const router = Router();

router.use("/post", PostRouter);

export { router as AppRouter };
