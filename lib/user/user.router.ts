import { Router } from "express";
import * as controller from "./user.controller";

const UserRouter = Router();

UserRouter.route("/create").post(controller.createUser);

UserRouter.route("/signin").post(controller.signIn);

export default UserRouter;
