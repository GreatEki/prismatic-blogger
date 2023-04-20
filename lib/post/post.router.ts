import { Router } from "express";
import * as controller from "./post.controller";

import { PostValidator } from "./post.validator";

const PostRouter = Router();

PostRouter.route("/add").post(PostValidator, controller.createPost);

PostRouter.route("/:postId")
  .put(PostValidator, controller.updatePost)
  .delete(controller.deletePost);

PostRouter.route("/").get(controller.getPosts);

export default PostRouter;
