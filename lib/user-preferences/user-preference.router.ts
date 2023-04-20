import { Router } from "express";
import * as controller from "./user-preferences.controller";

const UserPreferenceRouter = Router();

UserPreferenceRouter.route("/").post(controller.setUserPreference);

export default UserPreferenceRouter;
