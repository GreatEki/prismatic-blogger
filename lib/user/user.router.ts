import { Router } from "express";
import * as controller from "./user.controller";

const UserRouter = Router();

UserRouter.route("/create").post(controller.createUser);

export default UserRouter;
