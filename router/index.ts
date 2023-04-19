import { Router } from "express";
import PostRouter from "../lib/post/post.router";
import CategoryRouter from "../lib/category/category.router";
import UserPreferenceRouter from "../lib/user-preferences/user-preference.router";

const router = Router();

router.use("/post", PostRouter);
router.use("/category", CategoryRouter);
router.use("/user-preference", UserPreferenceRouter);

export { router as AppRouter };
