import { Router } from "express";
import * as controller from "./category.controller";

const CategoryRouter = Router();

CategoryRouter.route("/add").post(controller.createCategory);

export default CategoryRouter;
