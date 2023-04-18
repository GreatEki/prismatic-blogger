import { Router } from "express";
import * as controller from "./post.controller";
const PostRouter = Router();

PostRouter.route("/add").post(controller.createPost);

export default PostRouter;
