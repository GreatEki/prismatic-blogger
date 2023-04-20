import { Router } from "express";
import * as controller from "./post.controller";
const PostRouter = Router();

PostRouter.route("/add").post(controller.createPost);

PostRouter.route("/:postId")
  .put(controller.updatePost)
  .delete(controller.deletePost);

PostRouter.route("/").get(controller.getPosts);

export default PostRouter;
