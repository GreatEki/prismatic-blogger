import { Router } from "express";
import * as controller from "./category.controller";

const CategoryRouter = Router();

CategoryRouter.route("/add").post(controller.createCategory);

CategoryRouter.route("/:categoryId").get(controller.getCategory);

CategoryRouter.route("/").get(controller.getCategories);

export default CategoryRouter;
