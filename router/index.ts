import { Router } from "express";
import PostRouter from "../lib/post/post.router";
import CategoryRouter from "../lib/category/category.router";

const router = Router();

router.use("/post", PostRouter);
router.use("/category", CategoryRouter);

export { router as AppRouter };
